import { Router }      from "express";
import { ControllerNota } from "../controller/controllerNota.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerNota = Router();

routerNota.post(  "/notas",                      MiddlewareAutenticacao.autenticar, ControllerNota.criarNota);
routerNota.get(   "/notas",                      ControllerNota.listarNotas);
routerNota.get(   "/notas/:id",                  ControllerNota.obterNotaPorId);
routerNota.get(   "/notas/aluno/:alunoId/media", ControllerNota.mediaAluno);
routerNota.put(   "/notas/:id",                  MiddlewareAutenticacao.autenticar, ControllerNota.atualizarNota);
routerNota.delete("/notas/:id",                  MiddlewareAutenticacao.autenticar, ControllerNota.deletarNota);