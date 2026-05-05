/**
 * ServiceTurma.js
 * Gestão completa de turmas
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";

const INCLUDE = { 
  professor: { 
    select: { 
      id: true, 
      nome: true, 
      email: true,
      telefone: true,
      imagem: true 
    } 
  }, 
  alunos: {
    select: {
      id: true,
      nome: true,
      matricula: true,
      email: true,
      telefone: true
    }
  },
  curso: {
    select: {
      id: true,
      nome: true,
      descricao: true
    }
  }
};

export class ServiceTurma {

  static validarDados(dados, isUpdate = false) {
    const erros = [];
    
    if (!isUpdate) {
      if (!dados.nome?.trim()) erros.push("Nome da turma é obrigatório");
    }
    
    if (dados.nome && dados.nome.length < 3) 
      erros.push("Nome deve ter pelo menos 3 caracteres");
    if (dados.nome && dados.nome.length > 100) 
      erros.push("Nome deve ter no máximo 100 caracteres");
    
    if (dados.ano && (dados.ano < 2000 || dados.ano > new Date().getFullYear() + 5))
      erros.push("Ano inválido");
    
    if (dados.semestre && (dados.semestre < 1 || dados.semestre > 2))
      erros.push("Semestre inválido (deve ser 1 ou 2)");
    
    if (dados.capacidade && (dados.capacidade < 1 || dados.capacidade > 100))
      erros.push("Capacidade deve ser entre 1 e 100");
    
    return erros;
  }

  static async verificarProfessor(professorId) {
    if (!professorId) return null;
    
    const professor = await prisma.usuario.findUnique({
      where: { 
        id: Number(professorId),
        perfil: "PROFESSOR"
      }
    });
    
    if (!professor) throw new Error("Professor não encontrado");
    return professor;
  }

  static async verificarCurso(cursoId) {
    if (!cursoId) return null;
    
    const curso = await prisma.curso.findUnique({
      where: { id: Number(cursoId) }
    });
    
    if (!curso) throw new Error("Curso não encontrado");
    return curso;
  }

  static async criarTurma({ nome, professorId, usuarioId, ano, semestre, capacidade, turno, cursoId }) {
    try {
      const erros = this.validarDados({ nome, ano, semestre, capacidade });
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const professorFinalId = professorId ?? usuarioId ?? null;
      await this.verificarProfessor(professorFinalId);
      await this.verificarCurso(cursoId);
      
      // Verificar se já existe turma com mesmo nome no mesmo ano
      const turmaExistente = await prisma.turma.findFirst({
        where: {
          nome: nome.trim(),
          ano: ano || new Date().getFullYear()
        }
      });
      
      if (turmaExistente) {
        throw new Error("Já existe uma turma com este nome neste ano");
      }
      
      const turma = await prisma.turma.create({
        data: { 
          nome: nome.trim(),
          ano: ano || new Date().getFullYear(),
          semestre: semestre || null,
          capacidade: capacidade || null,
          turno: turno || "matutino",
          professorId: professorFinalId ? Number(professorFinalId) : null,
          cursoId: cursoId ? Number(cursoId) : null
        },
        include: INCLUDE,
      });
      
      logger.info(`Turma criada: "${turma.nome}" - Ano: ${turma.ano}`);
      return turma;
      
    } catch (error) {
      logger.error(`Erro ao criar turma: ${error.message}`);
      throw error;
    }
  }

  static async listarTurmas(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.ano) where.ano = Number(filtros.ano);
      if (filtros.semestre) where.semestre = Number(filtros.semestre);
      if (filtros.turno) where.turno = filtros.turno;
      if (filtros.professorId) where.professorId = Number(filtros.professorId);
      if (filtros.cursoId) where.cursoId = Number(filtros.cursoId);
      
      if (filtros.search) {
        where.nome = { contains: filtros.search, mode: 'insensitive' };
      }
      
      const turmas = await prisma.turma.findMany({ 
        where, 
        include: INCLUDE, 
        orderBy: [{ ano: "desc" }, { nome: "asc" }],
        take: filtros.limit ? Number(filtros.limit) : undefined,
        skip: filtros.offset ? Number(filtros.offset) : undefined
      });
      
      // Adicionar contagem de alunos
      const turmasComContagem = await Promise.all(turmas.map(async (turma) => {
        const totalAlunos = await prisma.aluno.count({
          where: { turmaId: turma.id }
        });
        return { ...turma, totalAlunos };
      }));
      
      return turmasComContagem;
      
    } catch (error) {
      logger.error(`Erro ao listar turmas: ${error.message}`);
      throw error;
    }
  }

  static async obterTurmaPorId(id) {
    try {
      const turma = await prisma.turma.findUnique({ 
        where: { id: Number(id) }, 
        include: INCLUDE 
      });
      
      if (!turma) throw new Error("Turma não encontrada");
      
      const totalAlunos = await prisma.aluno.count({
        where: { turmaId: turma.id }
      });
      
      return { ...turma, totalAlunos };
      
    } catch (error) {
      logger.error(`Erro ao obter turma ${id}: ${error.message}`);
      throw error;
    }
  }

  static async obterTurmaPorNome(nome, ano) {
    try {
      const where = { nome: nome.trim() };
      if (ano) where.ano = Number(ano);
      
      const turma = await prisma.turma.findFirst({ 
        where, 
        include: INCLUDE 
      });
      
      if (!turma) throw new Error("Turma não encontrada");
      return turma;
      
    } catch (error) {
      logger.error(`Erro ao obter turma por nome ${nome}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarTurma(id, { nome, professorId, usuarioId, ano, semestre, capacidade, turno, cursoId }) {
    try {
      const turmaExistente = await prisma.turma.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!turmaExistente) throw new Error("Turma não encontrada");
      
      const erros = this.validarDados({ 
        nome, ano, semestre, capacidade 
      }, true);
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }
      
      const professorFinalId = professorId ?? usuarioId;
      if (professorFinalId !== undefined) {
        await this.verificarProfessor(professorFinalId);
      }
      
      if (cursoId !== undefined) {
        await this.verificarCurso(cursoId);
      }
      
      // Verificar duplicata de nome
      if (nome && nome !== turmaExistente.nome) {
        const anoFinal = ano || turmaExistente.ano;
        const turmaDuplicada = await prisma.turma.findFirst({
          where: {
            nome: nome.trim(),
            ano: anoFinal,
            id: { not: Number(id) }
          }
        });
        
        if (turmaDuplicada) {
          throw new Error("Já existe uma turma com este nome neste ano");
        }
      }
      
      const turma = await prisma.turma.update({
        where: { id: Number(id) },
        data: {
          nome: nome?.trim() ?? turmaExistente.nome,
          ano: ano !== undefined ? Number(ano) : turmaExistente.ano,
          semestre: semestre !== undefined ? Number(semestre) : turmaExistente.semestre,
          capacidade: capacidade !== undefined ? Number(capacidade) : turmaExistente.capacidade,
          turno: turno ?? turmaExistente.turno,
          professorId: professorFinalId !== undefined 
            ? (professorFinalId ? Number(professorFinalId) : null) 
            : turmaExistente.professorId,
          cursoId: cursoId !== undefined 
            ? (cursoId ? Number(cursoId) : null) 
            : turmaExistente.cursoId,
        },
        include: INCLUDE,
      });
      
      logger.info(`Turma atualizada: "${turma.nome}"`);
      return turma;
      
    } catch (error) {
      logger.error(`Erro ao atualizar turma ${id}: ${error.message}`);
      throw error;
    }
  }

  static async adicionarAluno(turmaId, alunoId) {
    try {
      const turma = await prisma.turma.findUnique({ where: { id: Number(turmaId) } });
      if (!turma) throw new Error("Turma não encontrada");
      
      const aluno = await prisma.aluno.findUnique({ where: { id: Number(alunoId) } });
      if (!aluno) throw new Error("Aluno não encontrado");
      
      // Verificar capacidade
      if (turma.capacidade) {
        const alunosCount = await prisma.aluno.count({
          where: { turmaId: Number(turmaId) }
        });
        
        if (alunosCount >= turma.capacidade) {
          throw new Error("Turma atingiu capacidade máxima");
        }
      }
      
      const alunoAtualizado = await prisma.aluno.update({
        where: { id: Number(alunoId) },
        data: { turmaId: Number(turmaId) },
        include: { turma: true }
      });
      
      logger.info(`Aluno ${aluno.nome} adicionado à turma ${turma.nome}`);
      return alunoAtualizado;
      
    } catch (error) {
      logger.error(`Erro ao adicionar aluno à turma: ${error.message}`);
      throw error;
    }
  }

  static async removerAluno(turmaId, alunoId) {
    try {
      const aluno = await prisma.aluno.findUnique({ 
        where: { id: Number(alunoId) } 
      });
      if (!aluno) throw new Error("Aluno não encontrado");
      
      if (aluno.turmaId !== Number(turmaId)) {
        throw new Error("Aluno não pertence a esta turma");
      }
      
      const alunoAtualizado = await prisma.aluno.update({
        where: { id: Number(alunoId) },
        data: { turmaId: null },
        include: { turma: true }
      });
      
      logger.info(`Aluno ${aluno.nome} removido da turma ${turmaId}`);
      return alunoAtualizado;
      
    } catch (error) {
      logger.error(`Erro ao remover aluno da turma: ${error.message}`);
      throw error;
    }
  }

  static async deletarTurma(id) {
    try {
      const turma = await prisma.turma.findUnique({ 
        where: { id: Number(id) },
        include: { 
          alunos: { take: 1 },
          disciplinas: { take: 1 }
        }
      });
      
      if (!turma) throw new Error("Turma não encontrada");
      
      // Verificar se tem alunos ou disciplinas
      const alunosCount = await prisma.aluno.count({
        where: { turmaId: Number(id) }
      });
      
      if (alunosCount > 0) {
        throw new Error(`Não é possível deletar turma com ${alunosCount} alunos matriculados`);
      }
      
      const disciplinasCount = await prisma.disciplina.count({
        where: { turmas: { some: { id: Number(id) } } }
      });
      
      if (disciplinasCount > 0) {
        throw new Error(`Não é possível deletar turma com ${disciplinasCount} disciplinas associadas`);
      }
      
      await prisma.turma.delete({ where: { id: Number(id) } });
      
      logger.info(`Turma deletada: "${turma.nome}"`);
      return { 
        mensagem: "Turma deletada com sucesso",
        turma: { id: turma.id, nome: turma.nome, ano: turma.ano }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar turma ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getEstatisticas() {
    try {
      const total = await prisma.turma.count();
      const porAno = await prisma.turma.groupBy({
        by: ['ano'],
        _count: { id: true }
      });
      const porTurno = await prisma.turma.groupBy({
        by: ['turno'],
        _count: { id: true }
      });
      
      const capacidadeTotal = await prisma.turma.aggregate({
        _sum: { capacidade: true }
      });
      
      const alunosMatriculados = await prisma.aluno.count({
        where: { turmaId: { not: null } }
      });
      
      return {
        total,
        porAno,
        porTurno,
        capacidadeTotal: capacidadeTotal._sum.capacidade || 0,
        alunosMatriculados,
        ocupacao: capacidadeTotal._sum.capacidade 
          ? (alunosMatriculados / capacidadeTotal._sum.capacidade) * 100 
          : 0
      };
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }
}