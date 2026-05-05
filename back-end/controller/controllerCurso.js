/**
 * controllerCurso.js
 * Controlador para gestão de cursos
 */
import { ServiceCurso } from "../service/serviceCurso.js";
import { logger } from "../utils/logger.js";

export class ControllerCurso {
  
  static async criarCurso(req, res) {
    try {
      const curso = await ServiceCurso.criarCurso(req.body);
      logger.info(`Curso criado: "${curso.nome}" pelo usuário ${req.usuario?.id}`);
      return res.status(201).json({
        success: true,
        message: "Curso criado com sucesso",
        data: curso
      });
    } catch (error) {
      logger.error(`Erro ao criar curso: ${error.message}`);
      const status = error.message.includes("obrigatório") || error.message.includes("inválido") ? 400 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CREATE_CURSO_ERROR"
      });
    }
  }

  static async listarCursos(req, res) {
    try {
      const cursos = await ServiceCurso.listarCursos();
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

  static async listarCursosComDisciplinas(req, res) {
    try {
      const cursos = await ServiceCurso.listarCursosComDisciplinas();
      return res.json({
        success: true,
        data: cursos,
        count: cursos.length
      });
    } catch (error) {
      logger.error(`Erro ao listar cursos com disciplinas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_CURSOS_DETAIL_ERROR"
      });
    }
  }

  static async obterCursoPorId(req, res) {
    try {
      const incluirRelacionamentos = req.query.detalhado === "true";
      const curso = await ServiceCurso.obterCursoPorId(req.params.id, incluirRelacionamentos);
      return res.json({
        success: true,
        data: curso
      });
    } catch (error) {
      logger.error(`Erro ao obter curso ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_CURSO_ERROR"
      });
    }
  }

  static async obterDisciplinasDoCurso(req, res) {
    try {
      const curso = await ServiceCurso.obterCursoPorId(req.params.id, true);
      return res.json({
        success: true,
        data: curso.disciplinas,
        count: curso.disciplinas?.length || 0
      });
    } catch (error) {
      logger.error(`Erro ao obter disciplinas do curso ${req.params.id}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GET_DISCIPLINAS_ERROR"
      });
    }
  }

  static async atualizarCurso(req, res) {
    try {
      const curso = await ServiceCurso.atualizarCurso(req.params.id, req.body);
      logger.info(`Curso atualizado: "${curso.nome}" pelo usuário ${req.usuario?.id}`);
      return res.json({
        success: true,
        message: "Curso atualizado com sucesso",
        data: curso
      });
    } catch (error) {
      logger.error(`Erro ao atualizar curso ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_CURSO_ERROR"
      });
    }
  }

  static async deletarCurso(req, res) {
    try {
      const result = await ServiceCurso.deletarCurso(req.params.id);
      logger.info(`Curso deletado: ID ${req.params.id} pelo usuário ${req.usuario?.id}`);
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.curso
      });
    } catch (error) {
      logger.error(`Erro ao deletar curso ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_CURSO_ERROR"
      });
    }
  }

  static async getEstatisticas(req, res) {
    try {
      const stats = await ServiceCurso.getEstatisticas();
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

export default ControllerCurso;