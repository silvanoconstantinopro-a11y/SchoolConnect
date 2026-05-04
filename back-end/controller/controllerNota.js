import { ServiceNota } from "../service/serviceNota.js";
import { handle }       from "./_base.js";

export class ControllerNota {
  static criarNota      = handle(async (req) => ServiceNota.criarNota(req.body), 201);
  static listarNotas    = handle(async (req) => ServiceNota.listarNotas(req.query));
  static obterNotaPorId = handle(async (req) => ServiceNota.obterNotaPorId(req.params.id));
  static atualizarNota  = handle(async (req) => ServiceNota.atualizarNota(req.params.id, req.body));
  static deletarNota    = handle(async (req) => ServiceNota.deletarNota(req.params.id));
  static mediaAluno     = handle(async (req) => ServiceNota.mediaAlunoByDisciplina(req.params.alunoId));
}