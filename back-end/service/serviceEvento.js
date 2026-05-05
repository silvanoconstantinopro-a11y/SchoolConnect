import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceEvento {

  static async criarEvento({ titulo, descricao, imagem }) {
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

  static async listarEventos({ limit } = {}) {
    const eventos = await prisma.evento.findMany({ limit: limit ? Number(limit) : undefined });
    return eventos;
  }

  static async obterEventoPorId(id) {
    const evento = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!evento) throw new Error("Evento não encontrado.");
    return evento;
  }

  static async atualizarEvento(id, { titulo, descricao, imagem }) {
    const evento = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!evento) throw new Error("Evento não encontrado.");

    const updateData = {};
    if (titulo) updateData.titulo = titulo.trim();
    if (descricao) updateData.descricao = descricao.trim();
    if (imagem !== undefined) updateData.imagem = imagem;

    return prisma.evento.update({
      where: { id: Number(id) },
      data: updateData
    });
  }

  static async deletarEvento(id) {
    const evento = await prisma.evento.findUnique({ where: { id: Number(id) } });
    if (!evento) throw new Error("Evento não encontrado.");
    
    await prisma.evento.delete({ where: { id: Number(id) } });
    return { mensagem: "Evento removido com sucesso." };
  }
}