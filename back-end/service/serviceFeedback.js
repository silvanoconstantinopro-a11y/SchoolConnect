import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceFeedback {

  static async criarFeedback({ nome, email, assunto, mensagem }) {
    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!email?.trim()) throw new Error("Email é obrigatório.");
    if (!assunto?.trim()) throw new Error("Assunto é obrigatório.");
    if (!mensagem?.trim()) throw new Error("Mensagem é obrigatória.");

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error("Email inválido.");
    }

    return prisma.feedback.create({
      data: {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        assunto: assunto.trim(),
        mensagem: mensagem.trim()
      }
    });
  }

  static async listarFeedbacks({ limit, offset, email } = {}) {
    const where = email?.trim() ? { email: email.trim().toLowerCase() } : {};

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy: { criadoEm: "desc" },
        ...(limit ? { take: Number(limit) } : {}),
        ...(offset ? { skip: Number(offset) } : {})
      }),
      prisma.feedback.count({ where })
    ]);

    return { data: feedbacks, total };
  }

  static async obterFeedbackPorId(id) {
    const feedback = await prisma.feedback.findUnique({ where: { id: Number(id) } });
    if (!feedback) throw new Error("Feedback não encontrado.");
    return feedback;
  }

  static async removerFeedback(id) {
    const feedback = await prisma.feedback.findUnique({ where: { id: Number(id) } });
    if (!feedback) throw new Error("Feedback não encontrado.");
    
    await prisma.feedback.delete({ where: { id: Number(id) } });
    return { mensagem: "Feedback removido com sucesso." };
  }

  static async getEstatisticas() {
    const [total, hoje, estaSemana] = await Promise.all([
      prisma.feedback.count(),
      prisma.feedback.count({
        where: { criadoEm: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }
      }),
      prisma.feedback.count({
        where: { criadoEm: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) } }
      })
    ]);

    return { total, hoje, estaSemana };
  }
}