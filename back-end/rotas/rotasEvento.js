import { Router } from "express";
import { ControllerEvento } from "../controller/controllerEvento.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerEvento = Router();

routerEvento.post("/eventos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerEvento.criarEvento
);

routerEvento.get("/eventos", ControllerEvento.listarEventos);
routerEvento.get("/eventos/proximos", ControllerEvento.getProximosEventos);
routerEvento.get("/eventos/:id", ControllerEvento.obterEventoPorId);

routerEvento.put("/eventos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerEvento.atualizarEvento
);

routerEvento.delete("/eventos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerEvento.deletarEvento
);