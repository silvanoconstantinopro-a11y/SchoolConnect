import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceEvento {

  static async criarEvento({ titulo, descricao, imagem, dataHora }) {
    if (!titulo?.trim()) throw new Error("Título é obrigatório.");
    if (!descricao?.trim()) throw new Error("Descrição é obrigatória.");

    return prisma.evento.create({
      data: {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        imagem: imagem || null
      }
    });
  }

  static async listarEventos({ limit, offset, futuros } = {}) {
    const where = {};
    
    if (futuros === "true" || futuros === true) {
      where.dataHora = { gte: new Date() };
    }

    const [eventos, total] = await Promise.all([
      prisma.evento.findMany({
        where,
        orderBy: { criadoEm: "desc" },
        ...(limit ? { take: Number(limit) } : {}),
        ...(offset ? { skip: Number(offset) } : {})
      }),
      prisma.evento.count({ where })
    ]);

    return { data: eventos, total };
  }

  static async obterEventoPorId(id) {
    const evento = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!evento) throw new Error("Evento não encontrado.");
    return evento;
  }

  static async atualizarEvento(id, { titulo, descricao, imagem }) {
    const evento = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!evento) throw new Error("Evento não encontrado.");

    return prisma.evento.update({
      where: { id: Number(id) },
      data: {
        titulo: titulo?.trim() ?? evento.titulo,
        descricao: descricao?.trim() ?? evento.descricao,
        imagem: imagem !== undefined ? imagem : evento.imagem
      }
    });
  }

  static async deletarEvento(id) {
    const evento = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!evento) throw new Error("Evento não encontrado.");
    
    await prisma.evento.delete({ where: { id: Number(id) } });
    return { mensagem: "Evento removido com sucesso." };
  }

  static async getProximosEventos(limit = 5) {
    return prisma.evento.findMany({
      where: {
        dataHora: { gte: new Date() }
      },
      orderBy: { dataHora: "asc" },
      take: limit
    });
  }
}