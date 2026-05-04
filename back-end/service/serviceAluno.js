/**
 * serviceAluno.js
 * Gestão completa de alunos.
 */
import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  turma:       true,
  curso:       true,
  encarregado: { select: { id: true, nome: true, email: true, telefone: true, imagem: true } },
  notas: {
    include: { disciplina: { select: { id: true, nome: true } } },
    orderBy: { criadoEm: "desc" },
  },
};

export class ServiceAluno {

  static async criarAluno(dados) {
    const { nome, matricula, turmaId, telefone, classe, encarregadoId, cursoId, imagem } = dados;

    if (!nome?.trim() || !matricula?.trim() || !turmaId || !cursoId)
      throw new Error("Campos obrigatórios: nome, matricula, turmaId, cursoId.");

    if (await prisma.aluno.findUnique({ where: { matricula: matricula.trim() } }))
      throw new Error("Esta matrícula já está registada.");

    if (telefone?.trim() && await prisma.aluno.findUnique({ where: { telefone: telefone.trim() } }))
      throw new Error("Este telefone já está registado.");

    const [turma, curso] = await Promise.all([
      prisma.turma.findUnique({ where: { id: Number(turmaId) } }),
      prisma.curso.findUnique({ where: { id: Number(cursoId) } }),
    ]);
    if (!turma) throw new Error("Turma não encontrada.");
    if (!curso) throw new Error("Curso não encontrado.");

    return prisma.aluno.create({
      data: {
        nome:          nome.trim(),
        matricula:     matricula.trim(),
        telefone:      telefone?.trim() || "",
        classe:        classe?.trim()   || "",
        turmaId:       Number(turmaId),
        cursoId:       Number(cursoId),
        imagem:        imagem || null,
        encarregadoId: encarregadoId ? Number(encarregadoId) : null,
      },
      include: INCLUDE,
    });
  }

  static async listarAlunos({ turmaId, cursoId, encarregadoId } = {}) {
    const where = {};
    if (turmaId)       where.turmaId       = Number(turmaId);
    if (cursoId)       where.cursoId       = Number(cursoId);
    if (encarregadoId) where.encarregadoId = Number(encarregadoId);

    return prisma.aluno.findMany({
      where,
      include: INCLUDE,
      orderBy: { nome: "asc" },
    });
  }

  static async obterAlunoPorId(id) {
    const a = await prisma.aluno.findUnique({ where: { id: Number(id) }, include: INCLUDE });
    if (!a) throw new Error("Aluno não encontrado.");
    return a;
  }

  static async obterAlunoPorMatricula(matricula) {
    const a = await prisma.aluno.findUnique({ where: { matricula }, include: INCLUDE });
    if (!a) throw new Error("Aluno não encontrado.");
    return a;
  }

  static async atualizarAluno(id, dados) {
    const { nome, matricula, turmaId, telefone, classe, encarregadoId, cursoId, imagem } = dados;

    const a = await prisma.aluno.findUnique({ where: { id: Number(id) } });
    if (!a) throw new Error("Aluno não encontrado.");

    return prisma.aluno.update({
      where: { id: Number(id) },
      data: {
        nome:          nome?.trim()      ?? a.nome,
        matricula:     matricula?.trim() ?? a.matricula,
        telefone:      telefone?.trim()  ?? a.telefone,
        classe:        classe?.trim()    ?? a.classe,
        imagem:        imagem            ?? a.imagem,
        turmaId:       turmaId       ? Number(turmaId)       : a.turmaId,
        cursoId:       cursoId       ? Number(cursoId)       : a.cursoId,
        encarregadoId: encarregadoId !== undefined
          ? (encarregadoId ? Number(encarregadoId) : null)
          : a.encarregadoId,
      },
      include: INCLUDE,
    });
  }

  static async deletarAluno(id) {
    const a = await prisma.aluno.findUnique({ where: { id: Number(id) } });
    if (!a) throw new Error("Aluno não encontrado.");
    await prisma.aluno.delete({ where: { id: Number(id) } });
    return { mensagem: "Aluno removido com sucesso." };
  }
}