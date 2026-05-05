import { ServiceTurma } from "../service/ServiceTurma.js";
import { handle } from "./_base.js";

export class ControllerTurma {
  static criarTurma = handle(async (req) => {
    const { nome, professorId } = req.body;
    const usuarioId = req.user?.id;
    return ServiceTurma.criarTurma({ nome, professorId, usuarioId });
  }, 201);

  static listarTurmas = handle(async (req) => {
    const { professorId } = req.query;
    return ServiceTurma.listarTurmas({ professorId });
  });

  static obterTurmaPorId = handle(async (req) => {
    return ServiceTurma.obterTurmaPorId(req.params.id);
  });

  static atualizarTurma = handle(async (req) => {
    const { nome, professorId } = req.body;
    const usuarioId = req.user?.id;
    return ServiceTurma.atualizarTurma(req.params.id, { nome, professorId, usuarioId });
  });

  static deletarTurma = handle(async (req) => {
    return ServiceTurma.deletarTurma(req.params.id);
  });

  static adicionarAluno = handle(async (req) => {
    const { alunoId } = req.body;
    if (!alunoId) throw new Error("Aluno ID é obrigatório");
    return ServiceTurma.adicionarAluno(req.params.id, alunoId);
  });

  static removerAluno = handle(async (req) => {
    const { alunoId } = req.body;
    if (!alunoId) throw new Error("Aluno ID é obrigatório");
    return ServiceTurma.removerAluno(req.params.id, alunoId);
  });
}