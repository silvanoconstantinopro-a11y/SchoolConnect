/**
 * controllerAluno.js
 * Controlador para gestão de alunos
 */
import { ServiceAluno } from "../service/serviceAluno.js";
import { logger } from "../utils/logger.js";

export class ControllerAluno {
  
  static async criarAluno(req, res) {
    try {
      const aluno = await ServiceAluno.criarAluno(req.body);
      logger.info(`Aluno criado: ${aluno.nome} (${aluno.matricula}) pelo usuário ${req.usuario?.id}`);
      return res.status(201).json({
        success: true,
        message: "Aluno criado com sucesso",
        data: aluno
      });
    } catch (error) {
      logger.error(`Erro ao criar aluno: ${error.message}`);
      const status = error.message.includes("obrigatório") || error.message.includes("inválido") ? 400 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CREATE_ALUNO_ERROR"
      });
    }
  }

  static async listarAlunos(req, res) {
    try {
      const { turmaId, cursoId, classe, search, limit, offset } = req.query;
      const filtros = { turmaId, cursoId, classe, search, limit, offset };
      
      const alunos = await ServiceAluno.listarAlunos(filtros);
      return res.json({
        success: true,
        data: alunos,
        count: alunos.length,
        filters: filtros
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

  static async obterAlunoPorId(req, res) {
    try {
      const aluno = await ServiceAluno.obterAlunoPorId(req.params.id);
      return res.json({
        success: true,
        data: aluno
      });
    } catch (error) {
      logger.error(`Erro ao obter aluno ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_ALUNO_ERROR"
      });
    }
  }

  static async obterNotasAluno(req, res) {
    try {
      const notas = await ServiceAluno.obterNotasAluno(req.params.id);
      return res.json({
        success: true,
        data: notas
      });
    } catch (error) {
      logger.error(`Erro ao obter notas do aluno ${req.params.id}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GET_NOTAS_ERROR"
      });
    }
  }

  static async obterHorarioAluno(req, res) {
    try {
      const horario = await ServiceAluno.obterHorarioAluno(req.params.id);
      return res.json({
        success: true,
        data: horario
      });
    } catch (error) {
      logger.error(`Erro ao obter horário do aluno ${req.params.id}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GET_HORARIO_ERROR"
      });
    }
  }

  static async atualizarAluno(req, res) {
    try {
      const aluno = await ServiceAluno.atualizarAluno(req.params.id, req.body);
      logger.info(`Aluno atualizado: ${aluno.nome} (${aluno.matricula}) pelo usuário ${req.usuario?.id}`);
      return res.json({
        success: true,
        message: "Aluno atualizado com sucesso",
        data: aluno
      });
    } catch (error) {
      logger.error(`Erro ao atualizar aluno ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_ALUNO_ERROR"
      });
    }
  }

  static async deletarAluno(req, res) {
    try {
      const result = await ServiceAluno.deletarAluno(req.params.id);
      logger.info(`Aluno deletado: ID ${req.params.id} pelo usuário ${req.usuario?.id}`);
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.aluno
      });
    } catch (error) {
      logger.error(`Erro ao deletar aluno ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_ALUNO_ERROR"
      });
    }
  }

  static async getEstatisticas(req, res) {
    try {
      const stats = await ServiceAluno.getEstatisticas();
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

export default ControllerAluno;