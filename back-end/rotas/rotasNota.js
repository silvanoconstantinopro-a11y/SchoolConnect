/**
 * routerNota.js
 * Rotas para gestão de notas escolares
 */
import { Router } from "express";
import { ControllerNota } from "../controller/controllerNota.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body, param } from "express-validator";

export const routerNota = Router();

// Validações para criação de nota
const notaValidation = [
  body('valor').isFloat({ min: 0, max: 20 }).withMessage('Nota deve estar entre 0 e 20'),
  body('tipo').isIn(['PROVA', 'TRABALHO', 'RECUPERACAO', 'EXAME', 'ATIVIDADE']).withMessage('Tipo de nota inválido'),
  body('alunoId').isInt({ min: 1 }).withMessage('Aluno inválido'),
  body('disciplinaId').isInt({ min: 1 }).withMessage('Disciplina inválida'),
  body('semestre').optional().isInt({ min: 1, max: 8 }).withMessage('Semestre inválido'),
  body('observacao').optional().isString().trim()
];

// Validações para atualização de nota
const notaUpdateValidation = [
  body('valor').optional().isFloat({ min: 0, max: 20 }).withMessage('Nota deve estar entre 0 e 20'),
  body('tipo').optional().isIn(['PROVA', 'TRABALHO', 'RECUPERACAO', 'EXAME', 'ATIVIDADE']).withMessage('Tipo de nota inválido'),
  body('observacao').optional().isString().trim()
];

/**
 * @route POST /api/notas
 * @desc Criar nova nota
 * @access Admin, Professor
 */
routerNota.post("/notas", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  notaValidation,
  validate,
  ControllerNota.criarNota
);

/**
 * @route GET /api/notas
 * @desc Listar todas as notas
 * @access Admin, Professor
 */
routerNota.get("/notas", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerNota.listarNotas
);

/**
 * @route GET /api/notas/aluno/:alunoId
 * @desc Listar notas de um aluno específico
 * @access Admin, Professor, Encarregado (próprio)
 */
routerNota.get("/notas/aluno/:alunoId", 
  MiddlewareAutenticacao.autenticar,
  param('alunoId').isInt({ min: 1 }).withMessage('ID do aluno inválido'),
  validate,
  ControllerNota.obterNotasPorAluno
);

/**
 * @route GET /api/notas/disciplina/:disciplinaId
 * @desc Listar notas de uma disciplina específica
 * @access Admin, Professor
 */
routerNota.get("/notas/disciplina/:disciplinaId", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('disciplinaId').isInt({ min: 1 }).withMessage('ID da disciplina inválido'),
  validate,
  ControllerNota.listarNotasPorDisciplina
);

/**
 * @route GET /api/notas/:id
 * @desc Obter nota por ID
 * @access Admin, Professor
 */
routerNota.get("/notas/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerNota.obterNotaPorId
);

/**
 * @route PUT /api/notas/:id
 * @desc Atualizar nota
 * @access Admin, Professor
 */
routerNota.put("/notas/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  notaUpdateValidation,
  validate,
  ControllerNota.atualizarNota
);

/**
 * @route DELETE /api/notas/:id
 * @desc Deletar nota
 * @access Admin
 */
routerNota.delete("/notas/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerNota.deletarNota
);

/**
 * @route GET /api/notas/aluno/:alunoId/media
 * @desc Calcular média do aluno
 * @access Admin, Professor, Encarregado (próprio)
 */
routerNota.get("/notas/aluno/:alunoId/media", 
  MiddlewareAutenticacao.autenticar,
  param('alunoId').isInt({ min: 1 }).withMessage('ID do aluno inválido'),
  validate,
  ControllerNota.calcularMediaAluno
);

/**
 * @route GET /api/notas/estatisticas
 * @desc Obter estatísticas de notas
 * @access Admin, Professor
 */
routerNota.get("/notas/estatisticas", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerNota.obterEstatisticas
);