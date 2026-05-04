import { ServiceStats } from "../service/serviceStats.js";
import { handle }        from "./_base.js";

export class ControllerStats {
  static getStats      = handle(async () => ServiceStats.getStats());
  static listarUsuarios = handle(async () => ServiceStats.listarUsuarios());
  static listarCursos   = handle(async () => ServiceStats.listarCursos());
  static listarAlunos   = handle(async () => ServiceStats.listarAlunos());
  static listarAvisos   = handle(async () => ServiceStats.listarAvisos());
  static listarEventos  = handle(async () => ServiceStats.listarEventos());
  static listarReunioes = handle(async () => ServiceStats.listarReunioes());
  static listarTurmas   = handle(async () => ServiceStats.listarTurmas());
}