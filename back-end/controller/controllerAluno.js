import { ServiceAluno } from "../service/serviceAluno.js";
import { handle }        from "./_base.js";

export class ControllerAluno {
  static criarAluno       = handle(async (req) => ServiceAluno.criarAluno(req.body), 201);
  static listarAlunos     = handle(async (req) => ServiceAluno.listarAlunos(req.query));
  static obterAlunoPorId  = handle(async (req) => ServiceAluno.obterAlunoPorId(req.params.id));
  static atualizarAluno   = handle(async (req) => ServiceAluno.atualizarAluno(req.params.id, req.body));
  static deletarAluno     = handle(async (req) => ServiceAluno.deletarAluno(req.params.id));
  static mediaAluno       = handle(async (req) => {
    const { ServiceNota } = await import("../service/serviceNota.js");
    return ServiceNota.mediaAlunoByDisciplina(req.params.id);
  });
}