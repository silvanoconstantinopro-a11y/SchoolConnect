import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  aluno: { select: { id: true, nome: true, matricula: true, classe: true } },
  disciplina: { 
    select: { 
      id: true, nome: true, 
      curso: { select: { id: true, nome: true } } 
    } 
  }
};

export class ServiceNota {

  static async criarNota({ valor, tipo, alunoId, disciplinaId }) {
    // Validações
    if (valor === undefined || valor === null) {
      throw new Error("Valor da nota é obrigatório.");
    }
    if (!tipo?.trim()) throw new Error("Tipo da nota é obrigatório.");
    if (!alunoId) throw new Error("Aluno é obrigatório.");
    if (!disciplinaId) throw new Error("Disciplina é obrigatória.");

    const v = Number(valor);
    if (isNaN(v)) throw new Error("Nota deve ser um número válido.");
    if (v < 0 || v > 20) throw new Error("Nota deve estar entre 0 e 20.");

    // Validar existência
    const [aluno, disciplina] = await Promise.all([
      prisma.aluno.findUnique({ where: { id: Number(alunoId) }, select: { id: true } }),
      prisma.disciplina.findUnique({ where: { id: Number(disciplinaId) }, select: { id: true, cursoId: true } })
    ]);
    
    if (!aluno) throw new Error("Aluno não encontrado.");
    if (!disciplina) throw new Error("Disciplina não encontrada.");

    // Verificar se já existe nota do mesmo tipo para o aluno/disciplina
    const existing = await prisma.nota.findFirst({
      where: {
        alunoId: Number(alunoId),
        disciplinaId: Number(disciplinaId),
        tipo: tipo.trim()
      }
    });

    if (existing) {
      throw new Error(`Já existe uma nota do tipo "${tipo}" para este aluno nesta disciplina. Use PUT para atualizar.`);
    }

    return prisma.nota.create({
      data: {
        valor: v,
        tipo: tipo.trim(),
        alunoId: Number(alunoId),
        disciplinaId: Number(disciplinaId)
      },
      include: INCLUDE
    });
  }

  static async listarNotas({ alunoId, disciplinaId, tipo } = {}) {
    const where = {};
    if (alunoId) where.alunoId = Number(alunoId);
    if (disciplinaId) where.disciplinaId = Number(disciplinaId);
    if (tipo) where.tipo = tipo;

    return prisma.nota.findMany({ 
      where, 
      include: INCLUDE, 
      orderBy: { criadoEm: "desc" } 
    });
  }

  static async obterNotaPorId(id) {
    const nota = await prisma.nota.findUnique({ 
      where: { id: Number(id) }, 
      include: INCLUDE 
    });
    if (!nota) throw new Error("Nota não encontrada.");
    return nota;
  }

  static async atualizarNota(id, { valor, tipo }) {
    const nota = await prisma.nota.findUnique({ where: { id: Number(id) } });
    if (!nota) throw new Error("Nota não encontrada.");

    const updateData = {};
    
    if (valor !== undefined && valor !== null) {
      const v = Number(valor);
      if (isNaN(v)) throw new Error("Nota deve ser um número válido.");
      if (v < 0 || v > 20) throw new Error("Nota deve estar entre 0 e 20.");
      updateData.valor = v;
    }
    
    if (tipo?.trim()) updateData.tipo = tipo.trim();

    return prisma.nota.update({
      where: { id: Number(id) },
      data: updateData,
      include: INCLUDE
    });
  }

  static async deletarNota(id) {
    const nota = await prisma.nota.findUnique({ where: { id: Number(id) } });
    if (!nota) throw new Error("Nota não encontrada.");
    
    await prisma.nota.delete({ where: { id: Number(id) } });
    return { mensagem: "Nota removida com sucesso." };
  }

  /**
   * Calcula a média de notas de um aluno por disciplina
   */
  static async mediaAlunoByDisciplina(alunoId) {
    const notas = await prisma.nota.findMany({
      where: { alunoId: Number(alunoId) },
      include: { disciplina: { select: { id: true, nome: true, curso: { select: { nome: true } } } } }
    });

    const mapa = new Map();
    for (const nota of notas) {
      const key = nota.disciplinaId;
      if (!mapa.has(key)) {
        mapa.set(key, {
          disciplina: nota.disciplina,
          notas: [],
          soma: 0
        });
      }
      const entry = mapa.get(key);
      entry.notas.push(nota.valor);
      entry.soma += nota.valor;
    }

    return Array.from(mapa.values()).map(({ disciplina, notas, soma }) => ({
      disciplina,
      media: soma / notas.length,
      notas: notas,
      total: notas.length
    }));
  }

  /**
   * Obtém boletim completo do aluno
   */
  static async getBoletim(alunoId) {
    const [aluno, medias] = await Promise.all([
      prisma.aluno.findUnique({
        where: { id: Number(alunoId) },
        include: {
          turma: { select: { nome: true } },
          curso: { select: { nome: true } }
        }
      }),
      ServiceNota.mediaAlunoByDisciplina(alunoId)
    ]);

    if (!aluno) throw new Error("Aluno não encontrado.");

    const mediaGeral = medias.reduce((acc, m) => acc + m.media, 0) / (medias.length || 1);
    const situacao = mediaGeral >= 9.5 ? "APROVADO" : "REPROVADO";

    return {
      aluno: {
        id: aluno.id,
        nome: aluno.nome,
        matricula: aluno.matricula,
        turma: aluno.turma?.nome,
        curso: aluno.curso?.nome
      },
      disciplinas: medias,
      mediaGeral: Math.round(mediaGeral * 100) / 100,
      situacao,
      dataEmissao: new Date()
    };
  }
}