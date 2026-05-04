import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceRelatorio {

  static async criarRelatorio({ titulo, conteudo }) {
    if (!titulo?.trim() || !conteudo?.trim())
      throw new Error("Título e conteúdo são obrigatórios.");
    return prisma.relatorio.create({ data: { titulo: titulo.trim(), conteudo: conteudo.trim() } });
  }

  static async listarRelatorios() {
    return prisma.relatorio.findMany({ orderBy: { criadoEm: "desc" } });
  }

  static async obterRelatorioPorId(id) {
    const r = await prisma.relatorio.findUnique({ where: { id: Number(id) } });
    if (!r) throw new Error("Relatório não encontrado.");
    return r;
  }

  static async atualizarRelatorio(id, { titulo, conteudo }) {
    const r = await prisma.relatorio.findUnique({ where: { id: Number(id) } });
    if (!r) throw new Error("Relatório não encontrado.");
    return prisma.relatorio.update({
      where: { id: Number(id) },
      data:  { titulo: titulo?.trim() ?? r.titulo, conteudo: conteudo?.trim() ?? r.conteudo },
    });
  }

  static async deletarRelatorio(id) {
    const r = await prisma.relatorio.findUnique({ where: { id: Number(id) } });
    if (!r) throw new Error("Relatório não encontrado.");
    await prisma.relatorio.delete({ where: { id: Number(id) } });
    return { mensagem: "Relatório removido com sucesso." };
  }
}