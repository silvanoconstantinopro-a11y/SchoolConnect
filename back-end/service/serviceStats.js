import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceStats {

  /** Contagens globais para o dashboard do admin */
  static async getStats() {
    const [
      totalUsuarios, professores, encarregados,
      cursos, alunos, avisos, eventos,
      reunioes, turmas, disciplinas, feedbacks,
    ] = await Promise.all([
      prisma.usuario.count(),
      prisma.usuario.count({ where: { perfil: "PROFESSOR" } }),
      prisma.usuario.count({ where: { perfil: "ENCARREGADO" } }),
      prisma.curso.count(),
      prisma.aluno.count(),
      prisma.aviso.count(),
      prisma.evento.count(),
      prisma.reuniao.count(),
      prisma.turma.count(),
      prisma.disciplina.count(),
      prisma.feedback.count(),
    ]);

    // Reuniões futuras
    const reunioesFuturas = await prisma.reuniao.count({
      where: { dataHora: { gte: new Date() } },
    });

    return {
      totalUsuarios, professores, encarregados,
      cursos, alunos, avisos, eventos,
      reunioes, reunioesFuturas, turmas, disciplinas, feedbacks,
    };
  }

  static async listarUsuarios() {
    const lista = await prisma.usuario.findMany({
      include:  { disciplinas: true, turmas: true, cursos: true },
      orderBy:  { nome: "asc" },
    });
    return lista.map(({ senha, ...r }) => r);
  }

  static listarCursos() {
    return prisma.curso.findMany({
      include: { _count: { select: { alunos: true, disciplinas: true } } },
      orderBy: { nome: "asc" },
    });
  }

  static listarAlunos() {
    return prisma.aluno.findMany({
      include: {
        turma:       { select: { id: true, nome: true } },
        curso:       { select: { id: true, nome: true } },
        encarregado: { select: { id: true, nome: true } },
      },
      orderBy: { nome: "asc" },
    });
  }

  static listarAvisos() {
    return prisma.aviso.findMany({ orderBy: { criadoEm: "desc" } });
  }

  static listarEventos() {
    return prisma.evento.findMany({ orderBy: { criadoEm: "desc" } });
  }

  static listarReunioes() {
    return prisma.reuniao.findMany({
      include: {
        criadoPor:     { select: { id: true, nome: true } },
        participantes: { include: { usuario: { select: { id: true, nome: true } } } },
      },
      orderBy: { criadoEm: "desc" },
    });
  }

  static listarTurmas() {
    return prisma.turma.findMany({
      include: {
        professor: { select: { id: true, nome: true } },
        _count:    { select: { alunos: true } },
      },
      orderBy: { nome: "asc" },
    });
  }
}