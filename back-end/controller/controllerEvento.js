/**
 * controllerEvento.js
 * Controlador para gestão de eventos
 */
import { ServiceEvento } from "../service/serviceEvento.js";
import { uploadSingle, deleteFile } from "../middlewares/upload.js";
import { logger } from "../utils/logger.js";

export class ControllerEvento {
  
  static criarEvento = [
    uploadSingle("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        
        if (req.file) {
          dados.imagem = `/uploads/arquivos/${req.file.filename}`;
        }
        
        const evento = await ServiceEvento.criarEvento(dados);
        
        logger.info(`Evento criado: "${evento.titulo}" pelo usuário ${req.usuario?.id || "anônimo"}`);
        
        return res.status(201).json({
          success: true,
          message: "Evento criado com sucesso",
          data: evento
        });
      } catch (error) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        
        logger.error(`Erro ao criar evento: ${error.message}`);
        return res.status(400).json({
          success: false,
          error: error.message,
          code: "CREATE_EVENTO_ERROR"
        });
      }
    }
  ];

  static async listarEventos(req, res) {
    try {
      const { 
        categoria, local, organizador, 
        dataInicio, dataFim, apenasFuturos, 
        apenasPassados, search, limit, offset 
      } = req.query;
      
      const filtros = { 
        categoria, local, organizador, 
        dataInicio, dataFim, apenasFuturos, 
        apenasPassados, search, limit, offset 
      };
      
      const eventos = await ServiceEvento.listarEventos(filtros);
      
      return res.json({
        success: true,
        data: eventos,
        count: eventos.length,
        filters: filtros
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

  static async listarEventosProximos(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const eventos = await ServiceEvento.getEventosProximos(limite);
      
      return res.json({
        success: true,
        data: eventos,
        count: eventos.length
      });
    } catch (error) {
      logger.error(`Erro ao listar eventos próximos: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "PROXIMOS_EVENTOS_ERROR"
      });
    }
  }

  static async obterEventoPorId(req, res) {
    try {
      const evento = await ServiceEvento.obterEventoPorId(req.params.id);
      return res.json({
        success: true,
        data: evento
      });
    } catch (error) {
      logger.error(`Erro ao obter evento ${req.params.id}: ${error.message}`);
      return res.status(404).json({
        success: false,
        error: error.message,
        code: "GET_EVENTO_ERROR"
      });
    }
  }

  static async registrarParticipacao(req, res) {
    try {
      const evento = await ServiceEvento.registrarParticipacao(
        req.params.id, 
        req.usuario.id
      );
      
      logger.info(`Usuário ${req.usuario.id} registrou participação no evento ${req.params.id}`);
      
      return res.json({
        success: true,
        message: "Participação registrada com sucesso",
        data: evento
      });
    } catch (error) {
      logger.error(`Erro ao registrar participação: ${error.message}`);
      return res.status(400).json({
        success: false,
        error: error.message,
        code: "PARTICIPACAO_ERROR"
      });
    }
  }

  static atualizarEvento = [
    uploadSingle("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        
        const eventoExistente = await ServiceEvento.obterEventoPorId(req.params.id);
        
        if (req.file) {
          dados.imagem = `/uploads/arquivos/${req.file.filename}`;
          
          if (eventoExistente.imagem) {
            const oldFilename = eventoExistente.imagem.split("/").pop();
            deleteFile(oldFilename);
          }
        }
        
        const evento = await ServiceEvento.atualizarEvento(req.params.id, dados);
        
        logger.info(`Evento atualizado: "${evento.titulo}" pelo usuário ${req.usuario?.id}`);
        
        return res.json({
          success: true,
          message: "Evento atualizado com sucesso",
          data: evento
        });
      } catch (error) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        
        logger.error(`Erro ao atualizar evento ${req.params.id}: ${error.message}`);
        return res.status(400).json({
          success: false,
          error: error.message,
          code: "UPDATE_EVENTO_ERROR"
        });
      }
    }
  ];

  static async deletarEvento(req, res) {
    try {
      const evento = await ServiceEvento.obterEventoPorId(req.params.id);
      const result = await ServiceEvento.deletarEvento(req.params.id);
      
      if (evento.imagem) {
        const filename = evento.imagem.split("/").pop();
        deleteFile(filename);
      }
      
      logger.info(`Evento deletado: "${evento.titulo}" pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.evento
      });
    } catch (error) {
      logger.error(`Erro ao deletar evento ${req.params.id}: ${error.message}`);
      return res.status(400).json({
        success: false,
        error: error.message,
        code: "DELETE_EVENTO_ERROR"
      });
    }
  }

  static async getEstatisticas(req, res) {
    try {
      const stats = await ServiceEvento.getEstatisticas();
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

export default ControllerEvento;