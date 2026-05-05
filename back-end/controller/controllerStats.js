/**
 * controllerStats.js
 * Controlador para estatísticas e métricas do sistema
 */
import { ServiceStats } from "../service/serviceStats.js";
import { logger } from "../utils/logger.js";

export class ControllerStats {
  
  static async getStats(req, res) {
    try {
      const stats = await ServiceStats.getStats();
      return res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GET_STATS_ERROR"
      });
    }
  }

  static async getStatsDetalhadas(req, res) {
    try {
      const stats = await ServiceStats.getStatsDetalhadas();
      return res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error(`Erro ao obter estatísticas detalhadas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GET_STATS_DETAIL_ERROR"
      });
    }
  }

  static async getDashboardData(req, res) {
    try {
      const data = await ServiceStats.getDashboardData();
      return res.json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(`Erro ao obter dados do dashboard: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "DASHBOARD_DATA_ERROR"
      });
    }
  }

  static async listarUsuarios(req, res) {
    try {
      const usuarios = await ServiceStats.listarUsuarios();
      return res.json({
        success: true,
        data: usuarios,
        count: usuarios.length
      });
    } catch (error) {
      logger.error(`Erro ao listar usuários: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_USUARIOS_ERROR"
      });
    }
  }

  static async getUsuariosPorPerfil(req, res) {
    try {
      const usuarios = await ServiceStats.listarUsuarios();
      const porPerfil = {
        ADMIN: 0,
        PROFESSOR: 0,
        ENCARREGADO: 0
      };
      
      usuarios.forEach(user => {
        if (porPerfil[user.perfil] !== undefined) {
          porPerfil[user.perfil]++;
        }
      });
      
      return res.json({
        success: true,
        data: porPerfil
      });
    } catch (error) {
      logger.error(`Erro ao obter usuários por perfil: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "USERS_BY_PROFILE_ERROR"
      });
    }
  }

  static async listarCursos(req, res) {
    try {
      const cursos = await ServiceStats.listarCursos();
      return res.json({
        success: true,
        data: cursos,
        count: cursos.length
      });
    } catch (error) {
      logger.error(`Erro ao listar cursos: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_CURSOS_ERROR"
      });
    }
  }

  static async listarAlunos(req, res) {
    try {
      const alunos = await ServiceStats.listarAlunos();
      return res.json({
        success: true,
        data: alunos,
        count: alunos.length
      });
    } catch (error) {
      logger.error(`Erro ao listar alunos: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_ALUNOS_ERROR"
      });
    }
  }

  static async getAlunosPorTurma(req, res) {
    try {
      const turmas = await ServiceStats.listarTurmas();
      const alunosPorTurma = {};
      
      for (const turma of turmas) {
        const alunos = await ServiceStats.listarAlunosPorTurma(turma.id);
        alunosPorTurma[turma.nome] = alunos.length;
      }
      
      return res.json({
        success: true,
        data: alunosPorTurma
      });
    } catch (error) {
      logger.error(`Erro ao obter alunos por turma: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "ALUNOS_BY_TURMA_ERROR"
      });
    }
  }

  static async listarAvisos(req, res) {
    try {
      const avisos = await ServiceStats.listarAvisos();
      return res.json({
        success: true,
        data: avisos,
        count: avisos.length
      });
    } catch (error) {
      logger.error(`Erro ao listar avisos: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_AVISOS_ERROR"
      });
    }
  }

  static async listarEventos(req, res) {
    try {
      const eventos = await ServiceStats.listarEventos();
      return res.json({
        success: true,
        data: eventos,
        count: eventos.length
      });
    } catch (error) {
      logger.error(`Erro ao listar eventos: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_EVENTOS_ERROR"
      });
    }
  }

  static async listarReunioes(req, res) {
    try {
      const reunioes = await ServiceStats.listarReunioes();
      return res.json({
        success: true,
        data: reunioes,
        count: reunioes.length
      });
    } catch (error) {
      logger.error(`Erro ao listar reuniões: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_REUNIOES_ERROR"
      });
    }
  }

  static async listarTurmas(req, res) {
    try {
      const turmas = await ServiceStats.listarTurmas();
      return res.json({
        success: true,
        data: turmas,
        count: turmas.length
      });
    } catch (error) {
      logger.error(`Erro ao listar turmas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_TURMAS_ERROR"
      });
    }
  }

  static async getOcupacaoTurma(req, res) {
    try {
      const turma = await ServiceStats.obterTurmaPorId(req.params.id);
      const alunos = await ServiceStats.listarAlunosPorTurma(req.params.id);
      
      const ocupacao = {
        turma: turma.nome,
        capacidade: turma.capacidade,
        matriculados: alunos.length,
        ocupacaoPercentual: turma.capacidade ? (alunos.length / turma.capacidade) * 100 : 0,
        vagasRestantes: turma.capacidade ? turma.capacidade - alunos.length : null
      };
      
      return res.json({
        success: true,
        data: ocupacao
      });
    } catch (error) {
      logger.error(`Erro ao obter ocupação da turma: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "OCUPACAO_TURMA_ERROR"
      });
    }
  }

  static async getMediasNotas(req, res) {
    try {
      const stats = await ServiceStats.getStats();
      return res.json({
        success: true,
        data: {
          mediaGeral: stats.academicos?.mediaGeralNotas || 0,
          totalAvaliacoes: stats.total || 0
        }
      });
    } catch (error) {
      logger.error(`Erro ao obter médias de notas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "MEDIAS_NOTAS_ERROR"
      });
    }
  }

  static async getEstatisticasFeedbacks(req, res) {
    try {
      const stats = await ServiceStats.getStats();
      return res.json({
        success: true,
        data: {
          total: stats.feedbacks?.total || 0,
          pendentes: stats.feedbacks?.pendentes || 0
        }
      });
    } catch (error) {
      logger.error(`Erro ao obter estatísticas de feedbacks: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "FEEDBACKS_STATS_ERROR"
      });
    }
  }

  static async getMensagensNaoLidas(req, res) {
    try {
      const { usuarioId } = req.params;
      const stats = await ServiceStats.getMensagensNaoLidas(usuarioId);
      
      return res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error(`Erro ao obter mensagens não lidas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "NAO_LIDAS_STATS_ERROR"
      });
    }
  }
}

export default ControllerStats;