import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceEvento {

  static async criarEvento({ titulo, descricao, imagem, dataHora }) {
    if (!titulo?.trim() || !descricao?.trim())
      throw new Error("Título e descrição são obrigatórios.");
    return prisma.evento.create({
      data: {
        titulo:    titulo.trim(),
        descricao: descricao.trim(),
        imagem:    imagem || null,
      },
    });
  }

  static async listarEventos({ limit } = {}) {
    return prisma.evento.findMany({
      orderBy: { criadoEm: "desc" },
      ...(limit ? { take: Number(limit) } : {}),
    });
  }

  static async obterEventoPorId(id) {
    const e = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!e) throw new Error("Evento não encontrado.");
    return e;
  }

  static async atualizarEvento(id, { titulo, descricao, imagem }) {
    const e = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!e) throw new Error("Evento não encontrado.");
    return prisma.evento.update({
      where: { id: Number(id) },
      data:  {
        titulo:    titulo?.trim()    ?? e.titulo,
        descricao: descricao?.trim() ?? e.descricao,
        imagem:    imagem            ?? e.imagem,
      },
    });
  }

  static async deletarEvento(id) {
    const e = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!e) throw new Error("Evento não encontrado.");
    await prisma.evento.delete({ where: { id: Number(id) } });
    return { mensagem: "Evento removido com sucesso." };
  }
}