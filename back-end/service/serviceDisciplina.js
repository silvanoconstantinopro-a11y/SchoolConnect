/**
 * serviceDisciplina.js
 * Gestão completa de disciplinas
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";

export class ServiceDisciplina {

  static validarDados(dados, isUpdate = false) {
    const erros = [];
    
    if (!isUpdate) {
      if (!dados.nome?.trim()) erros.push("Nome é obrigatório");
      if (!dados.cursoId) erros.push("Curso é obrigatório");
    }
    
    if (dados.nome && dados.nome.length < 3) 
      erros.push("Nome deve ter pelo menos 3 caracteres");
    if (dados.nome && dados.nome.length > 100) 
      erros.push("Nome deve ter no máximo 100 caracteres");
    
    if (dados.codigo && dados.codigo.length > 20) 
      erros.push("Código deve ter no máximo 20 caracteres");
    
    if (dados.cargaHoraria && dados.cargaHoraria < 0) 
      erros.push("Carga horária inválida");
    
    if (dados.semestre && dados.semestre < 1) 
      erros.push("Semestre inválido");
    
    return erros;
  }

  static async verificarCursoExists(cursoId) {
    const curso = await prisma.curso.findUnique({
      where: { id: Number(cursoId) }
    });
    if (!curso) throw new Error("Curso não encontrado");
    return curso;
  }

  static async criarDisciplina({ nome, descricao, cursoId, codigo, cargaHoraria, semestre }) {
    try {
      const erros = this.validarDados({ nome, cursoId });
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      await this.verificarCursoExists(cursoId);
      
      // Verificar duplicata no mesmo curso
      const existing = await prisma.disciplina.findFirst({
        where: { 
          nome: nome.trim(),
          cursoId: Number(cursoId)
        }
      });
      if (existing) throw new Error("Já existe uma disciplina com este nome neste curso");
      
      const disciplina = await prisma.disciplina.create({
        data: { 
          nome: nome.trim(), 
          descricao: descricao?.trim() || "", 
          cursoId: Number(cursoId),
          codigo: codigo?.trim() || null,
          cargaHoraria: cargaHoraria || null,
          semestre: semestre || null
        },
        include: { curso: true },
      });
      
      logger.info(`Disciplina criada: "${disciplina.nome}" no curso ID ${cursoId}`);
      return disciplina;
      
    } catch (error) {
      logger.error(`Erro ao criar disciplina: ${error.message}`);
      throw error;
    }
  }

  static async listarDisciplinas(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.cursoId) where.cursoId = Number(filtros.cursoId);
      if (filtros.semestre) where.semestre = Number(filtros.semestre);
      if (filtros.search) {
        where.OR = [
          { nome: { contains: filtros.search, mode: 'insensitive' } },
          { codigo: { contains: filtros.search, mode: 'insensitive' } }
        ];
      }
      
      const disciplinas = await prisma.disciplina.findMany({ 
        where,
        include: { curso: true }, 
        orderBy: { nome: "asc" } 
      });
      
      return disciplinas;
      
    } catch (error) {
      logger.error(`Erro ao listar disciplinas: ${error.message}`);
      throw error;
    }
  }

  static async obterDisciplinaPorId(id) {
    try {
      const disciplina = await prisma.disciplina.findUnique({ 
        where: { id: Number(id) }, 
        include: { 
          curso: true,
          notas: {
            include: {
              aluno: {
                select: { nome: true, matricula: true }
              }
            },
            take: 20
          },
          professor: {
            select: { id: true, nome: true, email: true }
          }
        } 
      });
      
      if (!disciplina) throw new Error("Disciplina não encontrada");
      return disciplina;
      
    } catch (error) {
      logger.error(`Erro ao obter disciplina ${id}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarDisciplina(id, dados) {
    try {
      const disciplinaExistente = await prisma.disciplina.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!disciplinaExistente) throw new Error("Disciplina não encontrada");
      
      const { nome, descricao, cursoId, codigo, cargaHoraria, semestre } = dados;
      
      // Verificar curso se foi alterado
      if (cursoId && cursoId !== disciplinaExistente.cursoId) {
        await this.verificarCursoExists(cursoId);
      }
      
      // Verificar duplicata de nome no mesmo curso
      if (nome && nome !== disciplinaExistente.nome) {
        const cursoIdCheck = cursoId || disciplinaExistente.cursoId;
        const existing = await prisma.disciplina.findFirst({
          where: { 
            nome: nome.trim(),
            cursoId: Number(cursoIdCheck),
            id: { not: Number(id) }
          }
        });
        if (existing) throw new Error("Já existe uma disciplina com este nome neste curso");
      }
      
      const erros = this.validarDados({ nome, cursoId, codigo, cargaHoraria, semestre }, true);
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const disciplina = await prisma.disciplina.update({
        where: { id: Number(id) },
        data: {
          nome: nome?.trim() ?? disciplinaExistente.nome,
          descricao: descricao?.trim() ?? disciplinaExistente.descricao,
          cursoId: cursoId ? Number(cursoId) : disciplinaExistente.cursoId,
          codigo: codigo?.trim() ?? disciplinaExistente.codigo,
          cargaHoraria: cargaHoraria !== undefined ? cargaHoraria : disciplinaExistente.cargaHoraria,
          semestre: semestre !== undefined ? semestre : disciplinaExistente.semestre
        },
        include: { curso: true },
      });
      
      logger.info(`Disciplina atualizada: "${disciplina.nome}"`);
      return disciplina;
      
    } catch (error) {
      logger.error(`Erro ao atualizar disciplina ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarDisciplina(id) {
    try {
      const disciplina = await prisma.disciplina.findUnique({ 
        where: { id: Number(id) },
        include: { 
          notas: { take: 1 },
          professores: { take: 1 }
        }
      });
      
      if (!disciplina) throw new Error("Disciplina não encontrada");
      
      // Verificar dependências
      if (disciplina.notas.length > 0) {
        throw new Error("Não é possível deletar disciplina com notas registradas");
      }
      
      if (disciplina.professores.length > 0) {
        throw new Error("Não é possível deletar disciplina com professores associados");
      }
      
      await prisma.disciplina.delete({ where: { id: Number(id) } });
      
      logger.info(`Disciplina deletada: "${disciplina.nome}"`);
      return { 
        mensagem: "Disciplina deletada com sucesso",
        disciplina: { id: disciplina.id, nome: disciplina.nome }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar disciplina ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getEstatisticas() {
    try {
      const total = await prisma.disciplina.count();
      const porCurso = await prisma.disciplina.groupBy({
        by: ['cursoId'],
        _count: { id: true }
      });
      
      return { total, porCurso };
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }
}