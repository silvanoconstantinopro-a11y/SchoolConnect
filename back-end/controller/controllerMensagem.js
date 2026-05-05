/**
 * controllerMensagem.js
 * Controlador para gestão de mensagens
 */
import { ServiceMensagem } from "../service/serviceMensagem.js";
import { enviarMensagemWS } from "../websocket.js";
import { logger } from "../utils/logger.js";
import { deleteFile } from "../middlewares/upload.js";

export class ControllerMensagem {
  
  static async criarMensagem(req, res) {
    try {
      const file = req.file;
      
      const msg = await ServiceMensagem.criarMensagem({
        ...req.body,
        remetenteId: req.usuario.id,
        arquivoNome: file?.originalname,
        arquivoTipo: file?.mimetype,
        arquivoTamanho: file?.size,
        arquivoUrl: file ? `/uploads/arquivos/${file.filename}` : undefined,
      });
      
      // Notificar destinatário via WebSocket
      await enviarMensagemWS(msg.destinatarioId, { 
        type: "nova_mensagem", 
        mensagem: {
          id: msg.id,
          conteudo: msg.conteudo,
          remetente: msg.remetente,
          criadoEm: msg.criadoEm,
          temArquivo: !!msg.arquivoUrl
        }
      });
      
      logger.info(`Mensagem criada: ${msg.id} de ${req.usuario.id} para ${msg.destinatarioId}`);
      
      return res.status(201).json({
        success: true,
        message: "Mensagem enviada com sucesso",
        data: msg
      });
    } catch (error) {
      // Se houve upload e deu erro, deletar arquivo
      if (req.file) {
        deleteFile(req.file.filename);
      }
      
      logger.error(`Erro ao criar mensagem: ${error.message}`);
      return res.status(400).json({
        success: false,
        error: error.message,
        code: "CREATE_MENSAGEM_ERROR"
      });
    }
  }

  static async listarMensagens(req, res) {
    try {
      const usuarioId = req.query.usuarioId || req.usuario.id;
      const { contatoId, search, dataInicio, dataFim, limit, offset } = req.query;
      
      const filtros = { contatoId, search, dataInicio, dataFim, limit, offset };
      const mensagens = await ServiceMensagem.listarMensagens(usuarioId, filtros);
      
      return res.json({
        success: true,
        data: mensagens,
        count: mensagens.length,
        filters: filtros
      });
    } catch (error) {
      logger.error(`Erro ao listar mensagens: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_MENSAGENS_ERROR"
      });
    }
  }

  static async listarConversas(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const conversas = await ServiceMensagem.listarConversas(usuarioId);
      
      return res.json({
        success: true,
        data: conversas,
        count: conversas.length
      });
    } catch (error) {
      logger.error(`Erro ao listar conversas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_CONVERSAS_ERROR"
      });
    }
  }

  static async obterNaoLidas(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const result = await ServiceMensagem.getNaoLidas(usuarioId);
      
      return res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error(`Erro ao obter mensagens não lidas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "NAO_LIDAS_ERROR"
      });
    }
  }

  static async obterMensagemPorId(req, res) {
    try {
      const mensagem = await ServiceMensagem.obterMensagemPorId(req.params.id, req.usuario.id);
      
      return res.json({
        success: true,
        data: mensagem
      });
    } catch (error) {
      logger.error(`Erro ao obter mensagem ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_MENSAGEM_ERROR"
      });
    }
  }

  static async atualizarMensagem(req, res) {
    try {
      const mensagem = await ServiceMensagem.atualizarMensagem(
        req.params.id, 
        { 
          conteudo: req.body.conteudo, 
          usuarioId: req.usuario.id 
        }
      );
      
      // Notificar destinatário sobre edição
      await enviarMensagemWS(mensagem.destinatarioId, { 
        type: "mensagem_editada", 
        mensagem: {
          id: mensagem.id,
          conteudo: mensagem.conteudo,
          editadoEm: mensagem.editadoEm
        }
      });
      
      logger.info(`Mensagem ${req.params.id} editada pelo usuário ${req.usuario.id}`);
      
      return res.json({
        success: true,
        message: "Mensagem editada com sucesso",
        data: mensagem
      });
    } catch (error) {
      logger.error(`Erro ao atualizar mensagem ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_MENSAGEM_ERROR"
      });
    }
  }

  static async deletarMensagem(req, res) {
    try {
      const tipo = req.query.tipo || req.body.tipo || "para_todos";
      
      const mensagem = await ServiceMensagem.obterMensagemPorId(req.params.id);
      const result = await ServiceMensagem.deletarMensagem(
        req.params.id, 
        req.usuario?.id, 
        tipo
      );
      
      // Notificar se foi deletado para todos
      if (tipo === "para_todos") {
        await enviarMensagemWS(mensagem.destinatarioId, { 
          type: "mensagem_deletada", 
          mensagemId: req.params.id 
        });
      }
      
      logger.info(`Mensagem ${req.params.id} deletada (${tipo}) pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: { id: req.params.id, tipo }
      });
    } catch (error) {
      logger.error(`Erro ao deletar mensagem ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_MENSAGEM_ERROR"
      });
    }
  }
}

export default ControllerMensagem;