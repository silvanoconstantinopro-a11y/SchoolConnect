/**
 * routerTurma.js
 * Rotas para gestão de turmas
 */
import { Router } from "express";
import { ControllerTurma } from "../controller/controllerTurma.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body, param, query } from "express-validator";

export const routerTurma = Router();

// Validações para criação de turma
const turmaValidation = [
  body('nome').trim().isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('professorId').optional().isInt({ min: 1 }).withMessage('ID do professor inválido'),
  body('usuarioId').optional().isInt({ min: 1 }).withMessage('ID do usuário inválido'),
  body('ano').optional().isInt({ min: 2000, max: new Date().getFullYear() + 5 }).withMessage('Ano inválido'),
  body('semestre').optional().isInt({ min: 1, max: 2 }).withMessage('Semestre deve ser 1 ou 2'),
  body('capacidade').optional().isInt({ min: 1, max: 100 }).withMessage('Capacidade deve ser entre 1 e 100'),
  body('turno').optional().isIn(['matutino', 'vespertino', 'noturno']).withMessage('Turno inválido'),
  body('cursoId').optional().isInt({ min: 1 }).withMessage('ID do curso inválido')
];

// Validações para atualização de turma
const turmaUpdateValidation = [
  body('nome').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('professorId').optional().isInt({ min: 1 }).withMessage('ID do professor inválido'),
  body('ano').optional().isInt({ min: 2000, max: new Date().getFullYear() + 5 }).withMessage('Ano inválido'),
  body('semestre').optional().isInt({ min: 1, max: 2 }).withMessage('Semestre deve ser 1 ou 2'),
  body('capacidade').optional().isInt({ min: 1, max: 100 }).withMessage('Capacidade deve ser entre 1 e 100'),
  body('turno').optional().isIn(['matutino', 'vespertino', 'noturno']).withMessage('Turno inválido')
];

/**
 * @route POST /api/turmas
 * @desc Criar nova turma
 * @access Admin
 */
routerTurma.post("/turmas", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  turmaValidation,
  validate,
  ControllerTurma.criarTurma
);

/**
 * @route GET /api/turmas
 * @desc Listar todas as turmas
 * @access Public
 */
routerTurma.get("/turmas", 
  ControllerTurma.listarTurmas
);

/**
 * @route GET /api/turmas/disponiveis
 * @desc Listar turmas disponíveis para matrícula
 * @access Public
 */
routerTurma.get("/turmas/disponiveis", 
  query('ano').optional().isInt(),
  query('semestre').optional().isInt({ min: 1, max: 2 }),
  validate,
  ControllerTurma.listarTurmasDisponiveis
);

/**
 * @route GET /api/turmas/:id
 * @desc Obter turma por ID
 * @access Public
 */
routerTurma.get("/turmas/:id", 
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerTurma.obterTurmaPorId
);

/**
 * @route PUT /api/turmas/:id
 * @desc Atualizar turma
 * @access Admin
 */
routerTurma.put("/turmas/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  turmaUpdateValidation,
  validate,
  ControllerTurma.atualizarTurma
);

/**
 * @route DELETE /api/turmas/:id
 * @desc Deletar turma
 * @access Admin
 */
routerTurma.delete("/turmas/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerTurma.deletarTurma
);

/**
 * @route POST /api/turmas/:id/alunos/:alunoId
 * @desc Adicionar aluno à turma
 * @access Admin, Professor
 */
routerTurma.post("/turmas/:id/alunos/:alunoId", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID da turma inválido'),
  param('alunoId').isInt({ min: 1 }).withMessage('ID do aluno inválido'),
  validate,
  ControllerTurma.adicionarAluno
);

/**
 * @route DELETE /api/turmas/:id/alunos/:alunoId
 * @desc Remover aluno da turma
 * @access Admin, Professor
 */
routerTurma.delete("/turmas/:id/alunos/:alunoId", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID da turma inválido'),
  param('alunoId').isInt({ min: 1 }).withMessage('ID do aluno inválido'),
  validate,
  ControllerTurma.removerAluno
);

/**
 * @route GET /api/turmas/:id/alunos
 * @desc Listar alunos da turma
 * @access Public
 */
routerTurma.get("/turmas/:id/alunos", 
  param('id').isInt({ min: 1 }).withMessage('ID da turma inválido'),
  validate,
  ControllerTurma.listarAlunosDaTurma
);

/**
 * @route GET /api/turmas/estatisticas
 * @desc Obter estatísticas das turmas
 * @access Admin, Professor
 */
routerTurma.get("/turmas/estatisticas", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerTurma.getEstatisticas
);