/**
 * routerCurso.js
 * Rotas para gestão de cursos
 */
import { Router } from "express";
import { ControllerCurso } from "../controller/controllerCurso.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";

export const routerCurso = Router();

const cursoValidation = [
  body('nome').trim().isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('descricao').trim().isLength({ min: 10, max: 500 }).withMessage('Descrição deve ter entre 10 e 500 caracteres'),
  body('cargaHoraria').optional().isInt({ min: 0 }).withMessage('Carga horária inválida'),
  body('duracaoMeses').optional().isInt({ min: 1, max: 60 }).withMessage('Duração inválida'),
  body('nivel').optional().isIn(['iniciante', 'intermediario', 'avancado']).withMessage('Nível inválido')
];

/**
 * @route POST /api/cursos
 * @desc Criar novo curso
 * @access Admin
 */
routerCurso.post("/cursos", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  cursoValidation,
  validate,
  ControllerCurso.criarCurso
);

/**
 * @route GET /api/cursos
 * @desc Listar todos os cursos
 * @access Public
 */
routerCurso.get("/cursos", 
  ControllerCurso.listarCursos
);

/**
 * @route GET /api/cursos-detalhado
 * @desc Listar cursos com disciplinas e professores
 * @access Public
 */
routerCurso.get("/cursos-detalhado", 
  ControllerCurso.listarCursosComDisciplinas
);

/**
 * @route GET /api/cursos/:id
 * @desc Obter curso por ID
 * @access Public
 */
routerCurso.get("/cursos/:id", 
  ControllerCurso.obterCursoPorId
);

/**
 * @route PUT /api/cursos/:id
 * @desc Atualizar curso
 * @access Admin
 */
routerCurso.put("/cursos/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  cursoValidation,
  validate,
  ControllerCurso.atualizarCurso
);

/**
 * @route DELETE /api/cursos/:id
 * @desc Deletar curso
 * @access Admin
 */
routerCurso.delete("/cursos/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerCurso.deletarCurso
);

/**
 * @route GET /api/cursos/:id/disciplinas
 * @desc Obter disciplinas do curso
 * @access Public
 */
routerCurso.get("/cursos/:id/disciplinas", 
  ControllerCurso.obterDisciplinasDoCurso
);