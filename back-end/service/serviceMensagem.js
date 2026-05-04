import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  remetente:    { select: { id:true, nome:true, imagem:true, perfil:true } },
  destinatario: { select: { id:true, nome:true, imagem:true, perfil:true } },
};

export class ServiceMensagem {

  static async criarMensagem({ remetenteId, destinatarioId, conteudo, arquivoNome, arquivoTipo, arquivoTamanho, arquivoUrl }) {
    if (!remetenteId || !destinatarioId)
      throw new Error("Remetente e destinatário são obrigatórios.");

    const temTexto   = conteudo?.trim();
    const temArquivo = arquivoUrl && arquivoNome;
    if (!temTexto && !temArquivo)
      throw new Error("A mensagem deve ter texto ou ficheiro.");

    const [rem, dest] = await Promise.all([
      prisma.usuario.findUnique({ where: { id: Number(remetenteId) } }),
      prisma.usuario.findUnique({ where: { id: Number(destinatarioId) } }),
    ]);
    if (!rem)  throw new Error("Remetente não encontrado.");
    if (!dest) throw new Error("Destinatário não encontrado.");

    return prisma.mensagem.create({
      data: {
        conteudo:      temTexto || "",
        remetenteId:   Number(remetenteId),
        destinatarioId:Number(destinatarioId),
        arquivoUrl:    arquivoUrl    || null,
        arquivoNome:   arquivoNome   || null,
        arquivoTipo:   arquivoTipo   || null,
        arquivoTamanho: arquivoTamanho ? Number(arquivoTamanho) : null,
      },
      include: INCLUDE,
    });
  }

  static async listarMensagens(usuarioId) {
    const where = usuarioId
      ? { OR: [
          { remetenteId:    Number(usuarioId), deletadoParaRemetente:    false },
          { destinatarioId: Number(usuarioId), deletadoParaDestinatario: false },
        ] }
      : undefined;
    return prisma.mensagem.findMany({ where, include: INCLUDE, orderBy: { criadoEm: "asc" } });
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
    if (m.remetenteId !== Number(usuarioId)) throw new Error("Apenas o remetente pode editar.");
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
      if (!isRem) throw new Error("Só o remetente pode apagar para todos.");
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