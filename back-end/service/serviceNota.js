/**
 * serviceNota.js
 * Gestão completa de notas de alunos
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";

const INCLUDE = {
  aluno: { select: { id: true, nome: true, matricula: true, turma: true } },
  disciplina: { select: { id: true, nome: true, curso: true } },
};

export class ServiceNota {

  static validarValor(valor) {
    const nota = Number(valor);
    if (isNaN(nota)) throw new Error("Valor da nota inválido");
    if (nota < 0 || nota > 20) throw new Error("Nota deve estar entre 0 e 20");
    return nota;
  }

  static async verificarAluno(alunoId) {
    const aluno = await prisma.aluno.findUnique({ where: { id: Number(alunoId) } });
    if (!aluno) throw new Error("Aluno não encontrado");
    return aluno;
  }

  static async verificarDisciplina(disciplinaId) {
    const disciplina = await prisma.disciplina.findUnique({ where: { id: Number(disciplinaId) } });
    if (!disciplina) throw new Error("Disciplina não encontrada");
    return disciplina;
  }

  static async criarNota({ valor, tipo, alunoId, disciplinaId, semestre, observacao }) {
    try {
      if (!valor || !tipo || !alunoId || !disciplinaId) {
        throw new Error("Campos obrigatórios: valor, tipo, alunoId, disciplinaId");
      }
      
      const notaValor = this.validarValor(valor);
      const tiposPermitidos = ["PROVA", "TRABALHO", "RECUPERACAO", "EXAME", "ATIVIDADE"];
      if (!tiposPermitidos.includes(tipo)) {
        throw new Error("Tipo de nota inválido");
      }
      
      await this.verificarAluno(alunoId);
      await this.verificarDisciplina(disciplinaId);
      
      // Verificar se já existe nota do mesmo tipo para o aluno/disciplina
      const existing = await prisma.nota.findFirst({
        where: {
          alunoId: Number(alunoId),
          disciplinaId: Number(disciplinaId),
          tipo: tipo,
          semestre: semestre || new Date().getFullYear()
        }
      });
      
      if (existing) {
        throw new Error(`Já existe uma nota do tipo ${tipo} para este aluno nesta disciplina`);
      }
      
      const nota = await prisma.nota.create({
        data: {
          valor: notaValor,
          tipo,
          alunoId: Number(alunoId),
          disciplinaId: Number(disciplinaId),
          semestre: semestre || new Date().getFullYear(),
          observacao: observacao?.trim() || null
        },
        include: INCLUDE,
      });
      
      logger.info(`Nota criada: ${nota.valor} - Aluno: ${nota.aluno.nome} - Disciplina: ${nota.disciplina.nome}`);
      return nota;
      
    } catch (error) {
      logger.error(`Erro ao criar nota: ${error.message}`);
      throw error;
    }
  }

  static async listarNotas(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.alunoId) where.alunoId = Number(filtros.alunoId);
      if (filtros.disciplinaId) where.disciplinaId = Number(filtros.disciplinaId);
      if (filtros.tipo) where.tipo = filtros.tipo;
      if (filtros.semestre) where.semestre = Number(filtros.semestre);
      
      if (filtros.valorMin) {
        where.valor = { gte: Number(filtros.valorMin) };
      }
      if (filtros.valorMax) {
        where.valor = { ...where.valor, lte: Number(filtros.valorMax) };
      }
      
      const notas = await prisma.nota.findMany({
        where,
        include: INCLUDE,
        orderBy: { criadoEm: "desc" },
        take: filtros.limit ? Number(filtros.limit) : undefined,
        skip: filtros.offset ? Number(filtros.offset) : undefined
      });
      
      return notas;
      
    } catch (error) {
      logger.error(`Erro ao listar notas: ${error.message}`);
      throw error;
    }
  }

  static async obterNotaPorId(id) {
    try {
      const nota = await prisma.nota.findUnique({
        where: { id: Number(id) },
        include: INCLUDE
      });
      if (!nota) throw new Error("Nota não encontrada");
      return nota;
    } catch (error) {
      logger.error(`Erro ao obter nota ${id}: ${error.message}`);
      throw error;
    }
  }

  static async obterNotasPorAluno(alunoId) {
    try {
      const notas = await prisma.nota.findMany({
        where: { alunoId: Number(alunoId) },
        include: { disciplina: true },
        orderBy: { disciplina: { nome: "asc" } }
      });
      
      // Calcular média por disciplina
      const medias = {};
      for (const nota of notas) {
        const disciplinaNome = nota.disciplina.nome;
        if (!medias[disciplinaNome]) {
          medias[disciplinaNome] = { soma: 0, count: 0, notas: [] };
        }
        medias[disciplinaNome].soma += nota.valor;
        medias[disciplinaNome].count++;
        medias[disciplinaNome].notas.push(nota);
      }
      
      for (const disc in medias) {
        medias[disc].media = medias[disc].soma / medias[disc].count;
        medias[disc].status = medias[disc].media >= 9.5 ? "APROVADO" : "REPROVADO";
      }
      
      return { notas, medias };
      
    } catch (error) {
      logger.error(`Erro ao obter notas do aluno ${alunoId}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarNota(id, { valor, tipo, observacao }) {
    try {
      const notaExistente = await prisma.nota.findUnique({ where: { id: Number(id) } });
      if (!notaExistente) throw new Error("Nota não encontrada");
      
      const data = {};
      if (valor !== undefined) data.valor = this.validarValor(valor);
      if (tipo !== undefined) data.tipo = tipo;
      if (observacao !== undefined) data.observacao = observacao?.trim() || null;
      
      const nota = await prisma.nota.update({
        where: { id: Number(id) },
        data,
        include: INCLUDE,
      });
      
      logger.info(`Nota ${id} atualizada para ${nota.valor}`);
      return nota;
      
    } catch (error) {
      logger.error(`Erro ao atualizar nota ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarNota(id) {
    try {
      const nota = await prisma.nota.findUnique({ where: { id: Number(id) } });
      if (!nota) throw new Error("Nota não encontrada");
      
      await prisma.nota.delete({ where: { id: Number(id) } });
      
      logger.info(`Nota ${id} deletada - Aluno: ${nota.alunoId} - Disciplina: ${nota.disciplinaId}`);
      return { 
        mensagem: "Nota deletada com sucesso",
        nota: { id: nota.id, valor: nota.valor, tipo: nota.tipo }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar nota ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getEstatisticas() {
    try {
      const total = await prisma.nota.count();
      const mediaGeral = await prisma.nota.aggregate({
        _avg: { valor: true }
      });
      const aprovados = await prisma.nota.groupBy({
        by: ['alunoId'],
        having: { valor: { _avg: { gte: 9.5 } } }
      });
      
      return {
        total,
        mediaGeral: mediaGeral._avg.valor || 0,
        alunosAprovados: aprovados.length
      };
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      throw error;
    }
  }
}