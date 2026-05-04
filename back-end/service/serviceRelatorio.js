import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceRelatorio {

  static async criarRelatorio({ titulo, conteudo }) {
    if (!titulo || !conteudo) throw new Error("Título e conteúdo são obrigatórios.");
    return prisma.relatorio.create({ data: { titulo, conteudo } });
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
      data:  { titulo: titulo ?? r.titulo, conteudo: conteudo ?? r.conteudo },
    });
  }

  static async deletarRelatorio(id) {
    const r = await prisma.relatorio.findUnique({ where: { id: Number(id) } });
    if (!r) throw new Error("Relatório não encontrado.");
    await prisma.relatorio.delete({ where: { id: Number(id) } });
    return { mensagem: "Relatório deletado com sucesso." };
  }
}