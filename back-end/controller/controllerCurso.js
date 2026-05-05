import { ServiceCurso } from "../service/serviceCurso.js";
import { handle } from "./_base.js";

export class ControllerCurso {
  static criarCurso = handle(async (req) => {
    const { nome, descricao } = req.body;
    return ServiceCurso.criarCurso({ nome, descricao });
  }, 201);

  static listarCursos = handle(async () => {
    return ServiceCurso.listarCursos();
  });

  static listarCursosComDisciplinas = handle(async () => {
    return ServiceCurso.listarCursosComDisciplinas();
  });

  static obterCursoPorId = handle(async (req) => {
    return ServiceCurso.obterCursoPorId(req.params.id);
  });

  static atualizarCurso = handle(async (req) => {
    const { nome, descricao } = req.body;
    return ServiceCurso.atualizarCurso(req.params.id, { nome, descricao });
  });

  static deletarCurso = handle(async (req) => {
    return ServiceCurso.deletarCurso(req.params.id);
  });

  static adicionarProfessor = handle(async (req) => {
    const { professorId } = req.body;
    if (!professorId) throw new Error("Professor ID é obrigatório");
    return ServiceCurso.adicionarProfessor(req.params.id, professorId);
  });

  static removerProfessor = handle(async (req) => {
    const { professorId } = req.body;
    if (!professorId) throw new Error("Professor ID é obrigatório");
    return ServiceCurso.removerProfessor(req.params.id, professorId);
  });
}