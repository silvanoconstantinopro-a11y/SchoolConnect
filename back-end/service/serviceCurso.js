import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceCurso {

  static async criarCurso({ nome, descricao }) {
    if (!nome?.trim() || !descricao?.trim())
      throw new Error("Nome e descrição são obrigatórios.");
    return prisma.curso.create({ data: { nome: nome.trim(), descricao: descricao.trim() } });
  }

  static async listarCursos() {
    return prisma.curso.findMany({ orderBy: { nome: "asc" } });
  }

  static async listarCursosComDisciplinas() {
    return prisma.curso.findMany({
      include: {
        disciplinas: { orderBy: { nome: "asc" } },
        professores: { select: { id: true, nome: true, email: true, imagem: true } },
        alunos:      { select: { id: true, nome: true, matricula: true } },
        _count:      { select: { alunos: true, disciplinas: true } },
      },
      orderBy: { nome: "asc" },
    });
  }

  static async obterCursoPorId(id) {
    const c = await prisma.curso.findUnique({
      where:   { id: Number(id) },
      include: {
        disciplinas: true,
        professores: { select: { id: true, nome: true, email: true } },
        _count:      { select: { alunos: true } },
      },
    });
    if (!c) throw new Error("Curso não encontrado.");
    return c;
  }

  static async atualizarCurso(id, { nome, descricao }) {
    const c = await prisma.curso.findUnique({ where: { id: Number(id) } });
    if (!c) throw new Error("Curso não encontrado.");
    return prisma.curso.update({
      where: { id: Number(id) },
      data:  { nome: nome?.trim() ?? c.nome, descricao: descricao?.trim() ?? c.descricao },
    });
  }

  static async deletarCurso(id) {
    const c = await prisma.curso.findUnique({ where: { id: Number(id) } });
    if (!c) throw new Error("Curso não encontrado.");
    await prisma.curso.delete({ where: { id: Number(id) } });
    return { mensagem: "Curso removido com sucesso." };
  }
}