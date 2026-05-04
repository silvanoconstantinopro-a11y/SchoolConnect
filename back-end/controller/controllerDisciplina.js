import { ServiceDisciplina } from "../service/serviceDisciplina.js";
import { handle }             from "./_base.js";

export class ControllerDisciplina {
  static criarDisciplina      = handle(async (req) => ServiceDisciplina.criarDisciplina(req.body), 201);
  static listarDisciplinas    = handle(async (req) => ServiceDisciplina.listarDisciplinas(req.query));
  static obterDisciplinaPorId = handle(async (req) => ServiceDisciplina.obterDisciplinaPorId(req.params.id));
  static atualizarDisciplina  = handle(async (req) => ServiceDisciplina.atualizarDisciplina(req.params.id, req.body));
  static deletarDisciplina    = handle(async (req) => ServiceDisciplina.deletarDisciplina(req.params.id));
}