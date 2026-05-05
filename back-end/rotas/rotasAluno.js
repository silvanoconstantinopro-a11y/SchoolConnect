/**
 * routerAluno.js
 * Rotas para gestão de alunos
 */
import { Router } from "express";
import { ControllerAluno } from "../controller/controllerAluno.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";

export const routerAluno = Router();

// Validações para criação/atualização de alunos
const alunoValidation = [
  body('nome').trim().isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('matricula').trim().notEmpty().withMessage('Matrícula é obrigatória'),
  body('turmaId').isInt({ min: 1 }).withMessage('Turma inválida'),
  body('cursoId').isInt({ min: 1 }).withMessage('Curso inválido'),
  body('telefone').optional().isMobilePhone('any').withMessage('Telefone inválido'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('classe').optional().isString().withMessage('Classe inválida')
];

/**
 * @route POST /api/alunos
 * @desc Criar novo aluno
 * @access Admin, Professor
 */
routerAluno.post("/alunos", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  alunoValidation,
  validate,
  ControllerAluno.criarAluno
);

/**
 * @route GET /api/alunos
 * @desc Listar todos os alunos
 * @access Admin, Professor, Encarregado
 */
routerAluno.get("/alunos", 
  MiddlewareAutenticacao.autenticar,
  ControllerAluno.listarAlunos
);

/**
 * @route GET /api/alunos/:id
 * @desc Obter aluno por ID
 * @access Admin, Professor, Encarregado (próprio)
 */
routerAluno.get("/alunos/:id", 
  MiddlewareAutenticacao.autenticar,
  ControllerAluno.obterAlunoPorId
);

/**
 * @route PUT /api/alunos/:id
 * @desc Atualizar aluno
 * @access Admin, Professor
 */
routerAluno.put("/alunos/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  alunoValidation,
  validate,
  ControllerAluno.atualizarAluno
);

/**
 * @route DELETE /api/alunos/:id
 * @desc Deletar aluno
 * @access Admin
 */
routerAluno.delete("/alunos/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerAluno.deletarAluno
);

/**
 * @route GET /api/alunos/:id/notas
 * @desc Obter notas do aluno
 * @access Admin, Professor, Encarregado (próprio)
 */
routerAluno.get("/alunos/:id/notas", 
  MiddlewareAutenticacao.autenticar,
  ControllerAluno.obterNotasAluno
);

/**
 * @route GET /api/alunos/:id/horario
 * @desc Obter horário do aluno
 * @access Admin, Professor, Encarregado (próprio)
 */
routerAluno.get("/alunos/:id/horario", 
  MiddlewareAutenticacao.autenticar,
  ControllerAluno.obterHorarioAluno
);