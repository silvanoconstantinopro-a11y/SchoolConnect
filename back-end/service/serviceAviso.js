import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceAviso {

  static async criarAviso({ titulo, conteudo, imagem }) {
    if (!titulo || !conteudo) throw new Error("Título e conteúdo são obrigatórios.");
    return prisma.aviso.create({ data: { titulo, conteudo, imagem: imagem || null } });
  }

  static async listarAvisos() {
    return prisma.aviso.findMany({ orderBy: { criadoEm: "desc" } });
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
      data:  { titulo: titulo ?? a.titulo, conteudo: conteudo ?? a.conteudo, imagem: imagem ?? a.imagem },
    });
  }

  static async deletarAviso(id) {
    const a = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!a) throw new Error("Aviso não encontrado.");
    await prisma.aviso.delete({ where: { id: Number(id) } });
    return { mensagem: "Aviso deletado com sucesso." };
  }
}