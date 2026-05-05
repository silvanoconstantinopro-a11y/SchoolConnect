import { Router } from "express";
import { ControllerNota } from "../controller/controllerNota.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerNota = Router();

routerNota.post("/notas",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerNota.criarNota
);

routerNota.get("/notas",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerNota.listarNotas
);

routerNota.get("/notas/:id",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerNota.obterNotaPorId
);

routerNota.get("/notas/aluno/:alunoId/media",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerNota.mediaAluno
);

routerNota.put("/notas/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerNota.atualizarNota
);

routerNota.delete("/notas/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerNota.deletarNota
);