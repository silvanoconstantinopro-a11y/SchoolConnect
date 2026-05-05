/**
 * serviceAluno.js
 * Gestão completa de alunos.
 */
import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  turma: { select: { id: true, nome: true, professor: { select: { id: true, nome: true } } } },
  curso: { select: { id: true, nome: true, descricao: true } },
  encarregado: { select: { id: true, nome: true, email: true, telefone: true, imagem: true } },
  notas: {
    include: { disciplina: { select: { id: true, nome: true } } },
    orderBy: { criadoEm: "desc" }
  }
};

export class ServiceAluno {

  static async criarAluno(dados) {
    const { nome, matricula, turmaId, telefone, classe, encarregadoId, cursoId, imagem } = dados;

    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!matricula?.trim()) throw new Error("Matrícula é obrigatória.");
    if (!turmaId) throw new Error("Turma é obrigatória.");
    if (!cursoId) throw new Error("Curso é obrigatório.");

    // Verificar unicidade
    const [matriculaExists, telefoneExists] = await Promise.all([
      prisma.aluno.findUnique({ where: { matricula: matricula.trim() }, select: { id: true } }),
      telefone?.trim() ? prisma.aluno.findUnique({ where: { telefone: telefone.trim() }, select: { id: true } }) : Promise.resolve(null)
    ]);
    
    if (matriculaExists) throw new Error("Esta matrícula já está registada.");
    if (telefoneExists) throw new Error("Este telefone já está registado.");

    // Validar turma e curso
    const [turma, curso] = await Promise.all([
      prisma.turma.findUnique({ where: { id: Number(turmaId) }, select: { id: true } }),
      prisma.curso.findUnique({ where: { id: Number(cursoId) }, select: { id: true } })
    ]);
    
    if (!turma) throw new Error("Turma não encontrada.");
    if (!curso) throw new Error("Curso não encontrado.");

    // Validar encarregado se fornecido
    if (encarregadoId) {
      const encarregado = await prisma.usuario.findUnique({ 
        where: { id: Number(encarregadoId) },
        select: { id: true, perfil: true }
      });
      if (!encarregado) throw new Error("Encarregado não encontrado.");
      if (encarregado.perfil !== "ENCARREGADO") {
        throw new Error("O utilizador indicado não é um encarregado.");
      }
    }

    return prisma.aluno.create({
      data: {
        nome: nome.trim(),
        matricula: matricula.trim(),
        telefone: telefone?.trim() || null,
        classe: classe?.trim() || null,
        turmaId: Number(turmaId),
        cursoId: Number(cursoId),
        imagem: imagem || null,
        encarregadoId: encarregadoId ? Number(encarregadoId) : null
      },
      include: INCLUDE
    });
  }

  static async listarAlunos({ turmaId, cursoId, encarregadoId, search } = {}) {
    const where = {};
    if (turmaId) where.turmaId = Number(turmaId);
    if (cursoId) where.cursoId = Number(cursoId);
    if (encarregadoId) where.encarregadoId = Number(encarregadoId);
    if (search?.trim()) {
      where.OR = [
        { nome: { contains: search.trim() } },
        { matricula: { contains: search.trim() } },
        { classe: { contains: search.trim() } }
      ];
    }

    return prisma.aluno.findMany({
      where,
      include: INCLUDE,
      orderBy: { nome: "asc" }
    });
  }

  static async obterAlunoPorId(id) {
    const aluno = await prisma.aluno.findUnique({ 
      where: { id: Number(id) }, 
      include: INCLUDE 
    });
    if (!aluno) throw new Error("Aluno não encontrado.");
    return aluno;
  }

  static async obterAlunoPorMatricula(matricula) {
    const aluno = await prisma.aluno.findUnique({ 
      where: { matricula }, 
      include: INCLUDE 
    });
    if (!aluno) throw new Error("Aluno não encontrado.");
    return aluno;
  }

  static async obterAlunosPorEncarregado(encarregadoId) {
    const alunos = await prisma.aluno.findMany({
      where: { encarregadoId: Number(encarregadoId) },
      include: {
        turma: { select: { id: true, nome: true } },
        curso: { select: { id: true, nome: true } },
        notas: {
          include: { disciplina: { select: { id: true, nome: true } } },
          take: 10,
          orderBy: { criadoEm: "desc" }
        }
      },
      orderBy: { nome: "asc" }
    });
    return alunos;
  }

  static async atualizarAluno(id, dados) {
    const { nome, matricula, turmaId, telefone, classe, encarregadoId, cursoId, imagem } = dados;

    const aluno = await prisma.aluno.findUnique({ where: { id: Number(id) } });
    if (!aluno) throw new Error("Aluno não encontrado.");

    const updateData = {};

    if (nome?.trim()) updateData.nome = nome.trim();
    
    if (matricula?.trim() && matricula.trim() !== aluno.matricula) {
      const exists = await prisma.aluno.findUnique({
        where: { matricula: matricula.trim() },
        select: { id: true }
      });
      if (exists) throw new Error("Esta matrícula já está registada.");
      updateData.matricula = matricula.trim();
    }
    
    if (telefone !== undefined) {
      if (telefone?.trim() && telefone.trim() !== aluno.telefone) {
        const exists = await prisma.aluno.findUnique({
          where: { telefone: telefone.trim() },
          select: { id: true }
        });
        if (exists) throw new Error("Este telefone já está registado.");
        updateData.telefone = telefone.trim();
      } else if (!telefone?.trim()) {
        updateData.telefone = null;
      }
    }
    
    if (classe !== undefined) updateData.classe = classe?.trim() || null;
    if (imagem !== undefined) updateData.imagem = imagem || null;
    
    if (turmaId) {
      const turma = await prisma.turma.findUnique({ where: { id: Number(turmaId) }, select: { id: true } });
      if (!turma) throw new Error("Turma não encontrada.");
      updateData.turmaId = Number(turmaId);
    }
    
    if (cursoId) {
      const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) }, select: { id: true } });
      if (!curso) throw new Error("Curso não encontrado.");
      updateData.cursoId = Number(cursoId);
    }
    
    if (encarregadoId !== undefined) {
      if (encarregadoId) {
        const encarregado = await prisma.usuario.findUnique({ 
          where: { id: Number(encarregadoId) },
          select: { id: true, perfil: true }
        });
        if (!encarregado) throw new Error("Encarregado não encontrado.");
        if (encarregado.perfil !== "ENCARREGADO") {
          throw new Error("O utilizador indicado não é um encarregado.");
        }
        updateData.encarregadoId = Number(encarregadoId);
      } else {
        updateData.encarregadoId = null;
      }
    }

    return prisma.aluno.update({
      where: { id: Number(id) },
      data: updateData,
      include: INCLUDE
    });
  }

  static async deletarAluno(id) {
    const aluno = await prisma.aluno.findUnique({ 
      where: { id: Number(id) },
      include: { notas: { select: { id: true } } }
    });
    if (!aluno) throw new Error("Aluno não encontrado.");
    
    // Remover notas primeiro (cascade cuida disso, mas verificamos)
    if (aluno.notas.length > 0) {
      await prisma.nota.deleteMany({ where: { alunoId: Number(id) } });
    }
    
    await prisma.aluno.delete({ where: { id: Number(id) } });
    return { mensagem: "Aluno removido com sucesso." };
  }

  static async getAlunosCountByTurma() {
    const result = await prisma.turma.findMany({
      select: {
        id: true,
        nome: true,
        _count: { select: { alunos: true } }
      },
      orderBy: { nome: "asc" }
    });
    return result;
  }
}