import { Router } from "express";
import { ControllerTurma } from "../controller/controllerTurma.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerTurma = Router();

routerTurma.post("/turmas",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerTurma.criarTurma
);

routerTurma.get("/turmas",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerTurma.listarTurmas
);

routerTurma.get("/turmas/:id",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerTurma.obterTurmaPorId
);

routerTurma.put("/turmas/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerTurma.atualizarTurma
);

routerTurma.delete("/turmas/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerTurma.deletarTurma
);