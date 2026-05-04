import { prisma } from "../prismaClient/prismaClient.js";

const INCLUDE = {
  criadoPor:     { select: { id:true, nome:true, perfil:true } },
  participantes: { include: { usuario: { select:{ id:true, nome:true, perfil:true, email:true } } } },
};

export class ServiceReuniao {

  static async criarReuniao(titulo, linkMeeting, local, participantesIds = [], criadoPorId = null, dataHora = null) {
    if (!titulo || !local) throw new Error("Título e local são obrigatórios.");

    const ids = [...new Set((participantesIds || []).map(Number).filter(Number.isFinite))];
    if (!ids.length) throw new Error("Selecione pelo menos um participante.");

    return prisma.reuniao.create({
      data: {
        titulo, local,
        linkMeeting: linkMeeting || null,
        dataHora:    dataHora    ? new Date(dataHora) : null,
        criadoPorId: criadoPorId ? Number(criadoPorId) : null,
        participantes: { create: ids.map(usuarioId => ({ usuarioId })) },
      },
      include: INCLUDE,
    });
  }

  static async listarReunioes(usuarioId) {
    const where = usuarioId
      ? { OR: [
          { criadoPorId: Number(usuarioId) },
          { participantes: { some: { usuarioId: Number(usuarioId) } } },
        ] }
      : undefined;
    return prisma.reuniao.findMany({ where, include: INCLUDE, orderBy: { criadoEm: "desc" } });
  }

  static async obterReuniaoPorId(id) {
    const r = await prisma.reuniao.findUnique({ where: { id: Number(id) }, include: INCLUDE });
    if (!r) throw new Error("Reunião não encontrada.");
    return r;
  }

  static async atualizarReuniao(id, titulo, linkMeeting, local, participantesIds) {
    const r = await prisma.reuniao.findUnique({ where: { id: Number(id) } });
    if (!r) throw new Error("Reunião não encontrada.");

    await prisma.reuniao.update({
      where: { id: Number(id) },
      data:  { titulo: titulo ?? r.titulo, local: local ?? r.local, linkMeeting: linkMeeting ?? r.linkMeeting },
    });

    if (participantesIds?.length) {
      const ids = [...new Set(participantesIds.map(Number).filter(Number.isFinite))];
      await prisma.reuniaoParticipante.deleteMany({ where: { reuniaoId: Number(id) } });
      await prisma.reuniaoParticipante.createMany({
        data: ids.map(usuarioId => ({ reuniaoId: Number(id), usuarioId })),
      });
    }

    return ServiceReuniao.obterReuniaoPorId(id);
  }

  static async deletarReuniao(id) {
    const r = await prisma.reuniao.findUnique({ where: { id: Number(id) } });
    if (!r) throw new Error("Reunião não encontrada.");
    await prisma.reuniaoParticipante.deleteMany({ where: { reuniaoId: Number(id) } });
    await prisma.reuniao.delete({ where: { id: Number(id) } });
    return { mensagem: "Reunião deletada com sucesso." };
  }
}