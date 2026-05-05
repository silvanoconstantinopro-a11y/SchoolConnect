/**
 * serviceAluno.js
 * Gestão completa de alunos (campo correto: matricula).
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { validador } from "../utils/validador.js";
import { logger } from "../utils/logger.js";

const INCLUDE = { 
  turma: true, 
  curso: true, 
  encarregado: { 
    select: { 
      id: true, 
      nome: true, 
      email: true,
      telefone: true 
    } 
  },
  notas: {
    select: {
      id: true,
      valor: true,
      disciplina: {
        select: { nome: true }
      }
    }
  }
};

export class ServiceAluno {

  /**
   * Valida dados do aluno
   */
  static validarDadosAluno(dados, isUpdate = false) {
    const erros = [];
    
    if (!isUpdate) {
      if (!dados.nome?.trim()) erros.push("Nome é obrigatório");
      if (!dados.matricula?.trim()) erros.push("Matrícula é obrigatória");
      if (!dados.turmaId) erros.push("Turma é obrigatória");
      if (!dados.cursoId) erros.push("Curso é obrigatório");
    }
    
    if (dados.nome && dados.nome.length < 3) erros.push("Nome deve ter pelo menos 3 caracteres");
    if (dados.nome && dados.nome.length > 100) erros.push("Nome deve ter no máximo 100 caracteres");
    
    if (dados.matricula && !/^[A-Za-z0-9\-_]+$/.test(dados.matricula)) 
      erros.push("Matrícula contém caracteres inválidos");
    
    if (dados.telefone && !validador.validarTelefone(dados.telefone))
      erros.push("Telefone inválido");
    
    if (dados.email && !validador.validarEmail(dados.email))
      erros.push("Email inválido");
    
    if (dados.classe && dados.classe.length > 50)
      erros.push("Classe deve ter no máximo 50 caracteres");
    
    if (dados.imagem && dados.imagem.length > 500)
      erros.push("URL da imagem muito longa");
    
    return erros;
  }

  /**
   * Verifica se turma existe
   */
  static async verificarTurmaExists(turmaId) {
    const turma = await prisma.turma.findUnique({
      where: { id: Number(turmaId) }
    });
    if (!turma) throw new Error("Turma não encontrada");
    return turma;
  }

  /**
   * Verifica se curso existe
   */
  static async verificarCursoExists(cursoId) {
    const curso = await prisma.curso.findUnique({
      where: { id: Number(cursoId) }
    });
    if (!curso) throw new Error("Curso não encontrado");
    return curso;
  }

  /**
   * Verifica se encarregado existe
   */
  static async verificarEncarregadoExists(encarregadoId) {
    if (!encarregadoId) return null;
    
    const encarregado = await prisma.encarregado.findUnique({
      where: { id: Number(encarregadoId) }
    });
    if (!encarregado) throw new Error("Encarregado não encontrado");
    return encarregado;
  }

  static async criarAluno(dados) {
    try {
      // Validação
      const erros = this.validarDadosAluno(dados);
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const { nome, matricula, turmaId, telefone, classe, encarregadoId, cursoId, imagem, email } = dados;
      
      // Verificar duplicatas
      const existingMatricula = await prisma.aluno.findUnique({ 
        where: { matricula: matricula.trim() } 
      });
      if (existingMatricula) throw new Error("Matrícula já cadastrada");
      
      if (telefone) {
        const existingTelefone = await prisma.aluno.findUnique({ 
          where: { telefone } 
        });
        if (existingTelefone) throw new Error("Telefone já cadastrado");
      }
      
      if (email) {
        const existingEmail = await prisma.aluno.findUnique({ 
          where: { email } 
        });
        if (existingEmail) throw new Error("Email já cadastrado");
      }
      
      // Verificar relacionamentos
      await this.verificarTurmaExists(turmaId);
      await this.verificarCursoExists(cursoId);
      await this.verificarEncarregadoExists(encarregadoId);
      
      const aluno = await prisma.aluno.create({
        data: {
          nome: nome.trim(),
          matricula: matricula.trim(),
          telefone: telefone?.trim() || null,
          email: email?.trim() || null,
          classe: classe?.trim() || null,
          turmaId: Number(turmaId),
          cursoId: Number(cursoId),
          imagem: imagem || null,
          encarregadoId: encarregadoId ? Number(encarregadoId) : null,
        },
        include: INCLUDE,
      });
      
      logger.info(`Aluno criado: ${aluno.nome} (${aluno.matricula})`);
      return aluno;
      
    } catch (error) {
      logger.error(`Erro ao criar aluno: ${error.message}`);
      throw error;
    }
  }

  static async listarAlunos(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.turmaId) where.turmaId = Number(filtros.turmaId);
      if (filtros.cursoId) where.cursoId = Number(filtros.cursoId);
      if (filtros.classe) where.classe = filtros.classe;
      if (filtros.search) {
        where.OR = [
          { nome: { contains: filtros.search, mode: 'insensitive' } },
          { matricula: { contains: filtros.search, mode: 'insensitive' } }
        ];
      }
      
      const alunos = await prisma.aluno.findMany({ 
        where,
        include: INCLUDE, 
        orderBy: { nome: "asc" } 
      });
      
      return alunos;
      
    } catch (error) {
      logger.error(`Erro ao listar alunos: ${error.message}`);
      throw error;
    }
  }

  static async obterAlunoPorId(id) {
    try {
      const aluno = await prisma.aluno.findUnique({ 
        where: { id: Number(id) }, 
        include: INCLUDE 
      });
      
      if (!aluno) throw new Error("Aluno não encontrado");
      return aluno;
      
    } catch (error) {
      logger.error(`Erro ao obter aluno ${id}: ${error.message}`);
      throw error;
    }
  }

  static async obterAlunoPorMatricula(matricula) {
    try {
      const aluno = await prisma.aluno.findUnique({ 
        where: { matricula }, 
        include: INCLUDE 
      });
      
      if (!aluno) throw new Error("Aluno não encontrado");
      return aluno;
      
    } catch (error) {
      logger.error(`Erro ao obter aluno por matrícula ${matricula}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarAluno(id, dados) {
    try {
      const alunoExistente = await prisma.aluno.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!alunoExistente) throw new Error("Aluno não encontrado");
      
      // Validação para update
      const erros = this.validarDadosAluno(dados, true);
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const { nome, matricula, turmaId, telefone, classe, encarregadoId, cursoId, imagem, email } = dados;
      
      // Verificar duplicatas (exceto o próprio registro)
      if (matricula && matricula !== alunoExistente.matricula) {
        const existingMatricula = await prisma.aluno.findUnique({ 
          where: { matricula: matricula.trim() } 
        });
        if (existingMatricula) throw new Error("Matrícula já cadastrada");
      }
      
      if (telefone && telefone !== alunoExistente.telefone) {
        const existingTelefone = await prisma.aluno.findUnique({ 
          where: { telefone } 
        });
        if (existingTelefone) throw new Error("Telefone já cadastrado");
      }
      
      if (email && email !== alunoExistente.email) {
        const existingEmail = await prisma.aluno.findUnique({ 
          where: { email } 
        });
        if (existingEmail) throw new Error("Email já cadastrado");
      }
      
      // Verificar relacionamentos se foram alterados
      if (turmaId && turmaId !== alunoExistente.turmaId) {
        await this.verificarTurmaExists(turmaId);
      }
      
      if (cursoId && cursoId !== alunoExistente.cursoId) {
        await this.verificarCursoExists(cursoId);
      }
      
      if (encarregadoId !== undefined && encarregadoId !== alunoExistente.encarregadoId) {
        await this.verificarEncarregadoExists(encarregadoId);
      }
      
      const aluno = await prisma.aluno.update({
        where: { id: Number(id) },
        data: {
          nome: nome?.trim() ?? alunoExistente.nome,
          matricula: matricula?.trim() ?? alunoExistente.matricula,
          telefone: telefone?.trim() ?? alunoExistente.telefone,
          email: email?.trim() ?? alunoExistente.email,
          classe: classe?.trim() ?? alunoExistente.classe,
          imagem: imagem ?? alunoExistente.imagem,
          turmaId: turmaId ? Number(turmaId) : alunoExistente.turmaId,
          cursoId: cursoId ? Number(cursoId) : alunoExistente.cursoId,
          encarregadoId: encarregadoId !== undefined
            ? (encarregadoId ? Number(encarregadoId) : null)
            : alunoExistente.encarregadoId,
        },
        include: INCLUDE,
      });
      
      logger.info(`Aluno atualizado: ${aluno.nome} (${aluno.matricula})`);
      return aluno;
      
    } catch (error) {
      logger.error(`Erro ao atualizar aluno ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarAluno(id) {
    try {
      const aluno = await prisma.aluno.findUnique({ 
        where: { id: Number(id) },
        include: { notas: true }
      });
      
      if (!aluno) throw new Error("Aluno não encontrado");
      
      // Verificar se tem notas associadas
      if (aluno.notas && aluno.notas.length > 0) {
        throw new Error("Não é possível deletar aluno com notas registradas");
      }
      
      await prisma.aluno.delete({ where: { id: Number(id) } });
      
      logger.info(`Aluno deletado: ${aluno.nome} (${aluno.matricula})`);
      return { 
        mensagem: "Aluno deletado com sucesso",
        aluno: { id: aluno.id, nome: aluno.nome, matricula: aluno.matricula }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar aluno ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getEstatisticas() {
    try {
      const total = await prisma.aluno.count();
      const porTurma = await prisma.aluno.groupBy({
        by: ['turmaId'],
        _count: { id: true }
      });
      const porCurso = await prisma.aluno.groupBy({
        by: ['cursoId'],
        _count: { id: true }
      });
      
      return { total, porTurma, porCurso };
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }
}