import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  criadoPor: { select: { id: true, nome: true, perfil: true, imagem: true } },
  participantes: {
    include: {
      usuario: { select: { id: true, nome: true, perfil: true, email: true, imagem: true } },
    },
  },
};

export class ServiceReuniao {

  static async criarReuniao({ titulo, linkMeeting, local, participantesIds = [], criadoPorId = null, dataHora = null }) {
    if (!titulo?.trim() || !local?.trim())
      throw new Error("Título e local são obrigatórios.");

    const ids = [...new Set((participantesIds || []).map(Number).filter(Number.isFinite))];
    if (!ids.length) throw new Error("Selecione pelo menos um participante.");

    // Valida que todos os participantes existem
    const existentes = await prisma.usuario.findMany({ where: { id: { in: ids } }, select: { id: true } });
    if (existentes.length !== ids.length)
      throw new Error("Um ou mais participantes não foram encontrados.");

    return prisma.reuniao.create({
      data: {
        titulo:      titulo.trim(),
        local:       local.trim(),
        linkMeeting: linkMeeting || null,
        dataHora:    dataHora   ? new Date(dataHora) : null,
        criadoPorId: criadoPorId ? Number(criadoPorId) : null,
        participantes: { create: ids.map(usuarioId => ({ usuarioId })) },
      },
      include: INCLUDE,
    });
  }

  static async listarReunioes({ usuarioId, futuras } = {}) {
    const where = {};

    if (usuarioId) {
      where.OR = [
        { criadoPorId: Number(usuarioId) },
        { participantes: { some: { usuarioId: Number(usuarioId) } } },
      ];
    }

    if (futuras === "true" || futuras === true) {
      where.dataHora = { gte: new Date() };
    }

    return prisma.reuniao.findMany({
      where,
      include: INCLUDE,
      orderBy: { dataHora: "asc" },
    });
  }

  static async obterReuniaoPorId(id) {
    const r = await prisma.reuniao.findUnique({ where: { id: Number(id) }, include: INCLUDE });
    if (!r) throw new Error("Reunião não encontrada.");
    return r;
  }

  static async atualizarReuniao(id, { titulo, linkMeeting, local, participantesIds, dataHora }) {
    const r = await prisma.reuniao.findUnique({ where: { id: Number(id) } });
    if (!r) throw new Error("Reunião não encontrada.");

    await prisma.reuniao.update({
      where: { id: Number(id) },
      data: {
        titulo:      titulo?.trim()  ?? r.titulo,
        local:       local?.trim()   ?? r.local,
        linkMeeting: linkMeeting     ?? r.linkMeeting,
        dataHora:    dataHora        ? new Date(dataHora) : r.dataHora,
      },
    });

    if (participantesIds?.length) {
      const ids = [...new Set(participantesIds.map(Number).filter(Number.isFinite))];
      await prisma.reuniaoParticipante.deleteMany({ where: { reuniaoId: Number(id) } });
      await prisma.reuniaoParticipante.createMany({
        data: ids.map(usuarioId => ({ reuniaoId: Number(id), usuarioId })),
        skipDuplicates: true,
      });
    }

    return ServiceReuniao.obterReuniaoPorId(id);
  }

  static async deletarReuniao(id) {
    const r = await prisma.reuniao.findUnique({ where: { id: Number(id) } });
    if (!r) throw new Error("Reunião não encontrada.");
    await prisma.reuniaoParticipante.deleteMany({ where: { reuniaoId: Number(id) } });
    await prisma.reuniao.delete({ where: { id: Number(id) } });
    return { mensagem: "Reunião removida com sucesso." };
  }
}