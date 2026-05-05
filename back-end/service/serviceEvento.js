/**
 * serviceEvento.js
 * Gestão completa de eventos
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";

export class ServiceEvento {

  static validarDados(dados, isUpdate = false) {
    const erros = [];
    
    if (!isUpdate) {
      if (!dados.titulo?.trim()) erros.push("Título é obrigatório");
      if (!dados.descricao?.trim()) erros.push("Descrição é obrigatória");
    }
    
    if (dados.titulo && dados.titulo.length < 3) 
      erros.push("Título deve ter pelo menos 3 caracteres");
    if (dados.titulo && dados.titulo.length > 200) 
      erros.push("Título deve ter no máximo 200 caracteres");
    
    if (dados.descricao && dados.descricao.length < 10) 
      erros.push("Descrição deve ter pelo menos 10 caracteres");
    
    if (dados.local && dados.local.length > 200) 
      erros.push("Local deve ter no máximo 200 caracteres");
    
    if (dados.dataEvento && isNaN(Date.parse(dados.dataEvento)))
      erros.push("Data do evento inválida");
    
    if (dados.dataFim && isNaN(Date.parse(dados.dataFim)))
      erros.push("Data de fim inválida");
    
    if (dados.dataEvento && dados.dataFim && new Date(dados.dataFim) < new Date(dados.dataEvento))
      erros.push("Data de fim não pode ser anterior à data do evento");
    
    if (dados.imagem && dados.imagem.length > 500) 
      erros.push("URL da imagem muito longa");
    
    return erros;
  }

  static async criarEvento({ 
    titulo, 
    descricao, 
    imagem, 
    dataEvento, 
    dataFim, 
    local, 
    organizador, 
    maxParticipantes,
    categoria 
  }) {
    try {
      const erros = this.validarDados({ titulo, descricao, dataEvento, dataFim });
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const evento = await prisma.evento.create({ 
        data: { 
          titulo: titulo.trim(), 
          descricao: descricao.trim(), 
          imagem: imagem || null,
          dataEvento: dataEvento ? new Date(dataEvento) : null,
          dataFim: dataFim ? new Date(dataFim) : null,
          local: local?.trim() || null,
          organizador: organizador?.trim() || null,
          maxParticipantes: maxParticipantes ? Number(maxParticipantes) : null,
          categoria: categoria || "geral"
        } 
      });
      
      logger.info(`Evento criado: "${evento.titulo}"`);
      return evento;
      
    } catch (error) {
      logger.error(`Erro ao criar evento: ${error.message}`);
      throw error;
    }
  }

  static async listarEventos(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.categoria) where.categoria = filtros.categoria;
      if (filtros.local) where.local = { contains: filtros.local, mode: 'insensitive' };
      if (filtros.organizador) where.organizador = filtros.organizador;
      
      // Filtros de data
      if (filtros.dataInicio) {
        where.dataEvento = { gte: new Date(filtros.dataInicio) };
      }
      if (filtros.dataFim) {
        where.dataEvento = { ...where.dataEvento, lte: new Date(filtros.dataFim) };
      }
      
      // Eventos futuros apenas
      if (filtros.apenasFuturos) {
        where.dataEvento = { gte: new Date() };
      }
      
      // Eventos passados apenas
      if (filtros.apenasPassados) {
        where.dataEvento = { lt: new Date() };
      }
      
      if (filtros.search) {
        where.OR = [
          { titulo: { contains: filtros.search, mode: 'insensitive' } },
          { descricao: { contains: filtros.search, mode: 'insensitive' } }
        ];
      }
      
      const eventos = await prisma.evento.findMany({ 
        where,
        orderBy: { dataEvento: filtros.orderBy === "asc" ? "asc" : "desc" },
        take: filtros.limit ? Number(filtros.limit) : undefined,
        skip: filtros.offset ? Number(filtros.offset) : undefined
      });
      
      return eventos;
      
    } catch (error) {
      logger.error(`Erro ao listar eventos: ${error.message}`);
      throw error;
    }
  }

  static async obterEventoPorId(id) {
    try {
      const evento = await prisma.evento.findUnique({ 
        where: { id: Number(id) },
        include: {
          participantes: {
            select: {
              id: true,
              nome: true,
              email: true
            },
            take: 50
          }
        }
      });
      
      if (!evento) throw new Error("Evento não encontrado");
      return evento;
      
    } catch (error) {
      logger.error(`Erro ao obter evento ${id}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarEvento(id, dados) {
    try {
      const eventoExistente = await prisma.evento.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!eventoExistente) throw new Error("Evento não encontrado");
      
      const { titulo, descricao, imagem, dataEvento, dataFim, local, organizador, maxParticipantes, categoria } = dados;
      
      const erros = this.validarDados({ 
        titulo, descricao, imagem, dataEvento, dataFim, local, organizador 
      }, true);
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const evento = await prisma.evento.update({
        where: { id: Number(id) },
        data: { 
          titulo: titulo?.trim() ?? eventoExistente.titulo, 
          descricao: descricao?.trim() ?? eventoExistente.descricao, 
          imagem: imagem ?? eventoExistente.imagem,
          dataEvento: dataEvento ? new Date(dataEvento) : eventoExistente.dataEvento,
          dataFim: dataFim ? new Date(dataFim) : eventoExistente.dataFim,
          local: local?.trim() ?? eventoExistente.local,
          organizador: organizador?.trim() ?? eventoExistente.organizador,
          maxParticipantes: maxParticipantes !== undefined ? Number(maxParticipantes) : eventoExistente.maxParticipantes,
          categoria: categoria ?? eventoExistente.categoria,
          atualizadoEm: new Date()
        },
      });
      
      logger.info(`Evento atualizado: "${evento.titulo}"`);
      return evento;
      
    } catch (error) {
      logger.error(`Erro ao atualizar evento ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarEvento(id) {
    try {
      const evento = await prisma.evento.findUnique({ 
        where: { id: Number(id) },
        include: { participantes: { take: 1 } }
      });
      if (!evento) throw new Error("Evento não encontrado");
      
      // Verificar se tem participantes
      if (evento.participantes.length > 0) {
        throw new Error("Não é possível deletar evento com participantes confirmados");
      }
      
      await prisma.evento.delete({ where: { id: Number(id) } });
      
      logger.info(`Evento deletado: "${evento.titulo}"`);
      return { 
        mensagem: "Evento deletado com sucesso",
        evento: { id: evento.id, titulo: evento.titulo }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar evento ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getEventosProximos(limite = 10) {
    try {
      return await prisma.evento.findMany({
        where: {
          dataEvento: { gte: new Date() }
        },
        orderBy: { dataEvento: "asc" },
        take: limite
      });
    } catch (error) {
      logger.error(`Erro ao obter eventos próximos: ${error.message}`);
      throw error;
    }
  }

  static async getEstatisticas() {
    try {
      const total = await prisma.evento.count();
      const futuros = await prisma.evento.count({
        where: { dataEvento: { gte: new Date() } }
      });
      const passados = await prisma.evento.count({
        where: { dataEvento: { lt: new Date() } }
      });
      const porCategoria = await prisma.evento.groupBy({
        by: ['categoria'],
        _count: { id: true }
      });
      
      return { total, futuros, passados, porCategoria };
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }
}