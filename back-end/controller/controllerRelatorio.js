import { ServiceRelatorio } from "../service/serviceRelatorio.js";
import { handle } from "./_base.js";

export class ControllerRelatorio {
  static criarRelatorio = handle(async (req) => {
    const { titulo, conteudo } = req.body;
    return ServiceRelatorio.criarRelatorio({ titulo, conteudo });
  }, 201);

  static listarRelatorios = handle(async (req) => {
    const { limit, offset, search } = req.query;
    return ServiceRelatorio.listarRelatorios({ limit, offset, search });
  });

  static obterRelatorioPorId = handle(async (req) => {
    return ServiceRelatorio.obterRelatorioPorId(req.params.id);
  });

  static atualizarRelatorio = handle(async (req) => {
    const { titulo, conteudo } = req.body;
    return ServiceRelatorio.atualizarRelatorio(req.params.id, { titulo, conteudo });
  });

  static deletarRelatorio = handle(async (req) => {
    return ServiceRelatorio.deletarRelatorio(req.params.id);
  });
}