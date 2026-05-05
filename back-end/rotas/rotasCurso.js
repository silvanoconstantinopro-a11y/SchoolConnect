import { Router } from "express";
import { ControllerCurso } from "../controller/controllerCurso.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerCurso = Router();

routerCurso.post("/cursos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerCurso.criarCurso
);

routerCurso.get("/cursos", ControllerCurso.listarCursos);
routerCurso.get("/cursos-detalhado", ControllerCurso.listarCursosComDisciplinas);
routerCurso.get("/cursos/:id", ControllerCurso.obterCursoPorId);

routerCurso.put("/cursos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerCurso.atualizarCurso
);

routerCurso.delete("/cursos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerCurso.deletarCurso
);

routerCurso.post("/cursos/:id/professores",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerCurso.adicionarProfessor
);

routerCurso.delete("/cursos/:id/professores/:professorId",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerCurso.removerProfessor
);