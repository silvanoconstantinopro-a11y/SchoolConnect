/**
 * serviceRelatorio.js
 * Gestão completa de relatórios
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";

export class ServiceRelatorio {

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
    
    if (dados.tipo && !["academico", "financeiro", "administrativo", "geral"].includes(dados.tipo)) {
      erros.push("Tipo de relatório inválido");
    }
    
    return erros;
  }

  static async criarRelatorio({ titulo, conteudo, tipo, autorId, dataReferencia, metadados }) {
    try {
      const erros = this.validarDados({ titulo, conteudo, tipo });
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const relatorio = await prisma.relatorio.create({ 
        data: { 
          titulo: titulo.trim(), 
          conteudo: conteudo.trim(),
          tipo: tipo || "geral",
          autorId: autorId ? Number(autorId) : null,
          dataReferencia: dataReferencia ? new Date(dataReferencia) : null,
          metadados: metadados || {}
        } 
      });
      
      logger.info(`Relatório criado: "${relatorio.titulo}" (${relatorio.tipo})`);
      return relatorio;
      
    } catch (error) {
      logger.error(`Erro ao criar relatório: ${error.message}`);
      throw error;
    }
  }

  static async listarRelatorios(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.tipo) where.tipo = filtros.tipo;
      if (filtros.autorId) where.autorId = Number(filtros.autorId);
      
      if (filtros.dataInicio) {
        where.criadoEm = { gte: new Date(filtros.dataInicio) };
      }
      if (filtros.dataFim) {
        where.criadoEm = { ...where.criadoEm, lte: new Date(filtros.dataFim) };
      }
      
      if (filtros.search) {
        where.OR = [
          { titulo: { contains: filtros.search, mode: 'insensitive' } },
          { conteudo: { contains: filtros.search, mode: 'insensitive' } }
        ];
      }
      
      const relatorios = await prisma.relatorio.findMany({ 
        where,
        orderBy: { criadoEm: "desc" },
        take: filtros.limit ? Number(filtros.limit) : undefined,
        skip: filtros.offset ? Number(filtros.offset) : undefined
      });
      
      return relatorios;
      
    } catch (error) {
      logger.error(`Erro ao listar relatórios: ${error.message}`);
      throw error;
    }
  }

  static async obterRelatorioPorId(id) {
    try {
      const relatorio = await prisma.relatorio.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!relatorio) throw new Error("Relatório não encontrado");
      return relatorio;
    } catch (error) {
      logger.error(`Erro ao obter relatório ${id}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarRelatorio(id, { titulo, conteudo, tipo, metadados }) {
    try {
      const relatorioExistente = await prisma.relatorio.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!relatorioExistente) throw new Error("Relatório não encontrado");
      
      const erros = this.validarDados({ titulo, conteudo, tipo }, true);
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const relatorio = await prisma.relatorio.update({
        where: { id: Number(id) },
        data: { 
          titulo: titulo?.trim() ?? relatorioExistente.titulo, 
          conteudo: conteudo?.trim() ?? relatorioExistente.conteudo,
          tipo: tipo ?? relatorioExistente.tipo,
          metadados: metadados ?? relatorioExistente.metadados,
          atualizadoEm: new Date()
        },
      });
      
      logger.info(`Relatório atualizado: "${relatorio.titulo}"`);
      return relatorio;
      
    } catch (error) {
      logger.error(`Erro ao atualizar relatório ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarRelatorio(id) {
    try {
      const relatorio = await prisma.relatorio.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!relatorio) throw new Error("Relatório não encontrado");
      
      await prisma.relatorio.delete({ where: { id: Number(id) } });
      
      logger.info(`Relatório deletado: "${relatorio.titulo}"`);
      return { 
        mensagem: "Relatório deletado com sucesso",
        relatorio: { id: relatorio.id, titulo: relatorio.titulo }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar relatório ${id}: ${error.message}`);
      throw error;
    }
  }

  static async gerarRelatorioAcademico(turmaId, semestre) {
    try {
      const alunos = await prisma.aluno.findMany({
        where: { turmaId: Number(turmaId) },
        include: {
          notas: {
            where: { semestre: semestre || new Date().getFullYear() },
            include: { disciplina: true }
          }
        }
      });
      
      const relatorio = {
        tipo: "academico",
        geradoEm: new Date(),
        turmaId,
        semestre: semestre || new Date().getFullYear(),
        alunos: alunos.map(aluno => ({
          id: aluno.id,
          nome: aluno.nome,
          matricula: aluno.matricula,
          mediaGeral: aluno.notas.reduce((sum, n) => sum + n.valor, 0) / (aluno.notas.length || 1),
          notas: aluno.notas,
          status: aluno.notas.reduce((sum, n) => sum + n.valor, 0) / (aluno.notas.length || 1) >= 9.5 ? "APROVADO" : "REPROVADO"
        }))
      };
      
      return relatorio;
      
    } catch (error) {
      logger.error(`Erro ao gerar relatório acadêmico: ${error.message}`);
      throw error;
    }
  }
}