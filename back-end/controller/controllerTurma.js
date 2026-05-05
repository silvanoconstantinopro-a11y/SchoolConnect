/**
 * controllerTurma.js
 * Controlador para gestão de turmas
 */
import { ServiceTurma } from "../service/ServiceTurma.js";
import { logger } from "../utils/logger.js";

export class ControllerTurma {
  
  static async criarTurma(req, res) {
    try {
      const turma = await ServiceTurma.criarTurma(req.body);
      logger.info(`Turma criada: "${turma.nome}" pelo usuário ${req.usuario?.id}`);
      
      return res.status(201).json({
        success: true,
        message: "Turma criada com sucesso",
        data: turma
      });
    } catch (error) {
      logger.error(`Erro ao criar turma: ${error.message}`);
      const status = error.message.includes("obrigatório") ? 400 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CREATE_TURMA_ERROR"
      });
    }
  }

  static async listarTurmas(req, res) {
    try {
      const { ano, semestre, turno, professorId, cursoId, search, limit, offset } = req.query;
      const filtros = { ano, semestre, turno, professorId, cursoId, search, limit, offset };
      
      const turmas = await ServiceTurma.listarTurmas(filtros);
      
      return res.json({
        success: true,
        data: turmas,
        count: turmas.length,
        filters: filtros
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

  static async listarTurmasDisponiveis(req, res) {
    try {
      const { ano, semestre } = req.query;
      const turmas = await ServiceTurma.listarTurmas({ ano, semestre });
      
      // Filtrar apenas turmas com vagas disponíveis
      const disponiveis = turmas.filter(turma => 
        !turma.capacidade || turma.totalAlunos < turma.capacidade
      );
      
      return res.json({
        success: true,
        data: disponiveis,
        count: disponiveis.length
      });
    } catch (error) {
      logger.error(`Erro ao listar turmas disponíveis: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "TURMAS_DISPONIVEIS_ERROR"
      });
    }
  }

  static async obterTurmaPorId(req, res) {
    try {
      const turma = await ServiceTurma.obterTurmaPorId(req.params.id);
      
      return res.json({
        success: true,
        data: turma
      });
    } catch (error) {
      logger.error(`Erro ao obter turma ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_TURMA_ERROR"
      });
    }
  }

  static async listarAlunosDaTurma(req, res) {
    try {
      const turma = await ServiceTurma.obterTurmaPorId(req.params.id);
      
      return res.json({
        success: true,
        data: turma.alunos,
        count: turma.alunos?.length || 0
      });
    } catch (error) {
      logger.error(`Erro ao listar alunos da turma ${req.params.id}: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_ALUNOS_TURMA_ERROR"
      });
    }
  }

  static async adicionarAluno(req, res) {
    try {
      const { id, alunoId } = req.params;
      const aluno = await ServiceTurma.adicionarAluno(id, alunoId);
      
      logger.info(`Aluno ${alunoId} adicionado à turma ${id} pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: "Aluno adicionado à turma com sucesso",
        data: aluno
      });
    } catch (error) {
      logger.error(`Erro ao adicionar aluno à turma: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "ADD_ALUNO_TURMA_ERROR"
      });
    }
  }

  static async removerAluno(req, res) {
    try {
      const { id, alunoId } = req.params;
      const aluno = await ServiceTurma.removerAluno(id, alunoId);
      
      logger.info(`Aluno ${alunoId} removido da turma ${id} pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: "Aluno removido da turma com sucesso",
        data: aluno
      });
    } catch (error) {
      logger.error(`Erro ao remover aluno da turma: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "REMOVE_ALUNO_TURMA_ERROR"
      });
    }
  }

  static async atualizarTurma(req, res) {
    try {
      const turma = await ServiceTurma.atualizarTurma(req.params.id, req.body);
      logger.info(`Turma ${req.params.id} atualizada pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: "Turma atualizada com sucesso",
        data: turma
      });
    } catch (error) {
      logger.error(`Erro ao atualizar turma ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_TURMA_ERROR"
      });
    }
  }

  static async deletarTurma(req, res) {
    try {
      const result = await ServiceTurma.deletarTurma(req.params.id);
      logger.info(`Turma ${req.params.id} deletada pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.turma
      });
    } catch (error) {
      logger.error(`Erro ao deletar turma ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_TURMA_ERROR"
      });
    }
  }

  static async getEstatisticas(req, res) {
    try {
      const stats = await ServiceTurma.getEstatisticas();
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

export default ControllerTurma;