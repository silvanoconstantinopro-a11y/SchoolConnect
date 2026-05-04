import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  aluno:      { select: { id: true, nome: true, matricula: true, classe: true } },
  disciplina: { select: { id: true, nome: true, curso: { select: { id: true, nome: true } } } },
};

export class ServiceNota {

  static async criarNota({ valor, tipo, alunoId, disciplinaId }) {
    if (valor === undefined || valor === null || !tipo?.trim() || !alunoId || !disciplinaId)
      throw new Error("Campos obrigatórios: valor, tipo, alunoId, disciplinaId.");

    const v = Number(valor);
    if (isNaN(v) || v < 0 || v > 20)
      throw new Error("Nota deve ser um número entre 0 e 20.");

    const [aluno, disc] = await Promise.all([
      prisma.aluno.findUnique({ where: { id: Number(alunoId) } }),
      prisma.disciplina.findUnique({ where: { id: Number(disciplinaId) } }),
    ]);
    if (!aluno) throw new Error("Aluno não encontrado.");
    if (!disc)  throw new Error("Disciplina não encontrada.");

    return prisma.nota.create({
      data: {
        valor:        v,
        tipo:         tipo.trim(),
        alunoId:      Number(alunoId),
        disciplinaId: Number(disciplinaId),
      },
      include: INCLUDE,
    });
  }

  static async listarNotas({ alunoId, disciplinaId } = {}) {
    const where = {};
    if (alunoId)      where.alunoId      = Number(alunoId);
    if (disciplinaId) where.disciplinaId = Number(disciplinaId);

    return prisma.nota.findMany({ where, include: INCLUDE, orderBy: { criadoEm: "desc" } });
  }

  static async obterNotaPorId(id) {
    const n = await prisma.nota.findUnique({ where: { id: Number(id) }, include: INCLUDE });
    if (!n) throw new Error("Nota não encontrada.");
    return n;
  }

  static async atualizarNota(id, { valor, tipo }) {
    const n = await prisma.nota.findUnique({ where: { id: Number(id) } });
    if (!n) throw new Error("Nota não encontrada.");

    let v = n.valor;
    if (valor !== undefined && valor !== null) {
      v = Number(valor);
      if (isNaN(v) || v < 0 || v > 20)
        throw new Error("Nota deve ser um número entre 0 e 20.");
    }

    return prisma.nota.update({
      where: { id: Number(id) },
      data:  { valor: v, tipo: tipo?.trim() ?? n.tipo },
      include: INCLUDE,
    });
  }

  static async deletarNota(id) {
    const n = await prisma.nota.findUnique({ where: { id: Number(id) } });
    if (!n) throw new Error("Nota não encontrada.");
    await prisma.nota.delete({ where: { id: Number(id) } });
    return { mensagem: "Nota removida com sucesso." };
  }

  /** Calcula a média de notas de um aluno por disciplina */
  static async mediaAlunoByDisciplina(alunoId) {
    const notas = await prisma.nota.findMany({
      where:   { alunoId: Number(alunoId) },
      include: { disciplina: { select: { id: true, nome: true } } },
    });

    const mapa = {};
    for (const n of notas) {
      const key = n.disciplinaId;
      if (!mapa[key]) mapa[key] = { disciplina: n.disciplina, notas: [] };
      mapa[key].notas.push(n.valor);
    }

    return Object.values(mapa).map(({ disciplina, notas }) => ({
      disciplina,
      media: notas.reduce((s, v) => s + v, 0) / notas.length,
      total: notas.length,
    }));
  }
}