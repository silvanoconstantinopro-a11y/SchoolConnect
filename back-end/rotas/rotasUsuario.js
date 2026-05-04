import { Router }            from "express";
import { ControllerUsuarios } from "../controller/controllersUsuario.js";

export const routerUsuarios = Router();

routerUsuarios.post(  "/usuarios",     ControllerUsuarios.criarUsuario);
routerUsuarios.post(  "/login",        ControllerUsuarios.login);
routerUsuarios.get(   "/usuarios",     ControllerUsuarios.listarUsuarios);
routerUsuarios.get(   "/usuarios/:id", ControllerUsuarios.listarUsuarioPorId);
routerUsuarios.put(   "/usuarios/:id", ControllerUsuarios.atualizarUsuario);
routerUsuarios.delete("/usuarios/:id", ControllerUsuarios.deletarUsuario);