import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceRelatorio {

  static async criarRelatorio({ titulo, conteudo }) {
    if (!titulo?.trim()) throw new Error("Título é obrigatório.");
    if (!conteudo?.trim()) throw new Error("Conteúdo é obrigatório.");

    return prisma.relatorio.create({
      data: {
        titulo: titulo.trim(),
        conteudo: conteudo.trim()
      }
    });
  }

  static async listarRelatorios({ limit, offset, search } = {}) {
    const where = search?.trim() ? {
      OR: [
        { titulo: { contains: search.trim() } },
        { conteudo: { contains: search.trim() } }
      ]
    } : {};

    const [relatorios, total] = await Promise.all([
      prisma.relatorio.findMany({
        where,
        orderBy: { criadoEm: "desc" },
        ...(limit ? { take: Number(limit) } : {}),
        ...(offset ? { skip: Number(offset) } : {})
      }),
      prisma.relatorio.count({ where })
    ]);

    return { data: relatorios, total };
  }

  static async obterRelatorioPorId(id) {
    const relatorio = await prisma.relatorio.findUnique({ where: { id: Number(id) } });
    if (!relatorio) throw new Error("Relatório não encontrado.");
    return relatorio;
  }

  static async atualizarRelatorio(id, { titulo, conteudo }) {
    const relatorio = await prisma.relatorio.findUnique({ where: { id: Number(id) } });
    if (!relatorio) throw new Error("Relatório não encontrado.");

    return prisma.relatorio.update({
      where: { id: Number(id) },
      data: {
        titulo: titulo?.trim() ?? relatorio.titulo,
        conteudo: conteudo?.trim() ?? relatorio.conteudo
      }
    });
  }

  static async deletarRelatorio(id) {
    const relatorio = await prisma.relatorio.findUnique({ where: { id: Number(id) } });
    if (!relatorio) throw new Error("Relatório não encontrado.");
    
    await prisma.relatorio.delete({ where: { id: Number(id) } });
    return { mensagem: "Relatório removido com sucesso." };
  }
}