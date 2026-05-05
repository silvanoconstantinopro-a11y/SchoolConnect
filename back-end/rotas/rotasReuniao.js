/**
 * routerReuniao.js
 * Rotas para gestão de reuniões
 */
import { Router } from "express";
import { ControllerReuniao } from "../controller/controllerReuniao.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body, param, query } from "express-validator";

export const routerReuniao = Router();

// Validações para criação de reunião
const reuniaoValidation = [
  body('titulo').trim().isLength({ min: 3, max: 200 }).withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('local').trim().isLength({ min: 3, max: 200 }).withMessage('Local deve ter entre 3 e 200 caracteres'),
  body('linkMeeting').optional().isURL().withMessage('Link da reunião inválido'),
  body('dataHora').optional().isISO8601().withMessage('Data/Hora inválida'),
  body('descricao').optional().isString().trim(),
  body('participantesIds').isArray({ min: 1 }).withMessage('Selecione pelo menos um participante'),
  body('participantesIds.*').isInt({ min: 1 }).withMessage('ID de participante inválido')
];

// Validações para atualização de reunião
const reuniaoUpdateValidation = [
  body('titulo').optional().trim().isLength({ min: 3, max: 200 }).withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('local').optional().trim().isLength({ min: 3, max: 200 }).withMessage('Local deve ter entre 3 e 200 caracteres'),
  body('linkMeeting').optional().isURL().withMessage('Link da reunião inválido'),
  body('dataHora').optional().isISO8601().withMessage('Data/Hora inválida'),
  body('descricao').optional().isString().trim(),
  body('participantesIds').optional().isArray().withMessage('Participantes deve ser um array'),
  body('participantesIds.*').optional().isInt({ min: 1 }).withMessage('ID de participante inválido')
];

/**
 * @route POST /api/reunioes
 * @desc Criar nova reunião
 * @access Admin, Professor
 */
routerReuniao.post("/reunioes", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  reuniaoValidation,
  validate,
  ControllerReuniao.criarReuniao
);

/**
 * @route GET /api/reunioes
 * @desc Listar reuniões do usuário
 * @access Authenticated
 */
routerReuniao.get("/reunioes", 
  MiddlewareAutenticacao.autenticar,
  ControllerReuniao.listarReunioes
);

/**
 * @route GET /api/reunioes/futuras
 * @desc Listar reuniões futuras
 * @access Authenticated
 */
routerReuniao.get("/reunioes/futuras", 
  MiddlewareAutenticacao.autenticar,
  ControllerReuniao.listarReunioesFuturas
);

/**
 * @route GET /api/reunioes/:id
 * @desc Obter reunião por ID
 * @access Authenticated (participante ou criador)
 */
routerReuniao.get("/reunioes/:id", 
  MiddlewareAutenticacao.autenticar,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerReuniao.obterReuniaoPorId
);

/**
 * @route PUT /api/reunioes/:id
 * @desc Atualizar reunião
 * @access Admin, Professor (criador)
 */
routerReuniao.put("/reunioes/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  reuniaoUpdateValidation,
  validate,
  ControllerReuniao.atualizarReuniao
);

/**
 * @route DELETE /api/reunioes/:id
 * @desc Deletar reunião
 * @access Admin, Professor (criador)
 */
routerReuniao.delete("/reunioes/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerReuniao.deletarReuniao
);

/**
 * @route POST /api/reunioes/:id/confirmar
 * @desc Confirmar participação na reunião
 * @access Authenticated (participante)
 */
routerReuniao.post("/reunioes/:id/confirmar", 
  MiddlewareAutenticacao.autenticar,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  body('status').isIn(['confirmado', 'pendente', 'recusado']).withMessage('Status inválido'),
  validate,
  ControllerReuniao.confirmarParticipacao
);

/**
 * @route GET /api/reunioes/:id/participantes
 * @desc Listar participantes da reunião
 * @access Authenticated (participante ou criador)
 */
routerReuniao.get("/reunioes/:id/participantes", 
  MiddlewareAutenticacao.autenticar,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerReuniao.listarParticipantes
);