import { prisma } from "../prismaClient/prismaClient.js";
import { broadcast } from "../websocket.js";

export class ServiceAviso {

  static async criarAviso({ titulo, conteudo, imagem }) {
    if (!titulo?.trim() || !conteudo?.trim())
      throw new Error("Título e conteúdo são obrigatórios.");

    const aviso = await prisma.aviso.create({
      data: { titulo: titulo.trim(), conteudo: conteudo.trim(), imagem: imagem || null },
    });

    // Notificar todos os clientes ligados
    broadcast({ tipo: "novo_aviso", aviso });

    return aviso;
  }

  static async listarAvisos({ limit } = {}) {
    return prisma.aviso.findMany({
      orderBy: { criadoEm: "desc" },
      ...(limit ? { take: Number(limit) } : {}),
    });
  }

  static async obterAvisoPorId(id) {
    const a = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!a) throw new Error("Aviso não encontrado.");
    return a;
  }

  static async atualizarAviso(id, { titulo, conteudo, imagem }) {
    const a = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!a) throw new Error("Aviso não encontrado.");
    return prisma.aviso.update({
      where: { id: Number(id) },
      data:  {
        titulo:   titulo?.trim()   ?? a.titulo,
        conteudo: conteudo?.trim() ?? a.conteudo,
        imagem:   imagem           ?? a.imagem,
      },
    });
  }

  static async deletarAviso(id) {
    const a = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!a) throw new Error("Aviso não encontrado.");
    await prisma.aviso.delete({ where: { id: Number(id) } });
    return { mensagem: "Aviso removido com sucesso." };
  }
}