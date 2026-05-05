/**
 * serviceAviso.js
 * Gestão completa de avisos
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";

export class ServiceAviso {

  static validarDados(dados, isUpdate = false) {
    const erros = [];
    
    if (!isUpdate) {
      if (!dados.titulo?.trim()) erros.push("Título é obrigatório");
      if (!dados.conteudo?.trim()) erros.push("Conteúdo é obrigatório");
    }
    
    if (dados.titulo && dados.titulo.length < 3) 
      erros.push("Título deve ter pelo menos 3 caracteres");
    if (dados.titulo && dados.titulo.length > 200) 
      erros.push("Título deve ter no máximo 200 caracteres");
    
    if (dados.conteudo && dados.conteudo.length < 10) 
      erros.push("Conteúdo deve ter pelo menos 10 caracteres");
    
    if (dados.imagem && dados.imagem.length > 500) 
      erros.push("URL da imagem muito longa");
    
    return erros;
  }

  static async criarAviso({ titulo, conteudo, imagem, autorId, autorNome, categoria }) {
    try {
      const erros = this.validarDados({ titulo, conteudo, imagem });
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const aviso = await prisma.aviso.create({ 
        data: { 
          titulo: titulo.trim(), 
          conteudo: conteudo.trim(), 
          imagem: imagem || null,
          autorId: autorId || null,
          autorNome: autorNome || "Sistema",
          categoria: categoria || "geral"
        } 
      });
      
      logger.info(`Aviso criado: "${aviso.titulo}"`);
      return aviso;
      
    } catch (error) {
      logger.error(`Erro ao criar aviso: ${error.message}`);
      throw error;
    }
  }

  static async listarAvisos(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.categoria) where.categoria = filtros.categoria;
      if (filtros.autorId) where.autorId = filtros.autorId;
      if (filtros.search) {
        where.OR = [
          { titulo: { contains: filtros.search, mode: 'insensitive' } },
          { conteudo: { contains: filtros.search, mode: 'insensitive' } }
        ];
      }
      
      const avisos = await prisma.aviso.findMany({ 
        where,
        orderBy: { criadoEm: "desc" },
        take: filtros.limit ? Number(filtros.limit) : undefined,
        skip: filtros.offset ? Number(filtros.offset) : undefined
      });
      
      return avisos;
      
    } catch (error) {
      logger.error(`Erro ao listar avisos: ${error.message}`);
      throw error;
    }
  }

  static async obterAvisoPorId(id) {
    try {
      const aviso = await prisma.aviso.findUnique({ 
        where: { id: Number(id) } 
      });
      
      if (!aviso) throw new Error("Aviso não encontrado");
      return aviso;
      
    } catch (error) {
      logger.error(`Erro ao obter aviso ${id}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarAviso(id, { titulo, conteudo, imagem, categoria }) {
    try {
      const avisoExistente = await prisma.aviso.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!avisoExistente) throw new Error("Aviso não encontrado");
      
      const erros = this.validarDados({ titulo, conteudo, imagem }, true);
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const aviso = await prisma.aviso.update({
        where: { id: Number(id) },
        data: { 
          titulo: titulo?.trim() ?? avisoExistente.titulo, 
          conteudo: conteudo?.trim() ?? avisoExistente.conteudo, 
          imagem: imagem ?? avisoExistente.imagem,
          categoria: categoria ?? avisoExistente.categoria,
          atualizadoEm: new Date()
        },
      });
      
      logger.info(`Aviso atualizado: "${aviso.titulo}"`);
      return aviso;
      
    } catch (error) {
      logger.error(`Erro ao atualizar aviso ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarAviso(id) {
    try {
      const aviso = await prisma.aviso.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!aviso) throw new Error("Aviso não encontrado");
      
      await prisma.aviso.delete({ where: { id: Number(id) } });
      
      logger.info(`Aviso deletado: "${aviso.titulo}"`);
      return { 
        mensagem: "Aviso deletado com sucesso",
        aviso: { id: aviso.id, titulo: aviso.titulo }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar aviso ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getAvisosRecentes(limite = 10) {
    try {
      return await prisma.aviso.findMany({
        orderBy: { criadoEm: "desc" },
        take: limite
      });
    } catch (error) {
      logger.error(`Erro ao obter avisos recentes: ${error.message}`);
      throw error;
    }
  }

  static async getEstatisticas() {
    try {
      const total = await prisma.aviso.count();
      const porCategoria = await prisma.aviso.groupBy({
        by: ['categoria'],
        _count: { id: true }
      });
      
      return { total, porCategoria };
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }
}