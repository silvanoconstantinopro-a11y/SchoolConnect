import { Router } from "express";
import { ControllerMensagem } from "../controller/controllerMensagem.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerMensagem = Router();

// Todas as rotas de mensagem requerem autenticação
routerMensagem.use(MiddlewareAutenticacao.autenticar);

routerMensagem.post("/mensagens", ControllerMensagem.criarMensagem);
routerMensagem.get("/mensagens", ControllerMensagem.listarMensagens);
routerMensagem.get("/mensagens/contactos", ControllerMensagem.listarContactos);
routerMensagem.get("/mensagens/:id", ControllerMensagem.obterMensagemPorId);
routerMensagem.put("/mensagens/:id", ControllerMensagem.atualizarMensagem);
routerMensagem.delete("/mensagens/:id", ControllerMensagem.deletarMensagem);
routerMensagem.patch("/mensagens/:id/lida", ControllerMensagem.marcarComoLida);