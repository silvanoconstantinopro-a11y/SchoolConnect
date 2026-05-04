import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceDisciplina {

  static async criarDisciplina({ nome, descricao, cursoId }) {
    if (!nome || !cursoId) throw new Error("Nome e cursoId são obrigatórios.");
    return prisma.disciplina.create({
      data: { nome, descricao: descricao || "", cursoId: Number(cursoId) },
      include: { curso: true },
    });
  }

  static async listarDisciplinas() {
    return prisma.disciplina.findMany({ include: { curso: true }, orderBy: { nome: "asc" } });
  }

  static async obterDisciplinaPorId(id) {
    const d = await prisma.disciplina.findUnique({ where: { id: Number(id) }, include: { curso: true } });
    if (!d) throw new Error("Disciplina não encontrada.");
    return d;
  }

  static async atualizarDisciplina(id, { nome, descricao, cursoId }) {
    const d = await prisma.disciplina.findUnique({ where: { id: Number(id) } });
    if (!d) throw new Error("Disciplina não encontrada.");
    return prisma.disciplina.update({
      where: { id: Number(id) },
      data: {
        nome:      nome      ?? d.nome,
        descricao: descricao ?? d.descricao,
        cursoId:   cursoId   ? Number(cursoId) : d.cursoId,
      },
      include: { curso: true },
    });
  }

  static async deletarDisciplina(id) {
    const d = await prisma.disciplina.findUnique({ where: { id: Number(id) } });
    if (!d) throw new Error("Disciplina não encontrada.");
    await prisma.disciplina.delete({ where: { id: Number(id) } });
    return { mensagem: "Disciplina deletada com sucesso." };
  }
}