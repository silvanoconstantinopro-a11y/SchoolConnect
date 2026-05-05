/**
 * routerAviso.js
 * Rotas para gestão de avisos
 */
import { Router } from "express";
import { ControllerAviso } from "../controller/controllerAviso.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";

export const routerAviso = Router();

const avisoValidation = [
  body('titulo').trim().isLength({ min: 3, max: 200 }).withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('conteudo').trim().isLength({ min: 10 }).withMessage('Conteúdo deve ter pelo menos 10 caracteres'),
  body('imagem').optional().isURL().withMessage('URL da imagem inválida'),
  body('categoria').optional().isIn(['geral', 'academico', 'eventos', 'urgente']).withMessage('Categoria inválida')
];

/**
 * @route POST /api/avisos
 * @desc Criar novo aviso
 * @access Admin, Professor
 */
routerAviso.post("/avisos", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  avisoValidation,
  validate,
  ControllerAviso.criarAviso
);

/**
 * @route GET /api/avisos
 * @desc Listar todos os avisos
 * @access Public (com autenticação opcional)
 */
routerAviso.get("/avisos", 
  ControllerAviso.listarAvisos
);

/**
 * @route GET /api/avisos/recentes
 * @desc Obter avisos recentes
 * @access Public
 */
routerAviso.get("/avisos/recentes", 
  ControllerAviso.obterAvisosRecentes
);

/**
 * @route GET /api/avisos/:id
 * @desc Obter aviso por ID
 * @access Public
 */
routerAviso.get("/avisos/:id", 
  ControllerAviso.obterAvisoPorId
);

/**
 * @route PUT /api/avisos/:id
 * @desc Atualizar aviso
 * @access Admin, Professor (autor)
 */
routerAviso.put("/avisos/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  avisoValidation,
  validate,
  ControllerAviso.atualizarAviso
);

/**
 * @route DELETE /api/avisos/:id
 * @desc Deletar aviso
 * @access Admin
 */
routerAviso.delete("/avisos/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerAviso.deletarAviso
);