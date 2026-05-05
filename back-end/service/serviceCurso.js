import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceCurso {

  static async criarCurso({ nome, descricao }) {
    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!descricao?.trim()) throw new Error("Descrição é obrigatória.");

    const exists = await prisma.curso.findUnique({
      where: { nome: nome.trim() },
      select: { id: true }
    });
    if (exists) throw new Error("Já existe um curso com este nome.");

    return prisma.curso.create({
      data: {
        nome: nome.trim(),
        descricao: descricao.trim()
      }
    });
  }

  static async listarCursos() {
    return prisma.curso.findMany({
      orderBy: { nome: "asc" }
    });
  }

  static async listarCursosComDisciplinas() {
    return prisma.curso.findMany({
      include: {
        disciplinas: {
          include: {
            professores: { select: { id: true, nome: true, email: true, imagem: true } }
          },
          orderBy: { nome: "asc" }
        },
        professores: { select: { id: true, nome: true, email: true, imagem: true } },
        _count: { select: { alunos: true, disciplinas: true } }
      },
      orderBy: { nome: "asc" }
    });
  }

  static async obterCursoPorId(id) {
    const curso = await prisma.curso.findUnique({
      where: { id: Number(id) },
      include: {
        disciplinas: {
          include: {
            professores: { select: { id: true, nome: true, email: true } }
          },
          orderBy: { nome: "asc" }
        },
        professores: { select: { id: true, nome: true, email: true } },
        _count: { select: { alunos: true } }
      }
    });
    if (!curso) throw new Error("Curso não encontrado.");
    return curso;
  }

  static async atualizarCurso(id, { nome, descricao }) {
    const curso = await prisma.curso.findUnique({ where: { id: Number(id) } });
    if (!curso) throw new Error("Curso não encontrado.");

    if (nome?.trim() && nome.trim() !== curso.nome) {
      const exists = await prisma.curso.findUnique({
        where: { nome: nome.trim() },
        select: { id: true }
      });
      if (exists) throw new Error("Já existe um curso com este nome.");
    }

    return prisma.curso.update({
      where: { id: Number(id) },
      data: {
        nome: nome?.trim() ?? curso.nome,
        descricao: descricao?.trim() ?? curso.descricao
      }
    });
  }

  static async deletarCurso(id) {
    const curso = await prisma.curso.findUnique({
      where: { id: Number(id) },
      include: {
        disciplinas: { select: { id: true } },
        alunos: { select: { id: true } }
      }
    });
    if (!curso) throw new Error("Curso não encontrado.");
    
    if (curso.disciplinas.length > 0) {
      throw new Error("Não é possível remover um curso que possui disciplinas.");
    }
    
    if (curso.alunos.length > 0) {
      throw new Error("Não é possível remover um curso que possui alunos.");
    }
    
    await prisma.curso.delete({ where: { id: Number(id) } });
    return { mensagem: "Curso removido com sucesso." };
  }

  static async adicionarProfessor(cursoId, professorId) {
    const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
    if (!curso) throw new Error("Curso não encontrado.");
    
    const professor = await prisma.usuario.findUnique({
      where: { id: Number(professorId) },
      select: { id: true, perfil: true }
    });
    if (!professor) throw new Error("Professor não encontrado.");
    if (professor.perfil !== "PROFESSOR") {
      throw new Error("O utilizador indicado não é um professor.");
    }

    return prisma.curso.update({
      where: { id: Number(cursoId) },
      data: {
        professores: { connect: { id: Number(professorId) } }
      },
      include: { professores: true }
    });
  }

  static async removerProfessor(cursoId, professorId) {
    const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
    if (!curso) throw new Error("Curso não encontrado.");

    return prisma.curso.update({
      where: { id: Number(cursoId) },
      data: {
        professores: { disconnect: { id: Number(professorId) } }
      },
      include: { professores: true }
    });
  }
}