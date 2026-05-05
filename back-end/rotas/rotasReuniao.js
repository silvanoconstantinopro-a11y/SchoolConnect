import { Router } from "express";
import { ControllerReuniao } from "../controller/controllerReuniao.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerReuniao = Router();

routerReuniao.post("/reunioes",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerReuniao.criarReuniao
);

routerReuniao.get("/reunioes",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerReuniao.listarReunioes
);

routerReuniao.get("/reunioes/minhas",
  MiddlewareAutenticacao.autenticar,
  ControllerReuniao.minhasReunioes
);

routerReuniao.get("/reunioes/:id",
  MiddlewareAutenticacao.autenticarOpcional,
  ControllerReuniao.obterReuniaoPorId
);

routerReuniao.put("/reunioes/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerReuniao.atualizarReuniao
);

routerReuniao.delete("/reunioes/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerReuniao.deletarReuniao
);

routerReuniao.post("/reunioes/:id/participantes",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerReuniao.adicionarParticipante
);

routerReuniao.delete("/reunioes/:id/participantes/:usuarioId",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerReuniao.removerParticipante
);