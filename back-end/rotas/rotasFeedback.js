/**
 * routerFeedback.js
 * Rotas para gestão de feedbacks
 */
import { Router } from "express";
import controllerFeedback from "../controller/controllerFeedback.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";

const router = Router();

const feedbackValidation = [
  body('nome').trim().isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('assunto').trim().isLength({ min: 3, max: 200 }).withMessage('Assunto deve ter entre 3 e 200 caracteres'),
  body('mensagem').trim().isLength({ min: 10, max: 2000 }).withMessage('Mensagem deve ter entre 10 e 2000 caracteres'),
  body('avaliacao').optional().isInt({ min: 1, max: 5 }).withMessage('Avaliação deve ser entre 1 e 5')
];

/**
 * @route POST /api/feedbacks
 * @desc Criar novo feedback
 * @access Public
 */
router.post("/", 
  feedbackValidation,
  validate,
  controllerFeedback.criarFeedback
);

/**
 * @route GET /api/feedbacks
 * @desc Listar todos os feedbacks
 * @access Admin
 */
router.get("/", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  controllerFeedback.listarFeedbacks
);

/**
 * @route GET /api/feedbacks/:id
 * @desc Obter feedback por ID
 * @access Admin
 */
router.get("/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  controllerFeedback.obterFeedbackPorId
);

/**
 * @route PUT /api/feedbacks/:id/status
 * @desc Atualizar status do feedback
 * @access Admin
 */
router.put("/:id/status", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  body('status').isIn(['pendente', 'lido', 'respondido', 'arquivado']).withMessage('Status inválido'),
  body('resposta').optional().isString(),
  validate,
  controllerFeedback.atualizarStatus
);

/**
 * @route DELETE /api/feedbacks/:id
 * @desc Remover feedback
 * @access Admin
 */
router.delete("/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  controllerFeedback.removerFeedback
);

/**
 * @route GET /api/feedbacks/stats
 * @desc Obter estatísticas de feedbacks
 * @access Admin
 */
router.get("/stats", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  controllerFeedback.obterEstatisticas
);

export default router;