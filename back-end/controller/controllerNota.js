/**
 * controllerNota.js
 * Controlador para gestão de notas
 */
import { ServiceNota } from "../service/serviceNota.js";
import { logger } from "../utils/logger.js";

export class ControllerNota {
  
  static async criarNota(req, res) {
    try {
      const nota = await ServiceNota.criarNota(req.body);
      logger.info(`Nota criada: ${nota.valor} - Aluno: ${nota.alunoId} - Disciplina: ${nota.disciplinaId} pelo usuário ${req.usuario?.id}`);
      
      return res.status(201).json({
        success: true,
        message: "Nota criada com sucesso",
        data: nota
      });
    } catch (error) {
      logger.error(`Erro ao criar nota: ${error.message}`);
      const status = error.message.includes("obrigatório") || error.message.includes("inválido") ? 400 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CREATE_NOTA_ERROR"
      });
    }
  }

  static async listarNotas(req, res) {
    try {
      const { alunoId, disciplinaId, tipo, semestre, valorMin, valorMax, limit, offset } = req.query;
      const filtros = { alunoId, disciplinaId, tipo, semestre, valorMin, valorMax, limit, offset };
      
      const notas = await ServiceNota.listarNotas(filtros);
      
      return res.json({
        success: true,
        data: notas,
        count: notas.length,
        filters: filtros
      });
    } catch (error) {
      logger.error(`Erro ao listar notas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_NOTAS_ERROR"
      });
    }
  }

  static async obterNotasPorAluno(req, res) {
    try {
      const result = await ServiceNota.obterNotasPorAluno(req.params.alunoId);
      
      return res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error(`Erro ao obter notas do aluno ${req.params.alunoId}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GET_NOTAS_ALUNO_ERROR"
      });
    }
  }

  static async listarNotasPorDisciplina(req, res) {
    try {
      const notas = await ServiceNota.listarNotas({ disciplinaId: req.params.disciplinaId });
      
      return res.json({
        success: true,
        data: notas,
        count: notas.length
      });
    } catch (error) {
      logger.error(`Erro ao listar notas da disciplina ${req.params.disciplinaId}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_NOTAS_DISCIPLINA_ERROR"
      });
    }
  }

  static async obterNotaPorId(req, res) {
    try {
      const nota = await ServiceNota.obterNotaPorId(req.params.id);
      
      return res.json({
        success: true,
        data: nota
      });
    } catch (error) {
      logger.error(`Erro ao obter nota ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_NOTA_ERROR"
      });
    }
  }

  static async calcularMediaAluno(req, res) {
    try {
      const result = await ServiceNota.obterNotasPorAluno(req.params.alunoId);
      const mediaGeral = result.medias;
      
      return res.json({
        success: true,
        data: {
          alunoId: req.params.alunoId,
          mediaGeral,
          totalDisciplinas: Object.keys(mediaGeral).length
        }
      });
    } catch (error) {
      logger.error(`Erro ao calcular média do aluno ${req.params.alunoId}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "MEDIA_ALUNO_ERROR"
      });
    }
  }

  static async atualizarNota(req, res) {
    try {
      const nota = await ServiceNota.atualizarNota(req.params.id, req.body);
      logger.info(`Nota ${req.params.id} atualizada pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: "Nota atualizada com sucesso",
        data: nota
      });
    } catch (error) {
      logger.error(`Erro ao atualizar nota ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_NOTA_ERROR"
      });
    }
  }

  static async deletarNota(req, res) {
    try {
      const result = await ServiceNota.deletarNota(req.params.id);
      logger.info(`Nota ${req.params.id} deletada pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.nota
      });
    } catch (error) {
      logger.error(`Erro ao deletar nota ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_NOTA_ERROR"
      });
    }
  }

  static async obterEstatisticas(req, res) {
    try {
      const stats = await ServiceNota.getEstatisticas();
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

export default ControllerNota;