import { ServiceTurma } from "../service/ServiceTurma.js";
import { handle }        from "./_base.js";

export class ControllerTurma {
  static criarTurma      = handle(async (req) => ServiceTurma.criarTurma(req.body), 201);
  static listarTurmas    = handle(async (req) => ServiceTurma.listarTurmas(req.query));
  static obterTurmaPorId = handle(async (req) => ServiceTurma.obterTurmaPorId(req.params.id));
  static atualizarTurma  = handle(async (req) => ServiceTurma.atualizarTurma(req.params.id, req.body));
  static deletarTurma    = handle(async (req) => ServiceTurma.deletarTurma(req.params.id));
}