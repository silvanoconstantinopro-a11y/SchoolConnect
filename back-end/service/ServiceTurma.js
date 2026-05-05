import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceTurma {

  static async criarTurma({ nome, professorId, usuarioId }) {
    if (!nome?.trim()) throw new Error("Nome da turma é obrigatório.");

    const exists = await prisma.turma.findFirst({ where: { nome: nome.trim() } });
    if (exists) throw new Error("Já existe uma turma com este nome.");

    const pid = professorId ?? usuarioId ?? null;
    if (pid) {
      const prof = await prisma.usuario.findUnique({ where: { id: Number(pid) } });
      if (!prof) throw new Error("Professor não encontrado.");
      if (prof.perfil !== "PROFESSOR") throw new Error("O utilizador indicado não é um professor.");
    }

    return prisma.turma.create({
      data: {
        nome: nome.trim(),
        professorId: pid ? Number(pid) : null
      }
    });
  }

  static async listarTurmas({ professorId } = {}) {
    const where = professorId ? { professorId: Number(professorId) } : {};
    return prisma.turma.findMany({ where });
  }

  static async obterTurmaPorId(id) {
    const turma = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!turma) throw new Error("Turma não encontrada.");
    return turma;
  }

  static async atualizarTurma(id, { nome, professorId, usuarioId }) {
    const turma = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!turma) throw new Error("Turma não encontrada.");

    const updateData = {};
    if (nome?.trim()) updateData.nome = nome.trim();

    const pid = professorId ?? usuarioId;
    if (pid !== undefined) {
      if (pid) {
        const prof = await prisma.usuario.findUnique({ where: { id: Number(pid) } });
        if (!prof) throw new Error("Professor não encontrado.");
        if (prof.perfil !== "PROFESSOR") throw new Error("O utilizador indicado não é um professor.");
        updateData.professorId = Number(pid);
      } else {
        updateData.professorId = null;
      }
    }

    return prisma.turma.update({
      where: { id: Number(id) },
      data: updateData
    });
  }

  static async deletarTurma(id) {
    const turma = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!turma) throw new Error("Turma não encontrada.");
    
    await prisma.turma.delete({ where: { id: Number(id) } });
    return { mensagem: "Turma removida com sucesso." };
  }
}