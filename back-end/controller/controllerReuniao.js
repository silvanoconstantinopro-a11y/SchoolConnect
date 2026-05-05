/**
 * controllerReuniao.js
 * Controlador para gestão de reuniões
 */
import { ServiceReuniao } from "../service/serviceReuniao.js";
import { logger } from "../utils/logger.js";

export class ControllerReuniao {
  
  static async criarReuniao(req, res) {
    try {
      const { titulo, linkMeeting, local, participantesIds, dataHora, descricao } = req.body;
      const criadoPorId = req.usuario?.id || null;
      
      const reuniao = await ServiceReuniao.criarReuniao(
        titulo, linkMeeting, local, participantesIds, criadoPorId, dataHora, descricao
      );
      
      logger.info(`Reunião criada: "${reuniao.titulo}" com ${participantesIds?.length || 0} participantes pelo usuário ${req.usuario?.id}`);
      
      return res.status(201).json({
        success: true,
        message: "Reunião criada com sucesso",
        data: reuniao
      });
    } catch (error) {
      logger.error(`Erro ao criar reunião: ${error.message}`);
      const status = error.message.includes("obrigatório") ? 400 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CREATE_REUNIAO_ERROR"
      });
    }
  }

  static async listarReunioes(req, res) {
    try {
      const usuarioId = req.query.usuarioId || req.usuario?.id;
      const { status, dataInicio, dataFim, search, limit, offset } = req.query;
      
      const filtros = { status, dataInicio, dataFim, search, limit, offset };
      const reunioes = await ServiceReuniao.listarReunioes(usuarioId, filtros);
      
      return res.json({
        success: true,
        data: reunioes,
        count: reunioes.length,
        filters: filtros
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

  static async listarReunioesFuturas(req, res) {
    try {
      const usuarioId = req.usuario?.id;
      const reunioes = await ServiceReuniao.listarReunioes(usuarioId, { status: "futuras" });
      
      return res.json({
        success: true,
        data: reunioes,
        count: reunioes.length
      });
    } catch (error) {
      logger.error(`Erro ao listar reuniões futuras: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "FUTURAS_REUNIOES_ERROR"
      });
    }
  }

  static async obterReuniaoPorId(req, res) {
    try {
      const reuniao = await ServiceReuniao.obterReuniaoPorId(req.params.id);
      
      return res.json({
        success: true,
        data: reuniao
      });
    } catch (error) {
      logger.error(`Erro ao obter reunião ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_REUNIAO_ERROR"
      });
    }
  }

  static async listarParticipantes(req, res) {
    try {
      const reuniao = await ServiceReuniao.obterReuniaoPorId(req.params.id);
      
      return res.json({
        success: true,
        data: reuniao.participantes,
        count: reuniao.participantes?.length || 0
      });
    } catch (error) {
      logger.error(`Erro ao listar participantes da reunião ${req.params.id}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_PARTICIPANTES_ERROR"
      });
    }
  }

  static async confirmarParticipacao(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const usuarioId = req.usuario.id;
      
      const participacao = await ServiceReuniao.confirmarParticipacao(id, usuarioId, status);
      
      logger.info(`Usuário ${usuarioId} ${status} participação na reunião ${id}`);
      
      return res.json({
        success: true,
        message: `Participação ${status === "confirmado" ? "confirmada" : status === "recusado" ? "recusada" : "atualizada"} com sucesso`,
        data: participacao
      });
    } catch (error) {
      logger.error(`Erro ao confirmar participação: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CONFIRMAR_PARTICIPACAO_ERROR"
      });
    }
  }

  static async atualizarReuniao(req, res) {
    try {
      const { id } = req.params;
      const { titulo, linkMeeting, local, participantesIds, dataHora, descricao } = req.body;
      
      const reuniao = await ServiceReuniao.atualizarReuniao(
        id, titulo, linkMeeting, local, participantesIds, dataHora, descricao
      );
      
      logger.info(`Reunião ${id} atualizada pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: "Reunião atualizada com sucesso",
        data: reuniao
      });
    } catch (error) {
      logger.error(`Erro ao atualizar reunião ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_REUNIAO_ERROR"
      });
    }
  }

  static async deletarReuniao(req, res) {
    try {
      const result = await ServiceReuniao.deletarReuniao(req.params.id);
      logger.info(`Reunião ${req.params.id} deletada pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.reuniao
      });
    } catch (error) {
      logger.error(`Erro ao deletar reunião ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_REUNIAO_ERROR"
      });
    }
  }
}

export default ControllerReuniao;