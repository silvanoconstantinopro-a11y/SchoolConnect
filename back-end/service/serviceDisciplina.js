import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceDisciplina {

  static async criarDisciplina({ nome, descricao, cursoId }) {
    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!cursoId) throw new Error("Curso é obrigatório.");

    const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
    if (!curso) throw new Error("Curso não encontrado.");

    const exists = await prisma.disciplina.findFirst({
      where: {
        nome: nome.trim(),
        cursoId: Number(cursoId)
      }
    });
    if (exists) throw new Error("Já existe uma disciplina com este nome neste curso.");

    return prisma.disciplina.create({
      data: {
        nome: nome.trim(),
        descricao: descricao?.trim() || "",
        cursoId: Number(cursoId)
      },
      include: {
        curso: true,
        professores: { select: { id: true, nome: true, email: true } }
      }
    });
  }

  static async listarDisciplinas({ cursoId, professorId } = {}) {
    const where = {};
    if (cursoId) where.cursoId = Number(cursoId);
    if (professorId) {
      where.professores = { some: { id: Number(professorId) } };
    }

    return prisma.disciplina.findMany({
      where,
      include: {
        curso: true,
        professores: { select: { id: true, nome: true, email: true } },
        _count: { select: { notas: true } }
      },
      orderBy: { nome: "asc" }
    });
  }

  static async obterDisciplinaPorId(id) {
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: Number(id) },
      include: {
        curso: true,
        professores: { select: { id: true, nome: true, email: true } },
        notas: {
          include: { aluno: { select: { id: true, nome: true, matricula: true } } },
          take: 50,
          orderBy: { criadoEm: "desc" }
        }
      }
    });
    if (!disciplina) throw new Error("Disciplina não encontrada.");
    return disciplina;
  }

  static async atualizarDisciplina(id, { nome, descricao, cursoId }) {
    const disciplina = await prisma.disciplina.findUnique({ where: { id: Number(id) } });
    if (!disciplina) throw new Error("Disciplina não encontrada.");

    const updateData = {};
    
    if (nome?.trim() && nome.trim() !== disciplina.nome) {
      const exists = await prisma.disciplina.findFirst({
        where: {
          nome: nome.trim(),
          cursoId: cursoId ?? disciplina.cursoId,
          id: { not: Number(id) }
        }
      });
      if (exists) throw new Error("Já existe uma disciplina com este nome neste curso.");
      updateData.nome = nome.trim();
    }
    
    if (descricao !== undefined) updateData.descricao = descricao?.trim() || "";
    
    if (cursoId) {
      const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
      if (!curso) throw new Error("Curso não encontrado.");
      updateData.cursoId = Number(cursoId);
    }

    return prisma.disciplina.update({
      where: { id: Number(id) },
      data: updateData,
      include: { curso: true }
    });
  }

  static async deletarDisciplina(id) {
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: Number(id) },
      include: { notas: { select: { id: true } } }
    });
    if (!disciplina) throw new Error("Disciplina não encontrada.");
    
    if (disciplina.notas.length > 0) {
      await prisma.nota.deleteMany({ where: { disciplinaId: Number(id) } });
    }
    
    await prisma.disciplina.delete({ where: { id: Number(id) } });
    return { mensagem: "Disciplina removida com sucesso." };
  }

  static async adicionarProfessor(disciplinaId, professorId) {
    const disciplina = await prisma.disciplina.findUnique({ where: { id: Number(disciplinaId) } });
    if (!disciplina) throw new Error("Disciplina não encontrada.");
    
    const professor = await prisma.usuario.findUnique({
      where: { id: Number(professorId) },
      select: { id: true, perfil: true }
    });
    if (!professor) throw new Error("Professor não encontrado.");
    if (professor.perfil !== "PROFESSOR") {
      throw new Error("O utilizador indicado não é um professor.");
    }

    return prisma.disciplina.update({
      where: { id: Number(disciplinaId) },
      data: {
        professores: { connect: { id: Number(professorId) } }
      },
      include: { professores: true }
    });
  }

  static async removerProfessor(disciplinaId, professorId) {
    const disciplina = await prisma.disciplina.findUnique({ where: { id: Number(disciplinaId) } });
    if (!disciplina) throw new Error("Disciplina não encontrada.");

    return prisma.disciplina.update({
      where: { id: Number(disciplinaId) },
      data: {
        professores: { disconnect: { id: Number(professorId) } }
      },
      include: { professores: true }
    });
  }

  static async getDisciplinasPorProfessor(professorId) {
    return prisma.disciplina.findMany({
      where: { professores: { some: { id: Number(professorId) } } },
      include: {
        curso: true,
        _count: { select: { notas: true } }
      },
      orderBy: { nome: "asc" }
    });
  }
}