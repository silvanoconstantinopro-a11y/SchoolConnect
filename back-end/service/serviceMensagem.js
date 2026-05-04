import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  remetente:    { select: { id: true, nome: true, imagem: true, perfil: true } },
  destinatario: { select: { id: true, nome: true, imagem: true, perfil: true } },
};

export class ServiceMensagem {

  static async criarMensagem({ remetenteId, destinatarioId, conteudo, arquivoNome, arquivoTipo, arquivoTamanho, arquivoUrl }) {
    if (!remetenteId || !destinatarioId)
      throw new Error("Remetente e destinatário são obrigatórios.");

    const temTexto   = conteudo?.trim();
    const temArquivo = arquivoUrl && arquivoNome;
    if (!temTexto && !temArquivo)
      throw new Error("A mensagem deve conter texto ou ficheiro.");

    const [rem, dest] = await Promise.all([
      prisma.usuario.findUnique({ where: { id: Number(remetenteId) } }),
      prisma.usuario.findUnique({ where: { id: Number(destinatarioId) } }),
    ]);
    if (!rem)  throw new Error("Remetente não encontrado.");
    if (!dest) throw new Error("Destinatário não encontrado.");

    return prisma.mensagem.create({
      data: {
        conteudo:       temTexto || "",
        remetenteId:    Number(remetenteId),
        destinatarioId: Number(destinatarioId),
        arquivoUrl:     arquivoUrl    || null,
        arquivoNome:    arquivoNome   || null,
        arquivoTipo:    arquivoTipo   || null,
        arquivoTamanho: arquivoTamanho ? Number(arquivoTamanho) : null,
      },
      include: INCLUDE,
    });
  }

  /**
   * Lista mensagens de uma conversa entre dois utilizadores,
   * ou todas as mensagens do utilizador (para inbox).
   */
  static async listarMensagens(usuarioId, comUsuarioId) {
    if (!usuarioId) {
      return prisma.mensagem.findMany({ include: INCLUDE, orderBy: { criadoEm: "asc" } });
    }

    const uid = Number(usuarioId);

    if (comUsuarioId) {
      const cid = Number(comUsuarioId);
      return prisma.mensagem.findMany({
        where: {
          OR: [
            { remetenteId: uid, destinatarioId: cid, deletadoParaRemetente:    false },
            { remetenteId: cid, destinatarioId: uid, deletadoParaDestinatario: false },
          ],
        },
        include: INCLUDE,
        orderBy: { criadoEm: "asc" },
      });
    }

    return prisma.mensagem.findMany({
      where: {
        OR: [
          { remetenteId:    uid, deletadoParaRemetente:    false },
          { destinatarioId: uid, deletadoParaDestinatario: false },
        ],
      },
      include: INCLUDE,
      orderBy: { criadoEm: "desc" },
    });
  }

  /** Retorna os contactos únicos com quem o utilizador trocou mensagens */
  static async listarContactos(usuarioId) {
    const uid = Number(usuarioId);
    const mensagens = await prisma.mensagem.findMany({
      where: {
        OR: [{ remetenteId: uid }, { destinatarioId: uid }],
      },
      include: INCLUDE,
      orderBy: { criadoEm: "desc" },
    });

    const mapa = new Map();
    for (const m of mensagens) {
      const outro = m.remetenteId === uid ? m.destinatario : m.remetente;
      if (!mapa.has(outro.id)) mapa.set(outro.id, { usuario: outro, ultima: m });
    }

    return [...mapa.values()];
  }

  static async obterMensagemPorId(id) {
    const m = await prisma.mensagem.findUnique({ where: { id: Number(id) }, include: INCLUDE });
    if (!m) throw new Error("Mensagem não encontrada.");
    return m;
  }

  static async atualizarMensagem(id, { conteudo, usuarioId }) {
    if (!conteudo?.trim()) throw new Error("Conteúdo não pode ser vazio.");
    const m = await prisma.mensagem.findUnique({ where: { id: Number(id) } });
    if (!m) throw new Error("Mensagem não encontrada.");
    if (m.remetenteId !== Number(usuarioId)) throw new Error("Apenas o remetente pode editar a mensagem.");
    return prisma.mensagem.update({
      where: { id: Number(id) },
      data:  { conteudo: conteudo.trim(), editadoEm: new Date() },
      include: INCLUDE,
    });
  }

  static async deletarMensagem(id, usuarioId, tipo = "para_todos") {
    const uid = Number(usuarioId);
    const m   = await prisma.mensagem.findUnique({ where: { id: Number(id) } });
    if (!m) throw new Error("Mensagem não encontrada.");

    const isRem  = m.remetenteId    === uid;
    const isDest = m.destinatarioId === uid;
    if (!isRem && !isDest) throw new Error("Não autorizado.");

    if (tipo === "para_todos") {
      if (!isRem) throw new Error("Apenas o remetente pode apagar para todos.");
      await prisma.mensagem.delete({ where: { id: Number(id) } });
      return { mensagem: "Mensagem apagada para todos." };
    }

    await prisma.mensagem.update({
      where: { id: Number(id) },
      data:  isRem ? { deletadoParaRemetente: true } : { deletadoParaDestinatario: true },
    });
    return { mensagem: "Mensagem apagada para si." };
  }
}