import { Router } from "express";
import { ControllerUsuarios } from "../controller/controllersUsuario.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerUsuarios = Router();

// Rotas públicas
routerUsuarios.post("/usuarios", ControllerUsuarios.criarUsuario);
routerUsuarios.post("/login", ControllerUsuarios.login);

// Rotas protegidas
routerUsuarios.get("/usuarios", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerUsuarios.listarUsuarios
);

routerUsuarios.get("/usuarios/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.permitirProprioOuPerfil(),
  ControllerUsuarios.listarUsuarioPorId
);

routerUsuarios.put("/usuarios/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.permitirProprioOuPerfil(),
  ControllerUsuarios.atualizarUsuario
);

routerUsuarios.delete("/usuarios/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.deletarUsuario
);