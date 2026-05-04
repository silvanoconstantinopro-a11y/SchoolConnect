import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceCurso {

  static async criarCurso({ nome, descricao }) {
    if (!nome || !descricao) throw new Error("Nome e descrição são obrigatórios.");
    return prisma.curso.create({ data: { nome, descricao } });
  }

  static async listarCursos() {
    return prisma.curso.findMany({ orderBy: { nome: "asc" } });
  }

  static async listarCursosComDisciplinas() {
    return prisma.curso.findMany({
      include: { disciplinas: true, professores: { select:{ id:true, nome:true } } },
      orderBy: { nome: "asc" },
    });
  }

  static async obterCursoPorId(id) {
    const c = await prisma.curso.findUnique({ where: { id: Number(id) }, include: { disciplinas: true } });
    if (!c) throw new Error("Curso não encontrado.");
    return c;
  }

  static async atualizarCurso(id, { nome, descricao }) {
    const c = await prisma.curso.findUnique({ where: { id: Number(id) } });
    if (!c) throw new Error("Curso não encontrado.");
    return prisma.curso.update({
      where: { id: Number(id) },
      data:  { nome: nome ?? c.nome, descricao: descricao ?? c.descricao },
    });
  }

  static async deletarCurso(id) {
    const c = await prisma.curso.findUnique({ where: { id: Number(id) } });
    if (!c) throw new Error("Curso não encontrado.");
    await prisma.curso.delete({ where: { id: Number(id) } });
    return { mensagem: "Curso deletado com sucesso." };
  }
}