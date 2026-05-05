/**
 * routerEvento.js
 * Rotas para gestão de eventos
 */
import { Router } from "express";
import { ControllerEvento } from "../controller/controllerEvento.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";

export const routerEvento = Router();

const eventoValidation = [
  body('titulo').trim().isLength({ min: 3, max: 200 }).withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('descricao').trim().isLength({ min: 10 }).withMessage('Descrição deve ter pelo menos 10 caracteres'),
  body('dataEvento').optional().isISO8601().withMessage('Data inválida'),
  body('dataFim').optional().isISO8601().withMessage('Data de fim inválida'),
  body('local').optional().isString(),
  body('categoria').optional().isIn(['academico', 'cultural', 'esportivo', 'social', 'outro']).withMessage('Categoria inválida'),
  body('maxParticipantes').optional().isInt({ min: 1 }).withMessage('Número máximo de participantes inválido')
];

/**
 * @route POST /api/eventos
 * @desc Criar novo evento
 * @access Admin, Professor
 */
routerEvento.post("/eventos", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  eventoValidation,
  validate,
  ControllerEvento.criarEvento
);

/**
 * @route GET /api/eventos
 * @desc Listar todos os eventos
 * @access Public
 */
routerEvento.get("/eventos", 
  ControllerEvento.listarEventos
);

/**
 * @route GET /api/eventos/proximos
 * @desc Listar eventos futuros
 * @access Public
 */
routerEvento.get("/eventos/proximos", 
  ControllerEvento.listarEventosProximos
);

/**
 * @route GET /api/eventos/:id
 * @desc Obter evento por ID
 * @access Public
 */
routerEvento.get("/eventos/:id", 
  ControllerEvento.obterEventoPorId
);

/**
 * @route PUT /api/eventos/:id
 * @desc Atualizar evento
 * @access Admin, Professor
 */
routerEvento.put("/eventos/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  eventoValidation,
  validate,
  ControllerEvento.atualizarEvento
);

/**
 * @route DELETE /api/eventos/:id
 * @desc Deletar evento
 * @access Admin
 */
routerEvento.delete("/eventos/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerEvento.deletarEvento
);

/**
 * @route POST /api/eventos/:id/participar
 * @desc Registrar participação em evento
 * @access Authenticated
 */
routerEvento.post("/eventos/:id/participar", 
  MiddlewareAutenticacao.autenticar,
  ControllerEvento.registrarParticipacao
);