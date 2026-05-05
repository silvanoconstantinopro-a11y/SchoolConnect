/**
 * controllerDisciplina.js
 * Controlador para gestão de disciplinas
 */
import { ServiceDisciplina } from "../service/serviceDisciplina.js";
import { logger } from "../utils/logger.js";

export class ControllerDisciplina {
  
  static async criarDisciplina(req, res) {
    try {
      const disciplina = await ServiceDisciplina.criarDisciplina(req.body);
      logger.info(`Disciplina criada: "${disciplina.nome}" pelo usuário ${req.usuario?.id}`);
      return res.status(201).json({
        success: true,
        message: "Disciplina criada com sucesso",
        data: disciplina
      });
    } catch (error) {
      logger.error(`Erro ao criar disciplina: ${error.message}`);
      const status = error.message.includes("obrigatório") || error.message.includes("inválido") ? 400 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CREATE_DISCIPLINA_ERROR"
      });
    }
  }

  static async listarDisciplinas(req, res) {
    try {
      const { cursoId, semestre, search, limit, offset } = req.query;
      const filtros = { cursoId, semestre, search, limit, offset };
      
      const disciplinas = await ServiceDisciplina.listarDisciplinas(filtros);
      return res.json({
        success: true,
        data: disciplinas,
        count: disciplinas.length,
        filters: filtros
      });
    } catch (error) {
      logger.error(`Erro ao listar disciplinas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_DISCIPLINAS_ERROR"
      });
    }
  }

  static async obterDisciplinaPorId(req, res) {
    try {
      const disciplina = await ServiceDisciplina.obterDisciplinaPorId(req.params.id);
      return res.json({
        success: true,
        data: disciplina
      });
    } catch (error) {
      logger.error(`Erro ao obter disciplina ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_DISCIPLINA_ERROR"
      });
    }
  }

  static async obterAlunosDaDisciplina(req, res) {
    try {
      const disciplina = await ServiceDisciplina.obterDisciplinaPorId(req.params.id);
      // Implementar busca de alunos
      return res.json({
        success: true,
        data: disciplina.alunos || [],
        count: disciplina.alunos?.length || 0
      });
    } catch (error) {
      logger.error(`Erro ao obter alunos da disciplina ${req.params.id}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GET_ALUNOS_ERROR"
      });
    }
  }

  static async atualizarDisciplina(req, res) {
    try {
      const disciplina = await ServiceDisciplina.atualizarDisciplina(req.params.id, req.body);
      logger.info(`Disciplina atualizada: "${disciplina.nome}" pelo usuário ${req.usuario?.id}`);
      return res.json({
        success: true,
        message: "Disciplina atualizada com sucesso",
        data: disciplina
      });
    } catch (error) {
      logger.error(`Erro ao atualizar disciplina ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_DISCIPLINA_ERROR"
      });
    }
  }

  static async deletarDisciplina(req, res) {
    try {
      const result = await ServiceDisciplina.deletarDisciplina(req.params.id);
      logger.info(`Disciplina deletada: ID ${req.params.id} pelo usuário ${req.usuario?.id}`);
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.disciplina
      });
    } catch (error) {
      logger.error(`Erro ao deletar disciplina ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_DISCIPLINA_ERROR"
      });
    }
  }

  static async getEstatisticas(req, res) {
    try {
      const stats = await ServiceDisciplina.getEstatisticas();
      return res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "STATS_ERROR"
      });
    }
  }
}

export default ControllerDisciplina;