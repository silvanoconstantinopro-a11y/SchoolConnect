import { ServiceNota } from "../service/serviceNota.js";
import { handle } from "./_base.js";

export class ControllerNota {
  static criarNota = handle(async (req) => {
    const { valor, tipo, alunoId, disciplinaId } = req.body;
    return ServiceNota.criarNota({ valor, tipo, alunoId, disciplinaId });
  }, 201);

  static listarNotas = handle(async (req) => {
    const { alunoId, disciplinaId, tipo } = req.query;
    return ServiceNota.listarNotas({ alunoId, disciplinaId, tipo });
  });

  static obterNotaPorId = handle(async (req) => {
    return ServiceNota.obterNotaPorId(req.params.id);
  });

  static atualizarNota = handle(async (req) => {
    const { valor, tipo } = req.body;
    return ServiceNota.atualizarNota(req.params.id, { valor, tipo });
  });

  static deletarNota = handle(async (req) => {
    return ServiceNota.deletarNota(req.params.id);
  });

  static mediaAluno = handle(async (req) => {
    return ServiceNota.mediaAlunoByDisciplina(req.params.alunoId);
  });

  static getBoletim = handle(async (req) => {
    return ServiceNota.getBoletim(req.params.alunoId);
  });
}