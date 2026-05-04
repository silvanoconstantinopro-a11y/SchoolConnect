import { ServiceCurso } from "../service/serviceCurso.js";
import { handle }        from "./_base.js";

export class ControllerCurso {
  static criarCurso                  = handle(async (req) => ServiceCurso.criarCurso(req.body), 201);
  static listarCursos                = handle(async ()    => ServiceCurso.listarCursos());
  static listarCursosComDisciplinas  = handle(async ()    => ServiceCurso.listarCursosComDisciplinas());
  static obterCursoPorId             = handle(async (req) => ServiceCurso.obterCursoPorId(req.params.id));
  static atualizarCurso              = handle(async (req) => ServiceCurso.atualizarCurso(req.params.id, req.body));
  static deletarCurso                = handle(async (req) => ServiceCurso.deletarCurso(req.params.id));
}