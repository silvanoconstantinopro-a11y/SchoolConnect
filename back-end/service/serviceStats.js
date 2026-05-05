/**
 * serviceStats.js
 * Estatísticas e métricas do sistema
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";

export class ServiceStats {

  static async getStats(filtros = {}) {
    try {
      const [
        usuarios,
        cursos,
        alunos,
        avisos,
        eventos,
        reunioes,
        turmas,
        disciplinas,
        feedbacks,
        mensagensHoje,
        notasMedia
      ] = await Promise.all([
        prisma.usuario.findMany(),
        prisma.curso.count(),
        prisma.aluno.count(),
        prisma.aviso.count(),
        prisma.evento.count(),
        prisma.reuniao.count(),
        prisma.turma.count(),
        prisma.disciplina.count(),
        prisma.feedback.count(),
        prisma.mensagem.count({
          where: {
            criadoEm: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
          }
        }),
        prisma.nota.aggregate({
          _avg: { valor: true }
        })
      ]);

      const now = new Date();
      const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const [novosUsuariosMes, eventosProximos] = await Promise.all([
        prisma.usuario.count({
          where: { criadoEm: { gte: inicioMes } }
        }),
        prisma.evento.count({
          where: { dataEvento: { gte: now, lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) } }
        })
      ]);

      return {
        timestamp: new Date().toISOString(),
        usuarios: {
          total: usuarios.length,
          professores: usuarios.filter(u => u.perfil === "PROFESSOR").length,
          encarregados: usuarios.filter(u => u.perfil === "ENCARREGADO").length,
          administradores: usuarios.filter(u => u.perfil === "ADMIN").length,
          novosMes: novosUsuariosMes
        },
        academicos: {
          cursos,
          alunos,
          turmas,
          disciplinas,
          mediaGeralNotas: notasMedia._avg.valor || 0
        },
        comunicacao: {
          avisos,
          eventos,
          reunioes,
          eventosProximos,
          mensagensHoje
        },
        feedbacks: {
          total: feedbacks,
          pendentes: await prisma.feedback.count({ where: { status: "pendente" } })
        }
      };
      
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }

  static async getStatsDetalhadas() {
    try {
      const [notasPorDisciplina, alunosPorTurma, usuariosPorPerfil, eventosPorMes] = await Promise.all([
        prisma.nota.groupBy({
          by: ['disciplinaId'],
          _avg: { valor: true },
          _count: { id: true }
        }),
        prisma.aluno.groupBy({
          by: ['turmaId'],
          _count: { id: true }
        }),
        prisma.usuario.groupBy({
          by: ['perfil'],
          _count: { id: true }
        }),
        prisma.evento.groupBy({
          by: ['categoria'],
          _count: { id: true }
        })
      ]);
      
      return {
        notasPorDisciplina,
        alunosPorTurma,
        usuariosPorPerfil,
        eventosPorMes
      };
      
    } catch (error) {
      logger.error(`Erro ao obter estatísticas detalhadas: ${error.message}`);
      throw error;
    }
  }

  static async listarUsuarios() {
    try {
      const lista = await prisma.usuario.findMany({ 
        include: { 
          disciplinas: { select: { id: true, nome: true } }, 
          turmas: { select: { id: true, nome: true } } 
        } 
      });
      return lista.map(({ senha, ...resto }) => resto);
    } catch (error) {
      logger.error(`Erro ao listar usuários: ${error.message}`);
      throw error;
    }
  }

  static async listarCursos() { 
    try {
      return await prisma.curso.findMany({
        include: { disciplinas: true, turmas: true }
      });
    } catch (error) {
      logger.error(`Erro ao listar cursos: ${error.message}`);
      throw error;
    }
  }

  static async listarAlunos() { 
    try {
      return await prisma.aluno.findMany({
        include: { turma: true, curso: true }
      });
    } catch (error) {
      logger.error(`Erro ao listar alunos: ${error.message}`);
      throw error;
    }
  }

  static async listarAvisos() { 
    try {
      return await prisma.aviso.findMany({ 
        orderBy: { criadoEm: "desc" } 
      });
    } catch (error) {
      logger.error(`Erro ao listar avisos: ${error.message}`);
      throw error;
    }
  }

  static async listarEventos() { 
    try {
      return await prisma.evento.findMany({ 
        orderBy: { dataEvento: "asc" } 
      });
    } catch (error) {
      logger.error(`Erro ao listar eventos: ${error.message}`);
      throw error;
    }
  }

  static async listarReunioes() { 
    try {
      return await prisma.reuniao.findMany({ 
        include: { participantes: true },
        orderBy: { dataHora: "desc" } 
      });
    } catch (error) {
      logger.error(`Erro ao listar reuniões: ${error.message}`);
      throw error;
    }
  }

  static async listarTurmas() { 
    try {
      return await prisma.turma.findMany({
        include: { curso: true, alunos: true }
      });
    } catch (error) {
      logger.error(`Erro ao listar turmas: ${error.message}`);
      throw error;
    }
  }

  static async getDashboardData() {
    try {
      const [
        stats,
        ultimosAvisos,
        proximosEventos,
        proximasReunioes,
        ultimosFeedbacks
      ] = await Promise.all([
        this.getStats(),
        prisma.aviso.findMany({ take: 5, orderBy: { criadoEm: "desc" } }),
        prisma.evento.findMany({ 
          where: { dataEvento: { gte: new Date() } },
          take: 5, 
          orderBy: { dataEvento: "asc" } 
        }),
        prisma.reuniao.findMany({ 
          where: { dataHora: { gte: new Date() } },
          take: 5, 
          orderBy: { dataHora: "asc" } 
        }),
        prisma.feedback.findMany({ 
          where: { status: "pendente" },
          take: 5, 
          orderBy: { criadoEm: "desc" } 
        })
      ]);
      
      return {
        stats,
        ultimosAvisos,
        proximosEventos,
        proximasReunioes,
        ultimosFeedbacks
      };
      
    } catch (error) {
      logger.error(`Erro ao obter dados do dashboard: ${error.message}`);
      throw error;
    }
  }
}