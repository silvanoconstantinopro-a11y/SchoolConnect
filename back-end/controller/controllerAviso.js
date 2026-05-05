/**
 * controllerAviso.js
 * Controlador para gestão de avisos
 */
import { ServiceAviso } from "../service/serviceAviso.js";
import { uploadSingle, deleteFile } from "../middlewares/upload.js";
import { logger } from "../utils/logger.js";

export class ControllerAviso {
  
  static criarAviso = [
    uploadSingle("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        
        if (req.file) {
          dados.imagem = `/uploads/arquivos/${req.file.filename}`;
        }
        
        if (req.usuario) {
          dados.autorId = req.usuario.id;
          dados.autorNome = req.usuario.nome;
        }
        
        const aviso = await ServiceAviso.criarAviso(dados);
        
        logger.info(`Aviso criado: "${aviso.titulo}" pelo usuário ${req.usuario?.id || "anônimo"}`);
        
        return res.status(201).json({
          success: true,
          message: "Aviso criado com sucesso",
          data: aviso
        });
      } catch (error) {
        // Se houve upload e deu erro, deletar arquivo
        if (req.file) {
          deleteFile(req.file.filename);
        }
        
        logger.error(`Erro ao criar aviso: ${error.message}`);
        return res.status(400).json({
          success: false,
          error: error.message,
          code: "CREATE_AVISO_ERROR"
        });
      }
    }
  ];

  static async listarAvisos(req, res) {
    try {
      const { categoria, search, limit, offset } = req.query;
      const filtros = { categoria, search, limit, offset };
      
      const avisos = await ServiceAviso.listarAvisos(filtros);
      
      return res.json({
        success: true,
        data: avisos,
        count: avisos.length,
        filters: filtros
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

  static async obterAvisosRecentes(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const avisos = await ServiceAviso.getAvisosRecentes(limite);
      
      return res.json({
        success: true,
        data: avisos,
        count: avisos.length
      });
    } catch (error) {
      logger.error(`Erro ao obter avisos recentes: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "RECENT_AVISOS_ERROR"
      });
    }
  }

  static async obterAvisoPorId(req, res) {
    try {
      const aviso = await ServiceAviso.obterAvisoPorId(req.params.id);
      
      return res.json({
        success: true,
        data: aviso
      });
    } catch (error) {
      logger.error(`Erro ao obter aviso ${req.params.id}: ${error.message}`);
      return res.status(404).json({
        success: false,
        error: error.message,
        code: "GET_AVISO_ERROR"
      });
    }
  }

  static atualizarAviso = [
    uploadSingle("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        
        // Obter aviso existente para verificar imagem antiga
        const avisoExistente = await ServiceAviso.obterAvisoPorId(req.params.id);
        
        if (req.file) {
          dados.imagem = `/uploads/arquivos/${req.file.filename}`;
          
          // Deletar imagem antiga se existir
          if (avisoExistente.imagem) {
            const oldFilename = avisoExistente.imagem.split("/").pop();
            deleteFile(oldFilename);
          }
        }
        
        const aviso = await ServiceAviso.atualizarAviso(req.params.id, dados);
        
        logger.info(`Aviso atualizado: "${aviso.titulo}" pelo usuário ${req.usuario?.id}`);
        
        return res.json({
          success: true,
          message: "Aviso atualizado com sucesso",
          data: aviso
        });
      } catch (error) {
        // Se houve upload e deu erro, deletar arquivo
        if (req.file) {
          deleteFile(req.file.filename);
        }
        
        logger.error(`Erro ao atualizar aviso ${req.params.id}: ${error.message}`);
        return res.status(400).json({
          success: false,
          error: error.message,
          code: "UPDATE_AVISO_ERROR"
        });
      }
    }
  ];

  static async deletarAviso(req, res) {
    try {
      // Obter aviso para deletar imagem associada
      const aviso = await ServiceAviso.obterAvisoPorId(req.params.id);
      
      const result = await ServiceAviso.deletarAviso(req.params.id);
      
      // Deletar imagem se existir
      if (aviso.imagem) {
        const filename = aviso.imagem.split("/").pop();
        deleteFile(filename);
      }
      
      logger.info(`Aviso deletado: "${aviso.titulo}" pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.aviso
      });
    } catch (error) {
      logger.error(`Erro ao deletar aviso ${req.params.id}: ${error.message}`);
      return res.status(400).json({
        success: false,
        error: error.message,
        code: "DELETE_AVISO_ERROR"
      });
    }
  }

  static async getEstatisticas(req, res) {
    try {
      const stats = await ServiceAviso.getEstatisticas();
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

export default ControllerAviso;