/**
 * routerDisciplina.js
 * Rotas para gestão de disciplinas
 */
import { Router } from "express";
import { ControllerDisciplina } from "../controller/controllerDisciplina.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";

export const routerDisciplina = Router();

const disciplinaValidation = [
  body('nome').trim().isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('cursoId').isInt({ min: 1 }).withMessage('Curso inválido'),
  body('descricao').optional().isString(),
  body('codigo').optional().isString().isLength({ max: 20 }),
  body('cargaHoraria').optional().isInt({ min: 0 }),
  body('semestre').optional().isInt({ min: 1, max: 8 })
];

/**
 * @route POST /api/disciplinas
 * @desc Criar nova disciplina
 * @access Admin
 */
routerDisciplina.post("/disciplinas", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  disciplinaValidation,
  validate,
  ControllerDisciplina.criarDisciplina
);

/**
 * @route GET /api/disciplinas
 * @desc Listar todas as disciplinas
 * @access Public
 */
routerDisciplina.get("/disciplinas", 
  ControllerDisciplina.listarDisciplinas
);

/**
 * @route GET /api/disciplinas/:id
 * @desc Obter disciplina por ID
 * @access Public
 */
routerDisciplina.get("/disciplinas/:id", 
  ControllerDisciplina.obterDisciplinaPorId
);

/**
 * @route PUT /api/disciplinas/:id
 * @desc Atualizar disciplina
 * @access Admin
 */
routerDisciplina.put("/disciplinas/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  disciplinaValidation,
  validate,
  ControllerDisciplina.atualizarDisciplina
);

/**
 * @route DELETE /api/disciplinas/:id
 * @desc Deletar disciplina
 * @access Admin
 */
routerDisciplina.delete("/disciplinas/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerDisciplina.deletarDisciplina
);

/**
 * @route GET /api/disciplinas/:id/alunos
 * @desc Obter alunos matriculados na disciplina
 * @access Admin, Professor
 */
routerDisciplina.get("/disciplinas/:id/alunos", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerDisciplina.obterAlunosDaDisciplina
);