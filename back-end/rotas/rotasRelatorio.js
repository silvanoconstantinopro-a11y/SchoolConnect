import { Router } from "express";
import { ControllerRelatorio } from "../controller/controllerRelatorio.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerRelatorio = Router();

routerRelatorio.post("/relatorios",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerRelatorio.criarRelatorio
);

routerRelatorio.get("/relatorios",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerRelatorio.listarRelatorios
);

routerRelatorio.get("/relatorios/:id",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerRelatorio.obterRelatorioPorId
);

routerRelatorio.put("/relatorios/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerRelatorio.atualizarRelatorio
);

routerRelatorio.delete("/relatorios/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerRelatorio.deletarRelatorio
);