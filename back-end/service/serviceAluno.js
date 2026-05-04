/**
 * serviceAluno.js
 * Gestão completa de alunos (campo correcto: matricula).
 */
import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = { turma: true, curso: true, encarregado: { select: { id:true, nome:true, email:true } } };

export class ServiceAluno {

  static async criarAluno(dados) {
    const { nome, matricula, turmaId, telefone, classe, encarregadoId, cursoId, imagem } = dados;

    if (!nome || !matricula || !turmaId || !cursoId)
      throw new Error("Campos obrigatórios: nome, matricula, turmaId, cursoId.");

    if (await prisma.aluno.findUnique({ where: { matricula } }))
      throw new Error("Matrícula já cadastrada.");

    if (telefone && await prisma.aluno.findUnique({ where: { telefone } }))
      throw new Error("Telefone já cadastrado.");

    return prisma.aluno.create({
      data: {
        nome, matricula,
        telefone:     telefone || "",
        classe:       classe   || "",
        turmaId:      Number(turmaId),
        cursoId:      Number(cursoId),
        imagem:       imagem || null,
        encarregadoId: encarregadoId ? Number(encarregadoId) : null,
      },
      include: INCLUDE,
    });
  }

  static async listarAlunos() {
    return prisma.aluno.findMany({ include: INCLUDE, orderBy: { nome: "asc" } });
  }

  static async obterAlunoPorId(id) {
    const a = await prisma.aluno.findUnique({ where: { id: Number(id) }, include: INCLUDE });
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
        nome:          nome      ?? a.nome,
        matricula:     matricula ?? a.matricula,
        telefone:      telefone  ?? a.telefone,
        classe:        classe    ?? a.classe,
        imagem:        imagem    ?? a.imagem,
        turmaId:       turmaId   ? Number(turmaId)  : a.turmaId,
        cursoId:       cursoId   ? Number(cursoId)  : a.cursoId,
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
    return { mensagem: "Aluno deletado com sucesso." };
  }
}