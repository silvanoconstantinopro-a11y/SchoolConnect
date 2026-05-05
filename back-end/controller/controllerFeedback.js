/**
 * controllerFeedback.js
 * Controlador para gestão de feedbacks
 */
import { ServiceFeedback } from "../service/serviceFeedback.js";
import { logger } from "../utils/logger.js";

export const controllerFeedback = {
  
  async criarFeedback(req, res) {
    try {
      const feedback = await ServiceFeedback.criarFeedback(req.body);
      
      logger.info(`Feedback criado - Assunto: "${feedback.assunto}" de ${feedback.nome}`);
      
      return res.status(201).json({
        success: true,
        message: "Feedback enviado com sucesso. Agradecemos sua contribuição!",
        data: {
          id: feedback.id,
          assunto: feedback.assunto,
          criadoEm: feedback.criadoEm
        }
      });
    } catch (error) {
      logger.error(`Erro ao criar feedback: ${error.message}`);
      const status = error.message.includes("obrigatório") || error.message.includes("inválido") ? 400 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CREATE_FEEDBACK_ERROR"
      });
    }
  },

  async listarFeedbacks(req, res) {
    try {
      const { status, categoria, email, avaliacao, dataInicio, dataFim, search, limit, offset } = req.query;
      
      const filtros = { 
        status, categoria, email, avaliacao, 
        dataInicio, dataFim, search, limit, offset 
      };
      
      const feedbacks = await ServiceFeedback.listarFeedbacks(filtros);
      
      return res.json({
        success: true,
        data: feedbacks,
        count: feedbacks.length,
        filters: filtros
      });
    } catch (error) {
      logger.error(`Erro ao listar feedbacks: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_FEEDBACKS_ERROR"
      });
    }
  },

  async obterFeedbackPorId(req, res) {
    try {
      const feedback = await ServiceFeedback.obterFeedbackPorId(req.params.id);
      return res.json({
        success: true,
        data: feedback
      });
    } catch (error) {
      logger.error(`Erro ao obter feedback ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_FEEDBACK_ERROR"
      });
    }
  },

  async atualizarStatus(req, res) {
    try {
      const { status, resposta } = req.body;
      const feedback = await ServiceFeedback.atualizarStatus(req.params.id, status, resposta);
      
      logger.info(`Feedback ${req.params.id} atualizado para status: ${status} pelo admin ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: `Feedback marcado como ${status}`,
        data: feedback
      });
    } catch (error) {
      logger.error(`Erro ao atualizar feedback ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_FEEDBACK_ERROR"
      });
    }
  },

  async removerFeedback(req, res) {
    try {
      const result = await ServiceFeedback.removerFeedback(req.params.id);
      
      logger.info(`Feedback removido: ID ${req.params.id} pelo admin ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.feedback
      });
    } catch (error) {
      logger.error(`Erro ao remover feedback ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_FEEDBACK_ERROR"
      });
    }
  },

  async obterEstatisticas(req, res) {
    try {
      const stats = await ServiceFeedback.getEstatisticas();
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
};

export default controllerFeedback;