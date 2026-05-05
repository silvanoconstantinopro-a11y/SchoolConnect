import { prisma } from "../prismaClient/prismaClient.js";
import { broadcast } from "../websocket.js";

export class ServiceAviso {

  static async criarAviso({ titulo, conteudo, imagem }) {
    if (!titulo?.trim()) throw new Error("Título é obrigatório.");
    if (!conteudo?.trim()) throw new Error("Conteúdo é obrigatório.");

    const aviso = await prisma.aviso.create({
      data: {
        titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        imagem: imagem || null
      }
    });

    // Notificar todos os clientes ligados via WebSocket
    broadcast({
      tipo: "novo_aviso",
      aviso: {
        id: aviso.id,
        titulo: aviso.titulo,
        conteudo: aviso.conteudo,
        imagem: aviso.imagem,
        criadoEm: aviso.criadoEm
      }
    });

    return aviso;
  }

  static async listarAvisos({ limit, offset, search } = {}) {
    const where = search?.trim() ? {
      OR: [
        { titulo: { contains: search.trim() } },
        { conteudo: { contains: search.trim() } }
      ]
    } : {};

    const [avisos, total] = await Promise.all([
      prisma.aviso.findMany({
        where,
        orderBy: { criadoEm: "desc" },
        ...(limit ? { take: Number(limit) } : {}),
        ...(offset ? { skip: Number(offset) } : {})
      }),
      prisma.aviso.count({ where })
    ]);

    return { data: avisos, total };
  }

  static async obterAvisoPorId(id) {
    const aviso = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!aviso) throw new Error("Aviso não encontrado.");
    return aviso;
  }

  static async atualizarAviso(id, { titulo, conteudo, imagem }) {
    const aviso = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!aviso) throw new Error("Aviso não encontrado.");

    const atualizado = await prisma.aviso.update({
      where: { id: Number(id) },
      data: {
        titulo: titulo?.trim() ?? aviso.titulo,
        conteudo: conteudo?.trim() ?? aviso.conteudo,
        imagem: imagem !== undefined ? imagem : aviso.imagem
      }
    });

    // Notificar sobre atualização
    broadcast({
      tipo: "aviso_atualizado",
      aviso: atualizado
    });

    return atualizado;
  }

  static async deletarAviso(id) {
    const aviso = await prisma.aviso.findUnique({ where: { id: Number(id) } });
    if (!aviso) throw new Error("Aviso não encontrado.");
    
    await prisma.aviso.delete({ where: { id: Number(id) } });
    
    broadcast({
      tipo: "aviso_deletado",
      avisoId: id
    });
    
    return { mensagem: "Aviso removido com sucesso." };
  }

  static async getUltimosAvisos(limit = 5) {
    return prisma.aviso.findMany({
      orderBy: { criadoEm: "desc" },
      take: limit
    });
  }
}