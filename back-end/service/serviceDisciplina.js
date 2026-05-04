import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceDisciplina {

  static async criarDisciplina({ nome, descricao, cursoId }) {
    if (!nome?.trim() || !cursoId)
      throw new Error("Nome e cursoId são obrigatórios.");

    const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
    if (!curso) throw new Error("Curso não encontrado.");

    return prisma.disciplina.create({
      data: {
        nome:      nome.trim(),
        descricao: descricao?.trim() || "",
        cursoId:   Number(cursoId),
      },
      include: {
        curso:       true,
        professores: { select: { id: true, nome: true, email: true } },
      },
    });
  }

  static async listarDisciplinas({ cursoId } = {}) {
    const where = cursoId ? { cursoId: Number(cursoId) } : undefined;
    return prisma.disciplina.findMany({
      where,
      include: {
        curso:       true,
        professores: { select: { id: true, nome: true, email: true } },
        _count:      { select: { notas: true } },
      },
      orderBy: { nome: "asc" },
    });
  }

  static async obterDisciplinaPorId(id) {
    const d = await prisma.disciplina.findUnique({
      where:   { id: Number(id) },
      include: {
        curso:       true,
        professores: { select: { id: true, nome: true, email: true } },
        notas:       { include: { aluno: { select: { id: true, nome: true } } } },
      },
    });
    if (!d) throw new Error("Disciplina não encontrada.");
    return d;
  }

  static async atualizarDisciplina(id, { nome, descricao, cursoId }) {
    const d = await prisma.disciplina.findUnique({ where: { id: Number(id) } });
    if (!d) throw new Error("Disciplina não encontrada.");
    return prisma.disciplina.update({
      where: { id: Number(id) },
      data:  {
        nome:      nome?.trim()      ?? d.nome,
        descricao: descricao?.trim() ?? d.descricao,
        cursoId:   cursoId ? Number(cursoId) : d.cursoId,
      },
      include: { curso: true },
    });
  }

  static async deletarDisciplina(id) {
    const d = await prisma.disciplina.findUnique({ where: { id: Number(id) } });
    if (!d) throw new Error("Disciplina não encontrada.");
    await prisma.disciplina.delete({ where: { id: Number(id) } });
    return { mensagem: "Disciplina removida com sucesso." };
  }
}