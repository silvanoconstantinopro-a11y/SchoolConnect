import { Router } from "express";
import { ControllerAviso } from "../controller/controllerAviso.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerAviso = Router();

routerAviso.post("/avisos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerAviso.criarAviso
);

routerAviso.get("/avisos", ControllerAviso.listarAvisos);
routerAviso.get("/avisos/ultimos", ControllerAviso.getUltimosAvisos);
routerAviso.get("/avisos/:id", ControllerAviso.obterAvisoPorId);

routerAviso.put("/avisos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerAviso.atualizarAviso
);

routerAviso.delete("/avisos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerAviso.deletarAviso
);