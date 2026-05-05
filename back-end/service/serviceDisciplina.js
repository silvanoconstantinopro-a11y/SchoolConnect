import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceDisciplina {

  static async criarDisciplina({ nome, descricao, cursoId }) {
    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!cursoId) throw new Error("Curso é obrigatório.");

    const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
    if (!curso) throw new Error("Curso não encontrado.");

    const exists = await prisma.disciplina.findFirst({
      where: { nome: nome.trim(), cursoId: Number(cursoId) }
    });
    if (exists) throw new Error("Já existe uma disciplina com este nome neste curso.");

    return prisma.disciplina.create({
      data: {
        nome: nome.trim(),
        descricao: descricao?.trim() || "",
        cursoId: Number(cursoId)
      }
    });
  }

  static async listarDisciplinas({ cursoId } = {}) {
    const where = cursoId ? { cursoId: Number(cursoId) } : {};
    return prisma.disciplina.findMany({ where });
  }

  static async obterDisciplinaPorId(id) {
    const disciplina = await prisma.disciplina.findUnique({ where: { id: Number(id) } });
    if (!disciplina) throw new Error("Disciplina não encontrada.");
    return disciplina;
  }

  static async atualizarDisciplina(id, { nome, descricao, cursoId }) {
    const disciplina = await prisma.disciplina.findUnique({ where: { id: Number(id) } });
    if (!disciplina) throw new Error("Disciplina não encontrada.");

    const updateData = {};
    if (nome?.trim()) updateData.nome = nome.trim();
    if (descricao !== undefined) updateData.descricao = descricao?.trim() || "";
    if (cursoId) {
      const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
      if (!curso) throw new Error("Curso não encontrado.");
      updateData.cursoId = Number(cursoId);
    }

    return prisma.disciplina.update({
      where: { id: Number(id) },
      data: updateData
    });
  }

  static async deletarDisciplina(id) {
    const disciplina = await prisma.disciplina.findUnique({ where: { id: Number(id) } });
    if (!disciplina) throw new Error("Disciplina não encontrada.");
    
    await prisma.disciplina.delete({ where: { id: Number(id) } });
    return { mensagem: "Disciplina removida com sucesso." };
  }
}