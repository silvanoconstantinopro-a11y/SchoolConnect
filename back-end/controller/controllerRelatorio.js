/**
 * controllerRelatorio.js
 * Controlador para gestão de relatórios
 */
import { ServiceRelatorio } from "../service/serviceRelatorio.js";
import { logger } from "../utils/logger.js";

export class ControllerRelatorio {
  
  static async criarRelatorio(req, res) {
    try {
      const dados = {
        ...req.body,
        autorId: req.usuario?.id
      };
      
      const relatorio = await ServiceRelatorio.criarRelatorio(dados);
      logger.info(`Relatório criado: "${relatorio.titulo}" pelo usuário ${req.usuario?.id}`);
      
      return res.status(201).json({
        success: true,
        message: "Relatório criado com sucesso",
        data: relatorio
      });
    } catch (error) {
      logger.error(`Erro ao criar relatório: ${error.message}`);
      const status = error.message.includes("obrigatório") ? 400 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "CREATE_RELATORIO_ERROR"
      });
    }
  }

  static async listarRelatorios(req, res) {
    try {
      const { tipo, autorId, dataInicio, dataFim, search, limit, offset } = req.query;
      const filtros = { tipo, autorId, dataInicio, dataFim, search, limit, offset };
      
      const relatorios = await ServiceRelatorio.listarRelatorios(filtros);
      
      return res.json({
        success: true,
        data: relatorios,
        count: relatorios.length,
        filters: filtros
      });
    } catch (error) {
      logger.error(`Erro ao listar relatórios: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_RELATORIOS_ERROR"
      });
    }
  }

  static async obterRelatorioPorId(req, res) {
    try {
      const relatorio = await ServiceRelatorio.obterRelatorioPorId(req.params.id);
      
      return res.json({
        success: true,
        data: relatorio
      });
    } catch (error) {
      logger.error(`Erro ao obter relatório ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_RELATORIO_ERROR"
      });
    }
  }

  static async atualizarRelatorio(req, res) {
    try {
      const relatorio = await ServiceRelatorio.atualizarRelatorio(req.params.id, req.body);
      logger.info(`Relatório ${req.params.id} atualizado pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: "Relatório atualizado com sucesso",
        data: relatorio
      });
    } catch (error) {
      logger.error(`Erro ao atualizar relatório ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_RELATORIO_ERROR"
      });
    }
  }

  static async deletarRelatorio(req, res) {
    try {
      const result = await ServiceRelatorio.deletarRelatorio(req.params.id);
      logger.info(`Relatório ${req.params.id} deletado pelo usuário ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.relatorio
      });
    } catch (error) {
      logger.error(`Erro ao deletar relatório ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_RELATORIO_ERROR"
      });
    }
  }

  static async gerarRelatorioAcademicoTurma(req, res) {
    try {
      const { turmaId } = req.params;
      const { semestre } = req.query;
      
      const relatorio = await ServiceRelatorio.gerarRelatorioAcademico(turmaId, semestre);
      
      return res.json({
        success: true,
        data: relatorio
      });
    } catch (error) {
      logger.error(`Erro ao gerar relatório acadêmico: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GERAR_RELATORIO_ACADEMICO_ERROR"
      });
    }
  }

  static async gerarRelatorioAcademicoAluno(req, res) {
    try {
      const { alunoId } = req.params;
      const result = await ServiceNota?.obterNotasPorAluno(alunoId);
      
      return res.json({
        success: true,
        data: {
          alunoId,
          ...result
        }
      });
    } catch (error) {
      logger.error(`Erro ao gerar relatório do aluno: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "RELATORIO_ALUNO_ERROR"
      });
    }
  }

  static async exportarRelatorio(req, res) {
    try {
      const { id } = req.params;
      const { formato } = req.body;
      
      const relatorio = await ServiceRelatorio.obterRelatorioPorId(id);
      
      // Implementar exportação conforme formato
      if (formato === "json") {
        return res.json({
          success: true,
          data: relatorio
        });
      }
      
      // Para outros formatos, retornar dados para processamento
      return res.json({
        success: true,
        message: `Exportação em ${formato} disponível em breve`,
        data: relatorio
      });
    } catch (error) {
      logger.error(`Erro ao exportar relatório: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "EXPORT_RELATORIO_ERROR"
      });
    }
  }
}

export default ControllerRelatorio;