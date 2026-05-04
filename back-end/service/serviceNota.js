import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  aluno:      { select: { id:true, nome:true, matricula:true } },
  disciplina: { select: { id:true, nome:true } },
};

export class ServiceNota {

  static async criarNota({ valor, tipo, alunoId, disciplinaId }) {
    if (!valor || !tipo || !alunoId || !disciplinaId)
      throw new Error("Campos obrigatórios: valor, tipo, alunoId, disciplinaId.");
    return prisma.nota.create({
      data: { valor: Number(valor), tipo, alunoId: Number(alunoId), disciplinaId: Number(disciplinaId) },
      include: INCLUDE,
    });
  }

  static async listarNotas() {
    return prisma.nota.findMany({ include: INCLUDE, orderBy: { criadoEm: "desc" } });
  }

  static async obterNotaPorId(id) {
    const n = await prisma.nota.findUnique({ where: { id: Number(id) }, include: INCLUDE });
    if (!n) throw new Error("Nota não encontrada.");
    return n;
  }

  static async atualizarNota(id, { valor, tipo }) {
    const n = await prisma.nota.findUnique({ where: { id: Number(id) } });
    if (!n) throw new Error("Nota não encontrada.");
    return prisma.nota.update({
      where: { id: Number(id) },
      data:  { valor: valor ? Number(valor) : n.valor, tipo: tipo ?? n.tipo },
      include: INCLUDE,
    });
  }

  static async deletarNota(id) {
    const n = await prisma.nota.findUnique({ where: { id: Number(id) } });
    if (!n) throw new Error("Nota não encontrada.");
    await prisma.nota.delete({ where: { id: Number(id) } });
    return { mensagem: "Nota deletada com sucesso." };
  }
}