import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceFeedback {

  static async criarFeedback({ nome, email, assunto, mensagem }) {
    if (!nome || !email || !assunto || !mensagem)
      throw new Error("Todos os campos são obrigatórios.");
    return prisma.feedback.create({ data: { nome, email, assunto, mensagem } });
  }

  static async listarFeedbacks() {
    return prisma.feedback.findMany({ orderBy: { criadoEm: "desc" } });
  }

  static async removerFeedback(id) {
    const f = await prisma.feedback.findUnique({ where: { id: Number(id) } });
    if (!f) throw new Error("Feedback não encontrado.");
    await prisma.feedback.delete({ where: { id: Number(id) } });
    return { mensagem: "Feedback removido." };
  }
}