import { ServiceReuniao } from "../service/serviceReuniao.js";
import { handle } from "./_base.js";

export class ControllerReuniao {
  static criarReuniao = handle(async (req) => {
    const { titulo, linkMeeting, local, participantesIds, dataHora } = req.body;
    const criadoPorId = req.user?.id || null;
    return ServiceReuniao.criarReuniao({
      titulo,
      linkMeeting,
      local,
      participantesIds,
      criadoPorId,
      dataHora
    });
  }, 201);

  static listarReunioes = handle(async (req) => {
    const { usuarioId, futuras, status } = req.query;
    return ServiceReuniao.listarReunioes({ usuarioId, futuras, status });
  });

  static obterReuniaoPorId = handle(async (req) => {
    return ServiceReuniao.obterReuniaoPorId(req.params.id);
  });

  static atualizarReuniao = handle(async (req) => {
    const { titulo, linkMeeting, local, participantesIds, dataHora } = req.body;
    return ServiceReuniao.atualizarReuniao(req.params.id, {
      titulo,
      linkMeeting,
      local,
      participantesIds,
      dataHora
    });
  });

  static deletarReuniao = handle(async (req) => {
    return ServiceReuniao.deletarReuniao(req.params.id);
  });

  static adicionarParticipante = handle(async (req) => {
    const { usuarioId } = req.body;
    if (!usuarioId) throw new Error("Usuário ID é obrigatório");
    return ServiceReuniao.adicionarParticipante(req.params.id, usuarioId);
  });

  static removerParticipante = handle(async (req) => {
    const { usuarioId } = req.body;
    if (!usuarioId) throw new Error("Usuário ID é obrigatório");
    return ServiceReuniao.removerParticipante(req.params.id, usuarioId);
  });

  static minhasReunioes = handle(async (req) => {
    return ServiceReuniao.listarReunioes({ usuarioId: req.user.id });
  });
}