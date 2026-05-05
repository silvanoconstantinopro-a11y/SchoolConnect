import { prisma } from "../prismaClient/prismaClient.js";
import { broadcast, enviarMensagemWS } from "../websocket.js";

const INCLUDE = {
  criadoPor: { select: { id: true, nome: true, perfil: true, imagem: true, email: true } },
  participantes: {
    include: {
      usuario: { select: { id: true, nome: true, perfil: true, email: true, imagem: true } }
    }
  }
};

export class ServiceReuniao {

  static async criarReuniao({ titulo, linkMeeting, local, participantesIds = [], criadoPorId = null, dataHora = null }) {
    if (!titulo?.trim()) throw new Error("Título é obrigatório.");
    if (!local?.trim()) throw new Error("Local é obrigatório.");

    const ids = [...new Set((participantesIds || []).map(Number).filter(id => Number.isFinite(id) && id > 0))];
    if (!ids.length) throw new Error("Selecione pelo menos um participante.");

    // Validar que todos os participantes existem
    const existentes = await prisma.usuario.findMany({
      where: { id: { in: ids } },
      select: { id: true, nome: true, email: true }
    });
    
    if (existentes.length !== ids.length) {
      const encontrados = existentes.map(e => e.id);
      const faltantes = ids.filter(id => !encontrados.includes(id));
      throw new Error(`Participantes não encontrados: ${faltantes.join(", ")}`);
    }

    const dataHoraObj = dataHora ? new Date(dataHora) : null;
    if (dataHoraObj && isNaN(dataHoraObj.getTime())) {
      throw new Error("Data/Hora inválida.");
    }

    const reuniao = await prisma.reuniao.create({
      data: {
        titulo: titulo.trim(),
        local: local.trim(),
        linkMeeting: linkMeeting?.trim() || null,
        dataHora: dataHoraObj,
        criadoPorId: criadoPorId ? Number(criadoPorId) : null,
        participantes: { create: ids.map(usuarioId => ({ usuarioId })) }
      },
      include: INCLUDE
    });

    // Notificar todos os participantes via WebSocket
    const notificacao = {
      tipo: "nova_reuniao",
      reuniao: {
        id: reuniao.id,
        titulo: reuniao.titulo,
        local: reuniao.local,
        linkMeeting: reuniao.linkMeeting,
        dataHora: reuniao.dataHora,
        criadoPor: reuniao.criadoPor
      }
    };

    for (const participante of existentes) {
      enviarMensagemWS(participante.id, notificacao);
    }

    return reuniao;
  }

  static async listarReunioes({ usuarioId, futuras, status } = {}) {
    const where = {};

    if (usuarioId) {
      where.OR = [
        { criadoPorId: Number(usuarioId) },
        { participantes: { some: { usuarioId: Number(usuarioId) } } }
      ];
    }

    if (futuras === "true" || futuras === true) {
      where.dataHora = { gte: new Date() };
    }

    if (status === "passadas") {
      where.dataHora = { lt: new Date() };
    }

    const reunioes = await prisma.reuniao.findMany({
      where,
      include: INCLUDE,
      orderBy: { dataHora: "asc" }
    });

    return reunioes;
  }

  static async obterReuniaoPorId(id) {
    const reuniao = await prisma.reuniao.findUnique({
      where: { id: Number(id) },
      include: INCLUDE
    });
    if (!reuniao) throw new Error("Reunião não encontrada.");
    return reuniao;
  }

  static async atualizarReuniao(id, { titulo, linkMeeting, local, participantesIds, dataHora }) {
    const reuniao = await prisma.reuniao.findUnique({ where: { id: Number(id) } });
    if (!reuniao) throw new Error("Reunião não encontrada.");

    const updateData = {};
    if (titulo?.trim()) updateData.titulo = titulo.trim();
    if (local?.trim()) updateData.local = local.trim();
    if (linkMeeting !== undefined) updateData.linkMeeting = linkMeeting?.trim() || null;
    if (dataHora) {
      const dataHoraObj = new Date(dataHora);
      if (isNaN(dataHoraObj.getTime())) throw new Error("Data/Hora inválida.");
      updateData.dataHora = dataHoraObj;
    }

    await prisma.reuniao.update({
      where: { id: Number(id) },
      data: updateData
    });

    if (participantesIds?.length) {
      const ids = [...new Set(participantesIds.map(Number).filter(id => Number.isFinite(id) && id > 0))];
      
      // Validar participantes
      const existentes = await prisma.usuario.findMany({
        where: { id: { in: ids } },
        select: { id: true }
      });
      
      if (existentes.length !== ids.length) {
        throw new Error("Um ou mais participantes não foram encontrados.");
      }

      await prisma.reuniaoParticipante.deleteMany({ where: { reuniaoId: Number(id) } });
      await prisma.reuniaoParticipante.createMany({
        data: ids.map(usuarioId => ({ reuniaoId: Number(id), usuarioId })),
        skipDuplicates: true
      });
    }

    return ServiceReuniao.obterReuniaoPorId(id);
  }

  static async deletarReuniao(id) {
    const reuniao = await prisma.reuniao.findUnique({ where: { id: Number(id) } });
    if (!reuniao) throw new Error("Reunião não encontrada.");
    
    await prisma.reuniaoParticipante.deleteMany({ where: { reuniaoId: Number(id) } });
    await prisma.reuniao.delete({ where: { id: Number(id) } });
    
    return { mensagem: "Reunião removida com sucesso." };
  }

  static async adicionarParticipante(reuniaoId, usuarioId) {
    const reuniao = await prisma.reuniao.findUnique({ where: { id: Number(reuniaoId) } });
    if (!reuniao) throw new Error("Reunião não encontrada.");
    
    const usuario = await prisma.usuario.findUnique({ where: { id: Number(usuarioId) } });
    if (!usuario) throw new Error("Utilizador não encontrado.");

    const exists = await prisma.reuniaoParticipante.findFirst({
      where: { reuniaoId: Number(reuniaoId), usuarioId: Number(usuarioId) }
    });
    
    if (exists) throw new Error("Utilizador já é participante desta reunião.");

    const participante = await prisma.reuniaoParticipante.create({
      data: {
        reuniaoId: Number(reuniaoId),
        usuarioId: Number(usuarioId)
      },
      include: { usuario: true }
    });

    // Notificar novo participante
    enviarMensagemWS(usuarioId, {
      tipo: "convite_reuniao",
      reuniao: {
        id: reuniao.id,
        titulo: reuniao.titulo,
        dataHora: reuniao.dataHora,
        local: reuniao.local
      }
    });

    return participante;
  }

  static async removerParticipante(reuniaoId, usuarioId) {
    const participante = await prisma.reuniaoParticipante.findFirst({
      where: { reuniaoId: Number(reuniaoId), usuarioId: Number(usuarioId) }
    });
    
    if (!participante) throw new Error("Participante não encontrado nesta reunião.");
    
    await prisma.reuniaoParticipante.delete({ where: { id: participante.id } });
    return { mensagem: "Participante removido com sucesso." };
  }
}