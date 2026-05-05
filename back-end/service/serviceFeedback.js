/**
 * serviceFeedback.js
 * Gestão completa de feedbacks
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";
import { validador } from "../utils/validador.js";

export class ServiceFeedback {

  static validarDados(dados, isUpdate = false) {
    const erros = [];
    
    if (!isUpdate) {
      if (!dados.nome?.trim()) erros.push("Nome é obrigatório");
      if (!dados.email?.trim()) erros.push("Email é obrigatório");
      if (!dados.assunto?.trim()) erros.push("Assunto é obrigatório");
      if (!dados.mensagem?.trim()) erros.push("Mensagem é obrigatória");
    }
    
    if (dados.nome && dados.nome.length < 3) 
      erros.push("Nome deve ter pelo menos 3 caracteres");
    if (dados.nome && dados.nome.length > 100) 
      erros.push("Nome deve ter no máximo 100 caracteres");
    
    if (dados.email && !validador.validarEmail(dados.email))
      erros.push("Email inválido");
    
    if (dados.assunto && dados.assunto.length < 3) 
      erros.push("Assunto deve ter pelo menos 3 caracteres");
    if (dados.assunto && dados.assunto.length > 200) 
      erros.push("Assunto deve ter no máximo 200 caracteres");
    
    if (dados.mensagem && dados.mensagem.length < 10) 
      erros.push("Mensagem deve ter pelo menos 10 caracteres");
    if (dados.mensagem && dados.mensagem.length > 2000) 
      erros.push("Mensagem deve ter no máximo 2000 caracteres");
    
    if (dados.avaliacao && (dados.avaliacao < 1 || dados.avaliacao > 5))
      erros.push("Avaliação deve ser entre 1 e 5");
    
    return erros;
  }

  static async criarFeedback({ nome, email, assunto, mensagem, avaliacao, categoria }) {
    try {
      const erros = this.validarDados({ nome, email, assunto, mensagem, avaliacao });
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const feedback = await prisma.feedback.create({ 
        data: { 
          nome: nome.trim(), 
          email: email.trim().toLowerCase(), 
          assunto: assunto.trim(), 
          mensagem: mensagem.trim(),
          avaliacao: avaliacao ? Number(avaliacao) : null,
          categoria: categoria || "geral",
          status: "pendente"
        } 
      });
      
      logger.info(`Feedback criado - Assunto: "${feedback.assunto}" de ${feedback.nome}`);
      return feedback;
      
    } catch (error) {
      logger.error(`Erro ao criar feedback: ${error.message}`);
      throw error;
    }
  }

  static async listarFeedbacks(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.status) where.status = filtros.status;
      if (filtros.categoria) where.categoria = filtros.categoria;
      if (filtros.email) where.email = { contains: filtros.email, mode: 'insensitive' };
      if (filtros.avaliacao) where.avaliacao = Number(filtros.avaliacao);
      
      if (filtros.dataInicio) {
        where.criadoEm = { gte: new Date(filtros.dataInicio) };
      }
      if (filtros.dataFim) {
        where.criadoEm = { ...where.criadoEm, lte: new Date(filtros.dataFim) };
      }
      
      if (filtros.search) {
        where.OR = [
          { nome: { contains: filtros.search, mode: 'insensitive' } },
          { assunto: { contains: filtros.search, mode: 'insensitive' } },
          { mensagem: { contains: filtros.search, mode: 'insensitive' } }
        ];
      }
      
      const feedbacks = await prisma.feedback.findMany({ 
        where,
        orderBy: { criadoEm: "desc" },
        take: filtros.limit ? Number(filtros.limit) : undefined,
        skip: filtros.offset ? Number(filtros.offset) : undefined
      });
      
      return feedbacks;
      
    } catch (error) {
      logger.error(`Erro ao listar feedbacks: ${error.message}`);
      throw error;
    }
  }

  static async obterFeedbackPorId(id) {
    try {
      const feedback = await prisma.feedback.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!feedback) throw new Error("Feedback não encontrado");
      return feedback;
    } catch (error) {
      logger.error(`Erro ao obter feedback ${id}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarStatus(id, status, resposta) {
    try {
      const feedback = await prisma.feedback.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!feedback) throw new Error("Feedback não encontrado");
      
      const statusValidos = ["pendente", "lido", "respondido", "arquivado"];
      if (!statusValidos.includes(status)) {
        throw new Error("Status inválido");
      }
      
      const atualizado = await prisma.feedback.update({
        where: { id: Number(id) },
        data: { 
          status,
          resposta: resposta?.trim() || null,
          respondidoEm: status === "respondido" ? new Date() : null
        }
      });
      
      logger.info(`Feedback ${id} atualizado para status: ${status}`);
      return atualizado;
      
    } catch (error) {
      logger.error(`Erro ao atualizar status do feedback ${id}: ${error.message}`);
      throw error;
    }
  }

  static async removerFeedback(id) {
    try {
      const feedback = await prisma.feedback.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!feedback) throw new Error("Feedback não encontrado");
      
      await prisma.feedback.delete({ where: { id: Number(id) } });
      
      logger.info(`Feedback removido: "${feedback.assunto}" de ${feedback.nome}`);
      return { 
        mensagem: "Feedback removido com sucesso",
        feedback: { id: feedback.id, assunto: feedback.assunto }
      };
      
    } catch (error) {
      logger.error(`Erro ao remover feedback ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getEstatisticas() {
    try {
      const total = await prisma.feedback.count();
      const pendentes = await prisma.feedback.count({ where: { status: "pendente" } });
      const respondidos = await prisma.feedback.count({ where: { status: "respondido" } });
      const arquivados = await prisma.feedback.count({ where: { status: "arquivado" } });
      
      const mediaAvaliacao = await prisma.feedback.aggregate({
        where: { avaliacao: { not: null } },
        _avg: { avaliacao: true }
      });
      
      const porCategoria = await prisma.feedback.groupBy({
        by: ['categoria'],
        _count: { id: true }
      });
      
      return { 
        total, 
        pendentes, 
        respondidos, 
        arquivados,
        mediaAvaliacao: mediaAvaliacao._avg.avaliacao || 0,
        porCategoria
      };
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }
}