import { prisma } from "../prismaClient/prismaClient.js";
import { enviarMensagemWS } from "../websocket.js";

const INCLUDE = {
  remetente: { select: { id: true, nome: true, imagem: true, perfil: true } },
  destinatario: { select: { id: true, nome: true, imagem: true, perfil: true } }
};

export class ServiceMensagem {

  static async criarMensagem({ remetenteId, destinatarioId, conteudo, arquivoNome, arquivoTipo, arquivoTamanho, arquivoUrl }) {
    if (!remetenteId || !destinatarioId) {
      throw new Error("Remetente e destinatário são obrigatórios.");
    }

    const temTexto = conteudo?.trim();
    const temArquivo = arquivoUrl && arquivoNome;
    
    if (!temTexto && !temArquivo) {
      throw new Error("A mensagem deve conter texto ou ficheiro.");
    }

    const [remetente, destinatario] = await Promise.all([
      prisma.usuario.findUnique({ where: { id: Number(remetenteId) }, select: { id: true, nome: true } }),
      prisma.usuario.findUnique({ where: { id: Number(destinatarioId) }, select: { id: true, nome: true } })
    ]);
    
    if (!remetente) throw new Error("Remetente não encontrado.");
    if (!destinatario) throw new Error("Destinatário não encontrado.");

    const mensagem = await prisma.mensagem.create({
      data: {
        conteudo: temTexto || "",
        remetenteId: Number(remetenteId),
        destinatarioId: Number(destinatarioId),
        arquivoUrl: arquivoUrl || null,
        arquivoNome: arquivoNome || null,
        arquivoTipo: arquivoTipo || null,
        arquivoTamanho: arquivoTamanho ? Number(arquivoTamanho) : null
      },
      include: INCLUDE
    });

    // Notificar destinatário via WebSocket
    enviarMensagemWS(destinatarioId, {
      tipo: "nova_mensagem",
      mensagem: {
        id: mensagem.id,
        conteudo: mensagem.conteudo,
        remetente: mensagem.remetente,
        criadoEm: mensagem.criadoEm,
        temArquivo: !!arquivoUrl
      }
    });

    return mensagem;
  }

  static async listarMensagens(usuarioId, comUsuarioId) {
    const uid = Number(usuarioId);

    if (comUsuarioId) {
      const cid = Number(comUsuarioId);
      return prisma.mensagem.findMany({
        where: {
          OR: [
            { remetenteId: uid, destinatarioId: cid, deletadoParaRemetente: false },
            { remetenteId: cid, destinatarioId: uid, deletadoParaDestinatario: false }
          ]
        },
        include: INCLUDE,
        orderBy: { criadoEm: "asc" }
      });
    }

    return prisma.mensagem.findMany({
      where: {
        OR: [
          { remetenteId: uid, deletadoParaRemetente: false },
          { destinatarioId: uid, deletadoParaDestinatario: false }
        ]
      },
      include: INCLUDE,
      orderBy: { criadoEm: "desc" }
    });
  }

  /**
   * Retorna os contactos únicos com quem o utilizador trocou mensagens
   */
  static async listarContactos(usuarioId) {
    const uid = Number(usuarioId);
    
    const mensagens = await prisma.mensagem.findMany({
      where: {
        OR: [{ remetenteId: uid }, { destinatarioId: uid }],
        AND: [
          { OR: [{ deletadoParaRemetente: false }, { deletadoParaDestinatario: false }] }
        ]
      },
      include: INCLUDE,
      orderBy: { criadoEm: "desc" }
    });

    const mapa = new Map();
    for (const m of mensagens) {
      const outro = m.remetenteId === uid ? m.destinatario : m.remetente;
      if (!mapa.has(outro.id)) {
        mapa.set(outro.id, { 
          usuario: outro, 
          ultimaMensagem: m,
          naoLidas: 0 // Poderia contar mensagens não lidas
        });
      }
    }

    return Array.from(mapa.values()).sort((a, b) => 
      new Date(b.ultimaMensagem.criadoEm) - new Date(a.ultimaMensagem.criadoEm)
    );
  }

  static async obterMensagemPorId(id) {
    const mensagem = await prisma.mensagem.findUnique({ 
      where: { id: Number(id) }, 
      include: INCLUDE 
    });
    if (!mensagem) throw new Error("Mensagem não encontrada.");
    return mensagem;
  }

  static async atualizarMensagem(id, { conteudo, usuarioId }) {
    if (!conteudo?.trim()) throw new Error("Conteúdo não pode ser vazio.");
    
    const mensagem = await prisma.mensagem.findUnique({ where: { id: Number(id) } });
    if (!mensagem) throw new Error("Mensagem não encontrada.");
    
    if (mensagem.remetenteId !== Number(usuarioId)) {
      throw new Error("Apenas o remetente pode editar a mensagem.");
    }
    
    if (mensagem.deletadoParaRemetente || mensagem.deletadoParaDestinatario) {
      throw new Error("Não é possível editar uma mensagem apagada.");
    }

    const atualizada = await prisma.mensagem.update({
      where: { id: Number(id) },
      data: { 
        conteudo: conteudo.trim(), 
        editadoEm: new Date() 
      },
      include: INCLUDE
    });

    // Notificar destinatário sobre edição
    enviarMensagemWS(mensagem.destinatarioId, {
      tipo: "mensagem_editada",
      mensagemId: id,
      novoConteudo: conteudo.trim(),
      editadoEm: atualizada.editadoEm
    });

    return atualizada;
  }

  static async deletarMensagem(id, usuarioId, tipo = "para_todos") {
    const uid = Number(usuarioId);
    const mensagem = await prisma.mensagem.findUnique({ where: { id: Number(id) } });
    
    if (!mensagem) throw new Error("Mensagem não encontrada.");

    const isRemetente = mensagem.remetenteId === uid;
    const isDestinatario = mensagem.destinatarioId === uid;
    
    if (!isRemetente && !isDestinatario) {
      throw new Error("Não autorizado.");
    }

    if (tipo === "para_todos") {
      if (!isRemetente) {
        throw new Error("Apenas o remetente pode apagar para todos.");
      }
      
      await prisma.mensagem.delete({ where: { id: Number(id) } });
      
      // Notificar destinatário sobre deleção
      enviarMensagemWS(mensagem.destinatarioId, {
        tipo: "mensagem_deletada",
        mensagemId: id
      });
      
      return { mensagem: "Mensagem apagada para todos." };
    }

    // Apagar apenas para o utilizador
    await prisma.mensagem.update({
      where: { id: Number(id) },
      data: isRemetente 
        ? { deletadoParaRemetente: true } 
        : { deletadoParaDestinatario: true }
    });
    
    return { mensagem: "Mensagem apagada para si." };
  }

  static async marcarComoLida(mensagemId, usuarioId) {
    // Implementar lógica de mensagens lidas se necessário
    // Poderia adicionar um campo "lidaEm" no schema
    return { success: true };
  }
}