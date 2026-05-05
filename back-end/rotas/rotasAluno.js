import { Router } from "express";
import { ControllerAluno } from "../controller/controllerAluno.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerAluno = Router();

routerAluno.post("/alunos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerAluno.criarAluno
);

routerAluno.get("/alunos",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerAluno.listarAlunos
);

routerAluno.get("/alunos/:id",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerAluno.obterAlunoPorId
);

routerAluno.get("/alunos/matricula/:matricula",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerAluno.obterAlunoPorMatricula
);

routerAluno.get("/alunos/:id/media",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerAluno.mediaAluno
);

routerAluno.put("/alunos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerAluno.atualizarAluno
);

routerAluno.delete("/alunos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerAluno.deletarAluno
);