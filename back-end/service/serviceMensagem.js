/**
 * serviceMensagem.js
 * Gestão completa de mensagens entre usuários
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";
import { enviarMensagemWS } from "../websocket.js";

const INCLUDE = {
  remetente:    { select: { id: true, nome: true, imagem: true, perfil: true, email: true } },
  destinatario: { select: { id: true, nome: true, imagem: true, perfil: true, email: true } },
};

export class ServiceMensagem {

  static validarArquivo(arquivoUrl, arquivoNome, arquivoTipo, arquivoTamanho) {
    if (!arquivoUrl || !arquivoNome) return null;
    
    const tamanhoMaximo = 10 * 1024 * 1024; // 10MB
    if (arquivoTamanho && arquivoTamanho > tamanhoMaximo) {
      throw new Error("Arquivo muito grande. Máximo 10MB");
    }
    
    const tiposPermitidos = ["image/jpeg", "image/png", "image/gif", "application/pdf", "text/plain"];
    if (arquivoTipo && !tiposPermitidos.includes(arquivoTipo)) {
      throw new Error("Tipo de arquivo não permitido");
    }
    
    return true;
  }

  static async criarMensagem({ remetenteId, destinatarioId, conteudo, arquivoNome, arquivoTipo, arquivoTamanho, arquivoUrl }) {
    try {
      if (!remetenteId || !destinatarioId) {
        throw new Error("Remetente e destinatário são obrigatórios");
      }

      const temTexto = conteudo?.trim();
      const temArquivo = arquivoUrl && arquivoNome;
      
      if (!temTexto && !temArquivo) {
        throw new Error("A mensagem deve ter texto ou ficheiro");
      }
      
      if (temArquivo) {
        this.validarArquivo(arquivoUrl, arquivoNome, arquivoTipo, arquivoTamanho);
      }

      const [rem, dest] = await Promise.all([
        prisma.usuario.findUnique({ where: { id: Number(remetenteId) } }),
        prisma.usuario.findUnique({ where: { id: Number(destinatarioId) } }),
      ]);
      
      if (!rem) throw new Error("Remetente não encontrado");
      if (!dest) throw new Error("Destinatário não encontrado");

      const mensagem = await prisma.mensagem.create({
        data: {
          conteudo: temTexto || "",
          remetenteId: Number(remetenteId),
          destinatarioId: Number(destinatarioId),
          arquivoUrl: arquivoUrl || null,
          arquivoNome: arquivoNome || null,
          arquivoTipo: arquivoTipo || null,
          arquivoTamanho: arquivoTamanho ? Number(arquivoTamanho) : null,
        },
        include: INCLUDE,
      });

      // Notificar via WebSocket
      await enviarMensagemWS(destinatarioId, {
        type: "nova_mensagem",
        mensagem: {
          id: mensagem.id,
          conteudo: mensagem.conteudo,
          remetente: mensagem.remetente,
          criadoEm: mensagem.criadoEm
        }
      });

      logger.info(`Mensagem criada: ${mensagem.id} de ${rem.nome} para ${dest.nome}`);
      return mensagem;

    } catch (error) {
      logger.error(`Erro ao criar mensagem: ${error.message}`);
      throw error;
    }
  }

  static async listarMensagens(usuarioId, filtros = {}) {
    try {
      const where = usuarioId ? {
        OR: [
          { remetenteId: Number(usuarioId), deletadoParaRemetente: false },
          { destinatarioId: Number(usuarioId), deletadoParaDestinatario: false },
        ]
      } : undefined;
      
      if (filtros.contatoId) {
        where.AND = [
          where.OR,
          {
            OR: [
              { remetenteId: Number(filtros.contatoId), destinatarioId: Number(usuarioId) },
              { remetenteId: Number(usuarioId), destinatarioId: Number(filtros.contatoId) }
            ]
          }
        ];
      }
      
      if (filtros.search) {
        where.conteudo = { contains: filtros.search, mode: 'insensitive' };
      }
      
      if (filtros.dataInicio) {
        where.criadoEm = { gte: new Date(filtros.dataInicio) };
      }
      if (filtros.dataFim) {
        where.criadoEm = { ...where.criadoEm, lte: new Date(filtros.dataFim) };
      }
      
      const mensagens = await prisma.mensagem.findMany({ 
        where, 
        include: INCLUDE, 
        orderBy: { criadoEm: "asc" },
        take: filtros.limit ? Number(filtros.limit) : 100,
        skip: filtros.offset ? Number(filtros.offset) : 0
      });
      
      // Marcar mensagens como lidas
      if (usuarioId && filtros.marcarComoLidas) {
        await prisma.mensagem.updateMany({
          where: {
            destinatarioId: Number(usuarioId),
            lida: false
          },
          data: { lida: true, lidaEm: new Date() }
        });
      }
      
      return mensagens;

    } catch (error) {
      logger.error(`Erro ao listar mensagens: ${error.message}`);
      throw error;
    }
  }

  static async listarConversas(usuarioId) {
    try {
      const mensagens = await prisma.mensagem.findMany({
        where: {
          OR: [
            { remetenteId: Number(usuarioId), deletadoParaRemetente: false },
            { destinatarioId: Number(usuarioId), deletadoParaDestinatario: false }
          ]
        },
        include: INCLUDE,
        orderBy: { criadoEm: "desc" }
      });
      
      // Agrupar por contato
      const conversas = new Map();
      
      for (const msg of mensagens) {
        const contatoId = msg.remetenteId === Number(usuarioId) ? msg.destinatarioId : msg.remetenteId;
        const contato = msg.remetenteId === Number(usuarioId) ? msg.destinatario : msg.remetente;
        
        if (!conversas.has(contatoId)) {
          conversas.set(contatoId, {
            contato: contato,
            ultimaMensagem: msg,
            naoLidas: 0
          });
        }
        
        if (!msg.lida && msg.destinatarioId === Number(usuarioId)) {
          conversas.get(contatoId).naoLidas++;
        }
      }
      
      return Array.from(conversas.values());
      
    } catch (error) {
      logger.error(`Erro ao listar conversas: ${error.message}`);
      throw error;
    }
  }

  static async obterMensagemPorId(id, usuarioId = null) {
    try {
      const mensagem = await prisma.mensagem.findUnique({ 
        where: { id: Number(id) }, 
        include: INCLUDE 
      });
      
      if (!mensagem) throw new Error("Mensagem não encontrada");
      
      // Marcar como lida se o usuário for o destinatário
      if (usuarioId && mensagem.destinatarioId === Number(usuarioId) && !mensagem.lida) {
        await prisma.mensagem.update({
          where: { id: Number(id) },
          data: { lida: true, lidaEm: new Date() }
        });
        mensagem.lida = true;
      }
      
      return mensagem;
      
    } catch (error) {
      logger.error(`Erro ao obter mensagem ${id}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarMensagem(id, { conteudo, usuarioId }) {
    try {
      if (!conteudo?.trim()) throw new Error("Conteúdo não pode ser vazio");
      
      const mensagem = await prisma.mensagem.findUnique({ where: { id: Number(id) } });
      if (!mensagem) throw new Error("Mensagem não encontrada");
      
      if (mensagem.remetenteId !== Number(usuarioId)) {
        throw new Error("Apenas o remetente pode editar");
      }
      
      const atualizada = await prisma.mensagem.update({
        where: { id: Number(id) },
        data: { conteudo: conteudo.trim(), editadoEm: new Date() },
        include: INCLUDE,
      });
      
      // Notificar sobre edição
      await enviarMensagemWS(mensagem.destinatarioId, {
        type: "mensagem_editada",
        mensagemId: id,
        novoConteudo: conteudo.trim()
      });
      
      logger.info(`Mensagem ${id} editada pelo usuário ${usuarioId}`);
      return atualizada;
      
    } catch (error) {
      logger.error(`Erro ao atualizar mensagem ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarMensagem(id, usuarioId, tipo = "para_todos") {
    try {
      const uid = Number(usuarioId);
      const mensagem = await prisma.mensagem.findUnique({ where: { id: Number(id) } });
      
      if (!mensagem) throw new Error("Mensagem não encontrada");

      const isRem = mensagem.remetenteId === uid;
      const isDest = mensagem.destinatarioId === uid;
      
      if (!isRem && !isDest) throw new Error("Não autorizado");

      if (tipo === "para_todos") {
        if (!isRem) throw new Error("Só o remetente pode apagar para todos");
        
        await prisma.mensagem.delete({ where: { id: Number(id) } });
        logger.info(`Mensagem ${id} apagada para todos pelo remetente`);
        return { mensagem: "Mensagem apagada para todos" };
      }

      // Apagar apenas para o usuário
      const resultado = await prisma.mensagem.update({
        where: { id: Number(id) },
        data: isRem ? { deletadoParaRemetente: true } : { deletadoParaDestinatario: true },
      });
      
      logger.info(`Mensagem ${id} apagada para usuário ${usuarioId}`);
      return { mensagem: "Mensagem apagada para si" };
      
    } catch (error) {
      logger.error(`Erro ao deletar mensagem ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getNaoLidas(usuarioId) {
    try {
      const count = await prisma.mensagem.count({
        where: {
          destinatarioId: Number(usuarioId),
          lida: false,
          deletadoParaDestinatario: false
        }
      });
      return { total: count };
    } catch (error) {
      logger.error(`Erro ao obter mensagens não lidas: ${error.message}`);
      throw error;
    }
  }
}