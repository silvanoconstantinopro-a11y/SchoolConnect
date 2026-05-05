/**
 * serviceReuniao.js
 * Gestão completa de reuniões
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { logger } from "../utils/logger.js";
import { enviarMensagemWS, enviarMensagemMultiplosWS } from "../websocket.js";

const INCLUDE = {
  criadoPor: { select: { id: true, nome: true, perfil: true, email: true } },
  participantes: { 
    include: { 
      usuario: { select: { id: true, nome: true, perfil: true, email: true, imagem: true } } 
    } 
  },
};

export class ServiceReuniao {

  static validarDados(titulo, local, dataHora) {
    if (!titulo?.trim()) throw new Error("Título é obrigatório");
    if (!local?.trim()) throw new Error("Local é obrigatório");
    if (dataHora && isNaN(Date.parse(dataHora))) throw new Error("Data/Hora inválida");
    if (dataHora && new Date(dataHora) < new Date()) throw new Error("Data/Hora não pode ser no passado");
  }

  static async criarReuniao(titulo, linkMeeting, local, participantesIds = [], criadoPorId = null, dataHora = null, descricao = null) {
    try {
      this.validarDados(titulo, local, dataHora);

      const ids = [...new Set((participantesIds || []).map(Number).filter(Number.isFinite))];
      if (!ids.length) throw new Error("Selecione pelo menos um participante");

      // Verificar se todos os participantes existem
      const participantesExistentes = await prisma.usuario.findMany({
        where: { id: { in: ids } }
      });
      
      if (participantesExistentes.length !== ids.length) {
        throw new Error("Alguns participantes não foram encontrados");
      }

      const reuniao = await prisma.reuniao.create({
        data: {
          titulo: titulo.trim(),
          local: local.trim(),
          linkMeeting: linkMeeting?.trim() || null,
          descricao: descricao?.trim() || null,
          dataHora: dataHora ? new Date(dataHora) : null,
          criadoPorId: criadoPorId ? Number(criadoPorId) : null,
          participantes: { create: ids.map(usuarioId => ({ usuarioId })) },
        },
        include: INCLUDE,
      });

      // Notificar participantes via WebSocket
      await enviarMensagemMultiplosWS(ids, {
        type: "nova_reuniao",
        reuniao: {
          id: reuniao.id,
          titulo: reuniao.titulo,
          local: reuniao.local,
          dataHora: reuniao.dataHora,
          criadoPor: reuniao.criadoPor
        }
      });

      logger.info(`Reunião criada: "${reuniao.titulo}" com ${ids.length} participantes`);
      return reuniao;

    } catch (error) {
      logger.error(`Erro ao criar reunião: ${error.message}`);
      throw error;
    }
  }

  static async listarReunioes(usuarioId, filtros = {}) {
    try {
      const where = usuarioId ? {
        OR: [
          { criadoPorId: Number(usuarioId) },
          { participantes: { some: { usuarioId: Number(usuarioId) } } },
        ]
      } : undefined;
      
      if (filtros.status === "futuras") {
        where.dataHora = { gte: new Date() };
      } else if (filtros.status === "passadas") {
        where.dataHora = { lt: new Date() };
      }
      
      if (filtros.dataInicio) {
        where.dataHora = { ...where.dataHora, gte: new Date(filtros.dataInicio) };
      }
      if (filtros.dataFim) {
        where.dataHora = { ...where.dataHora, lte: new Date(filtros.dataFim) };
      }
      
      if (filtros.search) {
        where.titulo = { contains: filtros.search, mode: 'insensitive' };
      }
      
      const reunioes = await prisma.reuniao.findMany({ 
        where, 
        include: INCLUDE, 
        orderBy: { dataHora: filtros.orderBy === "asc" ? "asc" : "desc" },
        take: filtros.limit ? Number(filtros.limit) : undefined,
        skip: filtros.offset ? Number(filtros.offset) : undefined
      });
      
      return reunioes;
      
    } catch (error) {
      logger.error(`Erro ao listar reuniões: ${error.message}`);
      throw error;
    }
  }

  static async obterReuniaoPorId(id) {
    try {
      const reuniao = await prisma.reuniao.findUnique({ 
        where: { id: Number(id) }, 
        include: INCLUDE 
      });
      if (!reuniao) throw new Error("Reunião não encontrada");
      return reuniao;
    } catch (error) {
      logger.error(`Erro ao obter reunião ${id}: ${error.message}`);
      throw error;
    }
  }

  static async atualizarReuniao(id, titulo, linkMeeting, local, participantesIds, dataHora, descricao) {
    try {
      const reuniaoExistente = await prisma.reuniao.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!reuniaoExistente) throw new Error("Reunião não encontrada");
      
      if (titulo || local) {
        this.validarDados(titulo || reuniaoExistente.titulo, local || reuniaoExistente.local, dataHora);
      }

      // Atualizar dados básicos
      const reuniaoAtualizada = await prisma.reuniao.update({
        where: { id: Number(id) },
        data: {
          titulo: titulo?.trim() ?? reuniaoExistente.titulo,
          local: local?.trim() ?? reuniaoExistente.local,
          linkMeeting: linkMeeting?.trim() ?? reuniaoExistente.linkMeeting,
          descricao: descricao?.trim() ?? reuniaoExistente.descricao,
          dataHora: dataHora ? new Date(dataHora) : reuniaoExistente.dataHora,
        },
      });

      // Atualizar participantes se fornecido
      if (participantesIds?.length) {
        const ids = [...new Set(participantesIds.map(Number).filter(Number.isFinite))];
        
        await prisma.reuniaoParticipante.deleteMany({ where: { reuniaoId: Number(id) } });
        await prisma.reuniaoParticipante.createMany({
          data: ids.map(usuarioId => ({ reuniaoId: Number(id), usuarioId })),
        });
        
        // Notificar novos participantes
        await enviarMensagemMultiplosWS(ids, {
          type: "reuniao_atualizada",
          reuniao: {
            id: reuniaoAtualizada.id,
            titulo: reuniaoAtualizada.titulo,
            dataHora: reuniaoAtualizada.dataHora
          }
        });
      }

      logger.info(`Reunião ${id} atualizada`);
      return this.obterReuniaoPorId(id);

    } catch (error) {
      logger.error(`Erro ao atualizar reunião ${id}: ${error.message}`);
      throw error;
    }
  }

  static async confirmarParticipacao(reuniaoId, usuarioId, status) {
    try {
      const participacao = await prisma.reuniaoParticipante.findFirst({
        where: {
          reuniaoId: Number(reuniaoId),
          usuarioId: Number(usuarioId)
        }
      });
      
      if (!participacao) throw new Error("Participação não encontrada");
      
      const statusValidos = ["confirmado", "pendente", "recusado"];
      if (!statusValidos.includes(status)) {
        throw new Error("Status inválido");
      }
      
      const atualizado = await prisma.reuniaoParticipante.update({
        where: { id: participacao.id },
        data: { status, confirmadoEm: status === "confirmado" ? new Date() : null }
      });
      
      logger.info(`Usuário ${usuarioId} ${status} participação na reunião ${reuniaoId}`);
      return atualizado;
      
    } catch (error) {
      logger.error(`Erro ao confirmar participação: ${error.message}`);
      throw error;
    }
  }

  static async deletarReuniao(id) {
    try {
      const reuniao = await prisma.reuniao.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!reuniao) throw new Error("Reunião não encontrada");
      
      await prisma.reuniaoParticipante.deleteMany({ where: { reuniaoId: Number(id) } });
      await prisma.reuniao.delete({ where: { id: Number(id) } });
      
      logger.info(`Reunião deletada: "${reuniao.titulo}"`);
      return { 
        mensagem: "Reunião deletada com sucesso",
        reuniao: { id: reuniao.id, titulo: reuniao.titulo }
      };
      
    } catch (error) {
      logger.error(`Erro ao deletar reunião ${id}: ${error.message}`);
      throw error;
    }
  }
}