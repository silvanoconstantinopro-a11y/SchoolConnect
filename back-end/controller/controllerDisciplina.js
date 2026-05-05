import { ServiceDisciplina } from "../service/serviceDisciplina.js";
import { handle } from "./_base.js";

export class ControllerDisciplina {
  static criarDisciplina = handle(async (req) => {
    const { nome, descricao, cursoId, professorId } = req.body;
    return ServiceDisciplina.criarDisciplina({ nome, descricao, cursoId, professorId });
  }, 201);

  static listarDisciplinas = handle(async (req) => {
    const { cursoId, professorId } = req.query;
    return ServiceDisciplina.listarDisciplinas({ cursoId, professorId });
  });

  static obterDisciplinaPorId = handle(async (req) => {
    return ServiceDisciplina.obterDisciplinaPorId(req.params.id);
  });

  static atualizarDisciplina = handle(async (req) => {
    const { nome, descricao, cursoId, professorId } = req.body;
    return ServiceDisciplina.atualizarDisciplina(req.params.id, { nome, descricao, cursoId, professorId });
  });

  static deletarDisciplina = handle(async (req) => {
    return ServiceDisciplina.deletarDisciplina(req.params.id);
  });

  static adicionarProfessor = handle(async (req) => {
    const { professorId } = req.body;
    if (!professorId) throw new Error("Professor ID é obrigatório");
    return ServiceDisciplina.adicionarProfessor(req.params.id, professorId);
  });

  static removerProfessor = handle(async (req) => {
    const { professorId } = req.body;
    if (!professorId) throw new Error("Professor ID é obrigatório");
    return ServiceDisciplina.removerProfessor(req.params.id, professorId);
  });

  static getDisciplinasPorProfessor = handle(async (req) => {
    return ServiceDisciplina.getDisciplinasPorProfessor(req.params.professorId);
  });
}