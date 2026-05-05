/**
 * routerRelatorio.js
 * Rotas para gestão de relatórios
 */
import { Router } from "express";
import { ControllerRelatorio } from "../controller/controllerRelatorio.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body, param } from "express-validator";

export const routerRelatorio = Router();

// Validações para criação de relatório
const relatorioValidation = [
  body('titulo').trim().isLength({ min: 3, max: 200 }).withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('conteudo').trim().isLength({ min: 10 }).withMessage('Conteúdo deve ter pelo menos 10 caracteres'),
  body('tipo').optional().isIn(['academico', 'financeiro', 'administrativo', 'geral']).withMessage('Tipo de relatório inválido'),
  body('dataReferencia').optional().isISO8601().withMessage('Data de referência inválida')
];

// Validações para atualização de relatório
const relatorioUpdateValidation = [
  body('titulo').optional().trim().isLength({ min: 3, max: 200 }).withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('conteudo').optional().trim().isLength({ min: 10 }).withMessage('Conteúdo deve ter pelo menos 10 caracteres'),
  body('tipo').optional().isIn(['academico', 'financeiro', 'administrativo', 'geral']).withMessage('Tipo de relatório inválido')
];

/**
 * @route POST /api/relatorios
 * @desc Criar novo relatório
 * @access Admin, Professor
 */
routerRelatorio.post("/relatorios", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  relatorioValidation,
  validate,
  ControllerRelatorio.criarRelatorio
);

/**
 * @route GET /api/relatorios
 * @desc Listar todos os relatórios
 * @access Admin, Professor
 */
routerRelatorio.get("/relatorios", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerRelatorio.listarRelatorios
);

/**
 * @route GET /api/relatorios/:id
 * @desc Obter relatório por ID
 * @access Admin, Professor
 */
routerRelatorio.get("/relatorios/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerRelatorio.obterRelatorioPorId
);

/**
 * @route PUT /api/relatorios/:id
 * @desc Atualizar relatório
 * @access Admin, Professor (autor)
 */
routerRelatorio.put("/relatorios/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  relatorioUpdateValidation,
  validate,
  ControllerRelatorio.atualizarRelatorio
);

/**
 * @route DELETE /api/relatorios/:id
 * @desc Deletar relatório
 * @access Admin
 */
routerRelatorio.delete("/relatorios/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerRelatorio.deletarRelatorio
);

/**
 * @route GET /api/relatorios/academico/turma/:turmaId
 * @desc Gerar relatório acadêmico por turma
 * @access Admin, Professor
 */
routerRelatorio.get("/relatorios/academico/turma/:turmaId", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('turmaId').isInt({ min: 1 }).withMessage('ID da turma inválido'),
  validate,
  ControllerRelatorio.gerarRelatorioAcademicoTurma
);

/**
 * @route GET /api/relatorios/academico/aluno/:alunoId
 * @desc Gerar relatório acadêmico por aluno
 * @access Admin, Professor, Encarregado (próprio)
 */
routerRelatorio.get("/relatorios/academico/aluno/:alunoId", 
  MiddlewareAutenticacao.autenticar,
  param('alunoId').isInt({ min: 1 }).withMessage('ID do aluno inválido'),
  validate,
  ControllerRelatorio.gerarRelatorioAcademicoAluno
);

/**
 * @route POST /api/relatorios/exportar/:id
 * @desc Exportar relatório em diferentes formatos
 * @access Admin, Professor
 */
routerRelatorio.post("/relatorios/exportar/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  body('formato').isIn(['pdf', 'csv', 'json']).withMessage('Formato inválido'),
  validate,
  ControllerRelatorio.exportarRelatorio
);