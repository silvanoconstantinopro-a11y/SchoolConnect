import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceEvento {

  static async criarEvento({ titulo, descricao, imagem }) {
    if (!titulo || !descricao) throw new Error("Título e descrição são obrigatórios.");
    return prisma.evento.create({ data: { titulo, descricao, imagem: imagem || null } });
  }

  static async listarEventos() {
    return prisma.evento.findMany({ orderBy: { criadoEm: "desc" } });
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
      data:  { titulo: titulo ?? e.titulo, descricao: descricao ?? e.descricao, imagem: imagem ?? e.imagem },
    });
  }

  static async deletarEvento(id) {
    const e = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!e) throw new Error("Evento não encontrado.");
    await prisma.evento.delete({ where: { id: Number(id) } });
    return { mensagem: "Evento deletado com sucesso." };
  }
}