/**
 * ServiceTurma.js
 * Gestão de turmas. O campo correcto no schema é professorId.
 * O front-end envia usuarioId (legado) — aceitamos ambos.
 */
import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = { professor: { select:{ id:true, nome:true, email:true } }, alunos: true };

export class ServiceTurma {

  static async criarTurma({ nome, professorId, usuarioId }) {
    if (!nome) throw new Error("Nome da turma é obrigatório.");
    const pid = professorId ?? usuarioId ?? null;
    return prisma.turma.create({
      data: { nome, ...(pid != null && { professorId: Number(pid) }) },
      include: INCLUDE,
    });
  }

  static async listarTurmas() {
    return prisma.turma.findMany({ include: INCLUDE, orderBy: { nome: "asc" } });
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
        ...(nome && { nome }),
        professorId: pid !== undefined ? (pid ? Number(pid) : null) : undefined,
      },
      include: INCLUDE,
    });
  }

  static async deletarTurma(id) {
    const t = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!t) throw new Error("Turma não encontrada.");
    await prisma.turma.delete({ where: { id: Number(id) } });
    return { mensagem: "Turma deletada com sucesso." };
  }
}