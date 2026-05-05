import { Router } from "express";
import { ControllerDisciplina } from "../controller/controllerDisciplina.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerDisciplina = Router();

routerDisciplina.post("/disciplinas",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerDisciplina.criarDisciplina
);

routerDisciplina.get("/disciplinas", ControllerDisciplina.listarDisciplinas);
routerDisciplina.get("/disciplinas/:id", ControllerDisciplina.obterDisciplinaPorId);
routerDisciplina.get("/professor/:professorId/disciplinas", ControllerDisciplina.getDisciplinasPorProfessor);

routerDisciplina.put("/disciplinas/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerDisciplina.atualizarDisciplina
);

routerDisciplina.delete("/disciplinas/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerDisciplina.deletarDisciplina
);

routerDisciplina.post("/disciplinas/:id/professores",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerDisciplina.adicionarProfessor
);

routerDisciplina.delete("/disciplinas/:id/professores/:professorId",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerDisciplina.removerProfessor
);