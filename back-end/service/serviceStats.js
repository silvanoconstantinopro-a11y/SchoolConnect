import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceStats {

  static async getStats() {
    const [
      totalUsuarios,
      professores,
      encarregados,
      cursos,
      alunos,
      avisos,
      eventos,
      reunioes,
      turmas,
      disciplinas,
      feedbacks,
      mensagens
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
      prisma.mensagem.count()
    ]);

    // Reuniões futuras
    const reunioesFuturas = await prisma.reuniao.count({
      where: { dataHora: { gte: new Date() } }
    });

    // Reuniões hoje
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    
    const reunioesHoje = await prisma.reuniao.count({
      where: {
        dataHora: { gte: hoje, lt: amanha }
      }
    });

    // Notas por faixa
    const notas = await prisma.nota.findMany({
      select: { valor: true }
    });
    
    const notasDistribuicao = {
      excelente: notas.filter(n => n.valor >= 18).length,
      bom: notas.filter(n => n.valor >= 14 && n.valor < 18).length,
      suficiente: notas.filter(n => n.valor >= 10 && n.valor < 14).length,
      insuficiente: notas.filter(n => n.valor < 10).length
    };

    return {
      usuarios: {
        total: totalUsuarios,
        professores,
        encarregados
      },
      academicos: {
        cursos,
        alunos,
        turmas,
        disciplinas
      },
      comunicacao: {
        avisos,
        eventos,
        reunioes,
        reunioesFuturas,
        reunioesHoje,
        mensagens,
        feedbacks
      },
      notasDistribuicao
    };
  }

  static async getStatsPorPeriodo(inicio, fim) {
    const startDate = new Date(inicio);
    const endDate = new Date(fim);
    endDate.setHours(23, 59, 59, 999);

    const [usuariosNovos, avisosPeriodo, reunioesPeriodo, mensagensPeriodo] = await Promise.all([
      prisma.usuario.count({
        where: { criadoEm: { gte: startDate, lte: endDate } }
      }),
      prisma.aviso.count({
        where: { criadoEm: { gte: startDate, lte: endDate } }
      }),
      prisma.reuniao.count({
        where: { criadoEm: { gte: startDate, lte: endDate } }
      }),
      prisma.mensagem.count({
        where: { criadoEm: { gte: startDate, lte: endDate } }
      })
    ]);

    return {
      periodo: { inicio, fim },
      usuariosNovos,
      avisosPeriodo,
      reunioesPeriodo,
      mensagensPeriodo
    };
  }

  static async listarUsuarios() {
    const usuarios = await prisma.usuario.findMany({
      include: {
        disciplinas: { select: { id: true, nome: true } },
        turmas: { select: { id: true, nome: true } },
        cursos: { select: { id: true, nome: true } },
        _count: {
          select: {
            mensagensEnviadas: true,
            mensagensRecebidas: true,
            reunioesCriadas: true
          }
        }
      },
      orderBy: { nome: "asc" }
    });
    
    return usuarios.map(({ senha, ...rest }) => rest);
  }

  static async listarCursos() {
    return prisma.curso.findMany({
      include: {
        _count: {
          select: {
            alunos: true,
            disciplinas: true,
            professores: true
          }
        }
      },
      orderBy: { nome: "asc" }
    });
  }

  static async listarAlunos() {
    return prisma.aluno.findMany({
      include: {
        turma: { select: { id: true, nome: true } },
        curso: { select: { id: true, nome: true } },
        encarregado: { select: { id: true, nome: true, email: true, telefone: true } },
        _count: { select: { notas: true } }
      },
      orderBy: { nome: "asc" }
    });
  }

  static async listarAvisos() {
    return prisma.aviso.findMany({
      orderBy: { criadoEm: "desc" }
    });
  }

  static async listarEventos() {
    return prisma.evento.findMany({
      orderBy: { criadoEm: "desc" }
    });
  }

  static async listarReunioes() {
    return prisma.reuniao.findMany({
      include: {
        criadoPor: { select: { id: true, nome: true, email: true } },
        participantes: {
          include: { usuario: { select: { id: true, nome: true, email: true } } }
        }
      },
      orderBy: { criadoEm: "desc" }
    });
  }

  static async listarTurmas() {
    return prisma.turma.findMany({
      include: {
        professor: { select: { id: true, nome: true, email: true } },
        _count: { select: { alunos: true } }
      },
      orderBy: { nome: "asc" }
    });
  }

  static async getDashboardData() {
    const [
      stats,
      ultimosAvisos,
      proximosEventos,
      proximasReunioes,
      alunosPorTurma
    ] = await Promise.all([
      ServiceStats.getStats(),
      prisma.aviso.findMany({ take: 5, orderBy: { criadoEm: "desc" } }),
      prisma.evento.findMany({ take: 5, orderBy: { dataHora: "asc" } }),
      prisma.reuniao.findMany({ 
        where: { dataHora: { gte: new Date() } },
        take: 5, 
        orderBy: { dataHora: "asc" },
        include: { criadoPor: { select: { nome: true } } }
      }),
      prisma.turma.findMany({
        select: { nome: true, _count: { select: { alunos: true } } },
        orderBy: { nome: "asc" }
      })
    ]);

    return {
      stats,
      ultimosAvisos,
      proximosEventos,
      proximasReunioes,
      alunosPorTurma
    };
  }
}