import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceCurso {

  static async criarCurso({ nome, descricao }) {
    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!descricao?.trim()) throw new Error("Descrição é obrigatória.");

    const exists = await prisma.curso.findFirst({ where: { nome: nome.trim() } });
    if (exists) throw new Error("Já existe um curso com este nome.");

    return prisma.curso.create({
      data: {
        nome: nome.trim(),
        descricao: descricao.trim()
      }
    });
  }

  static async listarCursos() {
    return prisma.curso.findMany();
  }

  static async listarCursosComDisciplinas() {
    const cursos = await prisma.curso.findMany();
    return cursos;
  }

  static async obterCursoPorId(id) {
    const curso = await prisma.curso.findUnique({ where: { id: Number(id) } });
    if (!curso) throw new Error("Curso não encontrado.");
    return curso;
  }

  static async atualizarCurso(id, { nome, descricao }) {
    const curso = await prisma.curso.findUnique({ where: { id: Number(id) } });
    if (!curso) throw new Error("Curso não encontrado.");

    const updateData = {};
    if (nome?.trim()) updateData.nome = nome.trim();
    if (descricao?.trim()) updateData.descricao = descricao.trim();

    return prisma.curso.update({
      where: { id: Number(id) },
      data: updateData
    });
  }

  static async deletarCurso(id) {
    const curso = await prisma.curso.findUnique({ where: { id: Number(id) } });
    if (!curso) throw new Error("Curso não encontrado.");
    
    await prisma.curso.delete({ where: { id: Number(id) } });
    return { mensagem: "Curso removido com sucesso." };
  }
}