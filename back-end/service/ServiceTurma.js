/**
 * ServiceTurma.js
 * Gestão de turmas.
 */
import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  professor: { select: { id: true, nome: true, email: true, imagem: true, telefone: true } },
  alunos: { 
    select: { 
      id: true, nome: true, matricula: true, classe: true, imagem: true,
      curso: { select: { id: true, nome: true } }
    } 
  },
  _count: { select: { alunos: true } }
};

export class ServiceTurma {

  static async criarTurma({ nome, professorId, usuarioId }) {
    if (!nome?.trim()) {
      throw new Error("Nome da turma é obrigatório.");
    }

    // Verificar se nome já existe
    const exists = await prisma.turma.findUnique({
      where: { nome: nome.trim() },
      select: { id: true }
    });
    if (exists) throw new Error("Já existe uma turma com este nome.");

    const pid = professorId ?? usuarioId ?? null;
    if (pid) {
      const prof = await prisma.usuario.findUnique({ 
        where: { id: Number(pid) },
        select: { id: true, perfil: true }
      });
      if (!prof) throw new Error("Professor não encontrado.");
      if (prof.perfil !== "PROFESSOR") {
        throw new Error("O utilizador indicado não é um professor.");
      }
    }

    return prisma.turma.create({
      data: {
        nome: nome.trim(),
        ...(pid != null && { professorId: Number(pid) })
      },
      include: INCLUDE
    });
  }

  static async listarTurmas({ professorId } = {}) {
    const where = professorId ? { professorId: Number(professorId) } : undefined;
    return prisma.turma.findMany({ 
      where, 
      include: INCLUDE, 
      orderBy: { nome: "asc" } 
    });
  }

  static async obterTurmaPorId(id) {
    const turma = await prisma.turma.findUnique({ 
      where: { id: Number(id) }, 
      include: INCLUDE 
    });
    if (!turma) throw new Error("Turma não encontrada.");
    return turma;
  }

  static async atualizarTurma(id, { nome, professorId, usuarioId }) {
    const turma = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!turma) throw new Error("Turma não encontrada.");

    const updateData = {};
    
    if (nome?.trim()) {
      if (nome.trim() !== turma.nome) {
        const exists = await prisma.turma.findUnique({
          where: { nome: nome.trim() },
          select: { id: true }
        });
        if (exists) throw new Error("Já existe uma turma com este nome.");
      }
      updateData.nome = nome.trim();
    }

    const pid = professorId ?? usuarioId;
    if (pid !== undefined) {
      if (pid) {
        const prof = await prisma.usuario.findUnique({ 
          where: { id: Number(pid) },
          select: { id: true, perfil: true }
        });
        if (!prof) throw new Error("Professor não encontrado.");
        if (prof.perfil !== "PROFESSOR") {
          throw new Error("O utilizador indicado não é um professor.");
        }
        updateData.professorId = Number(pid);
      } else {
        updateData.professorId = null;
      }
    }

    return prisma.turma.update({
      where: { id: Number(id) },
      data: updateData,
      include: INCLUDE
    });
  }

  static async deletarTurma(id) {
    const turma = await prisma.turma.findUnique({ 
      where: { id: Number(id) },
      include: { alunos: { select: { id: true } } }
    });
    if (!turma) throw new Error("Turma não encontrada.");
    
    if (turma.alunos.length > 0) {
      throw new Error("Não é possível remover uma turma que contém alunos.");
    }
    
    await prisma.turma.delete({ where: { id: Number(id) } });
    return { mensagem: "Turma removida com sucesso." };
  }

  static async adicionarAluno(turmaId, alunoId) {
    const turma = await prisma.turma.findUnique({ where: { id: Number(turmaId) } });
    if (!turma) throw new Error("Turma não encontrada.");
    
    const aluno = await prisma.aluno.findUnique({ where: { id: Number(alunoId) } });
    if (!aluno) throw new Error("Aluno não encontrado.");
    
    return prisma.aluno.update({
      where: { id: Number(alunoId) },
      data: { turmaId: Number(turmaId) },
      include: { turma: true }
    });
  }

  static async removerAluno(turmaId, alunoId) {
    const aluno = await prisma.aluno.findUnique({ 
      where: { id: Number(alunoId) },
      select: { turmaId: true }
    });
    if (!aluno) throw new Error("Aluno não encontrado.");
    if (aluno.turmaId !== Number(turmaId)) {
      throw new Error("Aluno não pertence a esta turma.");
    }
    
    return prisma.aluno.update({
      where: { id: Number(alunoId) },
      data: { turmaId: null },
      include: { turma: true }
    });
  }
}