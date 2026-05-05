import { prisma } from "../prismaClient/prismaClient.js";
import { broadcast } from "../websocket.js";

export class ServiceAviso {

  static async criarAviso({ titulo, conteudo, imagem }) {
    if (!titulo?.trim()) throw new Error("Título é obrigatório.");
    if (!conteudo?.trim()) throw new Error("Conteúdo é obrigatório.");

    const aviso = await prisma.aviso.create({
      data: {
        titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        imagem: imagem || null
      }
    });

    broadcast({ tipo: "novo_aviso", aviso });
    return aviso;
  }

  static async listarAvisos({ limit } = {}) {
    const avisos = await prisma.aviso.findMany({ limit: limit ? Number(limit) : undefined });
    return avisos;
  }

  static async obterAvisoPorId(id) {
    const aviso = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!aviso) throw new Error("Aviso não encontrado.");
    return aviso;
  }

  static async atualizarAviso(id, { titulo, conteudo, imagem }) {
    const aviso = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!aviso) throw new Error("Aviso não encontrado.");

    const updateData = {};
    if (titulo) updateData.titulo = titulo.trim();
    if (conteudo) updateData.conteudo = conteudo.trim();
    if (imagem !== undefined) updateData.imagem = imagem;

    return prisma.aviso.update({
      where: { id: Number(id) },
      data: updateData
    });
  }

  static async deletarAviso(id) {
    const aviso = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!aviso) throw new Error("Aviso não encontrado.");
    
    await prisma.aviso.delete({ where: { id: Number(id) } });
    return { mensagem: "Aviso removido com sucesso." };
  }
}