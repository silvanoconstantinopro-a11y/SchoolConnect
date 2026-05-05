import { ServiceStats } from "../service/serviceStats.js";
import { handle } from "./_base.js";

export class ControllerStats {
  static getStats = handle(async () => {
    return ServiceStats.getStats();
  });

  static getStatsPorPeriodo = handle(async (req) => {
    const { inicio, fim } = req.query;
    if (!inicio || !fim) {
      throw new Error("Parâmetros 'inicio' e 'fim' são obrigatórios");
    }
    return ServiceStats.getStatsPorPeriodo(inicio, fim);
  });

  static getDashboardData = handle(async () => {
    return ServiceStats.getDashboardData();
  });

  static listarUsuarios = handle(async () => {
    return ServiceStats.listarUsuarios();
  });

  static listarCursos = handle(async () => {
    return ServiceStats.listarCursos();
  });

  static listarAlunos = handle(async () => {
    return ServiceStats.listarAlunos();
  });

  static listarAvisos = handle(async () => {
    return ServiceStats.listarAvisos();
  });

  static listarEventos = handle(async () => {
    return ServiceStats.listarEventos();
  });

  static listarReunioes = handle(async () => {
    return ServiceStats.listarReunioes();
  });

  static listarTurmas = handle(async () => {
    return ServiceStats.listarTurmas();
  });
}