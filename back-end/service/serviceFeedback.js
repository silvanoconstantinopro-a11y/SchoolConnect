import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceFeedback {

  static async criarFeedback({ nome, email, assunto, mensagem }) {
    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!email?.trim()) throw new Error("Email é obrigatório.");
    if (!assunto?.trim()) throw new Error("Assunto é obrigatório.");
    if (!mensagem?.trim()) throw new Error("Mensagem é obrigatória.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) throw new Error("Email inválido.");

    return prisma.feedback.create({
      data: {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        assunto: assunto.trim(),
        mensagem: mensagem.trim()
      }
    });
  }

  static async listarFeedbacks() {
    return prisma.feedback.findMany();
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
}