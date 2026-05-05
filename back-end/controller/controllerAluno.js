import { ServiceAluno } from "../service/serviceAluno.js";
import { ServiceNota } from "../service/serviceNota.js";
import { handle } from "./_base.js";

export class ControllerAluno {
  static criarAluno = handle(async (req) => {
    return ServiceAluno.criarAluno(req.body);
  }, 201);
  
  static listarAlunos = handle(async (req) => {
    const { turmaId, cursoId, encarregadoId } = req.query;
    return ServiceAluno.listarAlunos({ turmaId, cursoId, encarregadoId });
  });
  
  static obterAlunoPorId = handle(async (req) => {
    return ServiceAluno.obterAlunoPorId(req.params.id);
  });
  
  static obterAlunoPorMatricula = handle(async (req) => {
    return ServiceAluno.obterAlunoPorMatricula(req.params.matricula);
  });
  
  static atualizarAluno = handle(async (req) => {
    return ServiceAluno.atualizarAluno(req.params.id, req.body);
  });
  
  static deletarAluno = handle(async (req) => {
    return ServiceAluno.deletarAluno(req.params.id);
  });
  
  static mediaAluno = handle(async (req) => {
    return ServiceNota.mediaAlunoByDisciplina(req.params.id);
  });
}