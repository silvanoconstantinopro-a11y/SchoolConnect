/**
 * serviceCurso.js
 * Gestão completa de cursos
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";

export class ServiceCurso {

  static validarDados(dados, isUpdate = false) {
    const erros = [];
    
    if (!isUpdate) {
      if (!dados.nome?.trim()) erros.push("Nome é obrigatório");
      if (!dados.descricao?.trim()) erros.push("Descrição é obrigatória");
    }
    
    if (dados.nome && dados.nome.length < 3) 
      erros.push("Nome deve ter pelo menos 3 caracteres");
    if (dados.nome && dados.nome.length > 100) 
      erros.push("Nome deve ter no máximo 100 caracteres");
    
    if (dados.descricao && dados.descricao.length < 10) 
      erros.push("Descrição deve ter pelo menos 10 caracteres");
    if (dados.descricao && dados.descricao.length > 500) 
      erros.push("Descrição deve ter no máximo 500 caracteres");
    
    if (dados.cargaHoraria && dados.cargaHoraria < 0) 
      erros.push("Carga horária inválida");
    
    if (dados.duracaoMeses && dados.duracaoMeses < 0) 
      erros.push("Duração inválida");
    
    return erros;
  }

  static async criarCurso({ nome, descricao, cargaHoraria, duracaoMeses, nivel }) {
    try {
      const erros = this.validarDados({ nome, descricao });
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      // Verificar duplicata
      const existing = await prisma.curso.findUnique({
        where: { nome: nome.trim() }
      });
      if (existing) throw new Error("Já existe um curso com este nome");
      
      const curso = await prisma.curso.create({ 
        data: { 
          nome: nome.trim(), 
          descricao: descricao.trim(),
          cargaHoraria: cargaHoraria || null,
          duracaoMeses: duracaoMeses || null,
          nivel: nivel || "iniciante"
        } 
      });
      
      logger.info(`Curso criado: "${curso.nome}"`);
      return curso;
      
    } catch (error) {
      logger.error(`Erro ao criar curso: ${error.message}`);
      throw error;
    }
  }

  static async listarCursos() {
    try {
      return await prisma.curso.findMany({ 
        orderBy: { nome: "asc" } 
      });
    } catch (error) {
      logger.error(`Erro ao listar cursos: ${error.message}`);
      throw error;
    }
  }

  static async listarCursosComDisciplinas() {
    try {
      return await prisma.curso.findMany({
        include: { 
          disciplinas: {
            orderBy: { nome: "asc" }
          }, 
          professores: { 
            select: { id: true, nome: true, email: true } 
          },
          turmas: {
            select: { id: true, nome: true },
            take: 5
          }
        },
        orderBy: { nome: "asc" },
      });
    } catch (error) {
      logger.error(`Erro ao listar cursos com disciplinas: ${error.message}`);
      throw error;
    }
  }

  static async obterCursoPorId(id, incluirRelacionamentos = false) {
    try {
      const include = incluirRelacionamentos ? 
        { 
          disciplinas: true, 
          professores: true, 
          turmas: true,
          alunos: { take: 10 }
        } : 
        { disciplinas: true };
      
      const curso = await prisma.curso.findUnique({ 
        where: { id: Number(id) }, 
        include 
      });
      
      if (!curso) throw new Error("Curso não encontrado");
      return curso;
      
    } catch (error) {
      logger.error(`Erro ao obter curso ${id}: ${error.message}`);
      throw error;
    }
  }

  static async obterCursoPorNome(nome) {
    try {
      const curso = await prisma.curso.findUnique({ 
        where: { nome } 
      });
      if (!curso) throw new Error("Curso não encontrado");
      return curso;
    } catch (error) {
      logger.error(`Erro ao obter curso por nome ${nome}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarCurso(id, dados) {
    try {
      const cursoExistente = await prisma.curso.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!cursoExistente) throw new Error("Curso não encontrado");
      
      const { nome, descricao, cargaHoraria, duracaoMeses, nivel } = dados;
      
      // Verificar duplicata de nome
      if (nome && nome !== cursoExistente.nome) {
        const existing = await prisma.curso.findUnique({
          where: { nome: nome.trim() }
        });
        if (existing) throw new Error("Já existe um curso com este nome");
      }
      
      const erros = this.validarDados({ nome, descricao, cargaHoraria, duracaoMeses }, true);
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const curso = await prisma.curso.update({
        where: { id: Number(id) },
        data: { 
          nome: nome?.trim() ?? cursoExistente.nome, 
          descricao: descricao?.trim() ?? cursoExistente.descricao,
          cargaHoraria: cargaHoraria !== undefined ? cargaHoraria : cursoExistente.cargaHoraria,
          duracaoMeses: duracaoMeses !== undefined ? duracaoMeses : cursoExistente.duracaoMeses,
          nivel: nivel ?? cursoExistente.nivel
        },
      });
      
      logger.info(`Curso atualizado: "${curso.nome}"`);
      return curso;
      
    } catch (error) {
      logger.error(`Erro ao atualizar curso ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarCurso(id) {
    try {
      const curso = await prisma.curso.findUnique({ 
        where: { id: Number(id) },
        include: { 
          disciplinas: true, 
          turmas: true, 
          alunos: { take: 1 } 
        }
      });
      
      if (!curso) throw new Error("Curso não encontrado");
      
      // Verificar dependências
      if (curso.disciplinas.length > 0) {
        throw new Error(`Não é possível deletar curso com ${curso.disciplinas.length} disciplinas associadas`);
      }
      
      if (curso.turmas.length > 0) {
        throw new Error(`Não é possível deletar curso com ${curso.turmas.length} turmas associadas`);
      }
      
      if (curso.alunos.length > 0) {
        throw new Error("Não é possível deletar curso com alunos matriculados");
      }
      
      await prisma.curso.delete({ where: { id: Number(id) } });
      
      logger.info(`Curso deletado: "${curso.nome}"`);
      return { 
        mensagem: "Curso deletado com sucesso",
        curso: { id: curso.id, nome: curso.nome }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar curso ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getEstatisticas() {
    try {
      const total = await prisma.curso.count();
      const comDisciplinas = await prisma.curso.count({
        where: { disciplinas: { some: {} } }
      });
      const comTurmas = await prisma.curso.count({
        where: { turmas: { some: {} } }
      });
      
      return { total, comDisciplinas, comTurmas };
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }
}