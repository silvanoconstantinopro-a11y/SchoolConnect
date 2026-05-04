import { ServiceReuniao } from "../service/serviceReuniao.js";
import { handle }          from "./_base.js";

export class ControllerReuniao {
  static criarReuniao = handle(async (req) => {
    const criadoPorId = req.user?.id || null;
    return ServiceReuniao.criarReuniao({ ...req.body, criadoPorId });
  }, 201);

  static listarReunioes    = handle(async (req) => ServiceReuniao.listarReunioes(req.query));
  static obterReuniaoPorId = handle(async (req) => ServiceReuniao.obterReuniaoPorId(req.params.id));
  static atualizarReuniao  = handle(async (req) => ServiceReuniao.atualizarReuniao(req.params.id, req.body));
  static deletarReuniao    = handle(async (req) => ServiceReuniao.deletarReuniao(req.params.id));
}