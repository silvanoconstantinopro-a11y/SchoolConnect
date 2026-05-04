import { ServiceRelatorio } from "../service/serviceRelatorio.js";
import { handle }            from "./_base.js";

export class ControllerRelatorio {
  static criarRelatorio      = handle(async (req) => ServiceRelatorio.criarRelatorio(req.body), 201);
  static listarRelatorios    = handle(async ()    => ServiceRelatorio.listarRelatorios());
  static obterRelatorioPorId = handle(async (req) => ServiceRelatorio.obterRelatorioPorId(req.params.id));
  static atualizarRelatorio  = handle(async (req) => ServiceRelatorio.atualizarRelatorio(req.params.id, req.body));
  static deletarRelatorio    = handle(async (req) => ServiceRelatorio.deletarRelatorio(req.params.id));
}