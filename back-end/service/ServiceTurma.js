/**
 * ServiceTurma.js
 * Gestão de turmas.
 */
import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  professor: { select: { id: true, nome: true, email: true, imagem: true } },
  alunos:    { select: { id: true, nome: true, matricula: true, classe: true, imagem: true } },
};

export class ServiceTurma {

  static async criarTurma({ nome, professorId, usuarioId }) {
    if (!nome?.trim()) throw new Error("Nome da turma é obrigatório.");

    const pid = professorId ?? usuarioId ?? null;
    if (pid) {
      const prof = await prisma.usuario.findUnique({ where: { id: Number(pid) } });
      if (!prof) throw new Error("Professor não encontrado.");
    }

    return prisma.turma.create({
      data: {
        nome: nome.trim(),
        ...(pid != null && { professorId: Number(pid) }),
      },
      include: INCLUDE,
    });
  }

  static async listarTurmas({ professorId } = {}) {
    const where = professorId ? { professorId: Number(professorId) } : undefined;
    return prisma.turma.findMany({ where, include: INCLUDE, orderBy: { nome: "asc" } });
  }

  static async obterTurmaPorId(id) {
    const t = await prisma.turma.findUnique({ where: { id: Number(id) }, include: INCLUDE });
    if (!t) throw new Error("Turma não encontrada.");
    return t;
  }

  static async atualizarTurma(id, { nome, professorId, usuarioId }) {
    const t = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!t) throw new Error("Turma não encontrada.");

    const pid = professorId ?? usuarioId;
    return prisma.turma.update({
      where: { id: Number(id) },
      data: {
        nome:        nome?.trim() ?? t.nome,
        professorId: pid !== undefined ? (pid ? Number(pid) : null) : t.professorId,
      },
      include: INCLUDE,
    });
  }

  static async deletarTurma(id) {
    const t = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!t) throw new Error("Turma não encontrada.");
    await prisma.turma.delete({ where: { id: Number(id) } });
    return { mensagem: "Turma removida com sucesso." };
  }
}