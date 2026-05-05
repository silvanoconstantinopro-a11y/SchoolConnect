/**
 * routerStats.js
 * Rotas para estatísticas e métricas do sistema
 */
import { Router } from "express";
import { ControllerStats } from "../controller/controllerStats.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { query, param } from "express-validator";
import { validate } from "../middlewares/validate.js";

const router = Router();

/**
 * @route GET /api/stats
 * @desc Obter estatísticas gerais do sistema
 * @access Admin, Professor
 */
router.get("/stats", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerStats.getStats
);

/**
 * @route GET /api/stats/detalhadas
 * @desc Obter estatísticas detalhadas
 * @access Admin
 */
router.get("/stats/detalhadas", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerStats.getStatsDetalhadas
);

/**
 * @route GET /api/stats/dashboard
 * @desc Obter dados para dashboard
 * @access Admin, Professor
 */
router.get("/stats/dashboard", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerStats.getDashboardData
);

/**
 * @route GET /api/stats/usuarios
 * @desc Listar todos os usuários
 * @access Admin
 */
router.get("/stats/usuarios", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerStats.listarUsuarios
);

/**
 * @route GET /api/stags/usuarios/por-perfil
 * @desc Estatísticas de usuários por perfil
 * @access Admin
 */
router.get("/stats/usuarios/por-perfil", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerStats.getUsuariosPorPerfil
);

/**
 * @route GET /api/stats/cursos
 * @desc Listar todos os cursos
 * @access Public
 */
router.get("/stats/cursos", 
  ControllerStats.listarCursos
);

/**
 * @route GET /api/stats/alunos
 * @desc Listar todos os alunos
 * @access Admin, Professor
 */
router.get("/stats/alunos", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerStats.listarAlunos
);

/**
 * @route GET /api/stats/alunos/por-turma
 * @desc Estatísticas de alunos por turma
 * @access Admin, Professor
 */
router.get("/stats/alunos/por-turma", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerStats.getAlunosPorTurma
);

/**
 * @route GET /api/stats/avisos
 * @desc Listar todos os avisos
 * @access Public
 */
router.get("/stats/avisos", 
  ControllerStats.listarAvisos
);

/**
 * @route GET /api/stats/eventos
 * @desc Listar todos os eventos
 * @access Public
 */
router.get("/stats/eventos", 
  ControllerStats.listarEventos
);

/**
 * @route GET /api/stats/reunioes
 * @desc Listar todas as reuniões
 * @access Authenticated
 */
router.get("/stats/reunioes", 
  MiddlewareAutenticacao.autenticar,
  ControllerStats.listarReunioes
);

/**
 * @route GET /api/stats/turmas
 * @desc Listar todas as turmas
 * @access Public
 */
router.get("/stats/turmas", 
  ControllerStats.listarTurmas
);

/**
 * @route GET /api/stats/turmas/:id/ocupacao
 * @desc Obter ocupação de uma turma específica
 * @access Admin, Professor
 */
router.get("/stats/turmas/:id/ocupacao", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  param('id').isInt({ min: 1 }).withMessage('ID da turma inválido'),
  validate,
  ControllerStats.getOcupacaoTurma
);

/**
 * @route GET /api/stats/notas/medias
 * @desc Obter médias gerais de notas
 * @access Admin, Professor
 */
router.get("/stats/notas/medias", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN", "PROFESSOR"]),
  ControllerStats.getMediasNotas
);

/**
 * @route GET /api/stats/feedbacks
 * @desc Obter estatísticas de feedbacks
 * @access Admin
 */
router.get("/stats/feedbacks", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  ControllerStats.getEstatisticasFeedbacks
);

/**
 * @route GET /api/stats/mensagens/nao-lidas/:usuarioId
 * @desc Obter quantidade de mensagens não lidas
 * @access Authenticated
 */
router.get("/stats/mensagens/nao-lidas/:usuarioId", 
  MiddlewareAutenticacao.autenticar,
  param('usuarioId').isInt({ min: 1 }).withMessage('ID do usuário inválido'),
  validate,
  ControllerStats.getMensagensNaoLidas
);

export default router;