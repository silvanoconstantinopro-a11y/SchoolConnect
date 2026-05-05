/**
 * routerUsuarios.js
 * Rotas para gestão de usuários
 */
import { Router } from "express";
import { ControllerUsuarios } from "../controller/controllersUsuario.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { validate } from "../middlewares/validate.js";
import { body, param, query } from "express-validator";
import { rateLimit } from "express-rate-limit";

export const routerUsuarios = Router();

// Rate limiting para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Muitas tentativas de login. Tente novamente mais tarde." }
});

// Validações para criação de usuário
const usuarioValidation = [
  body('nome').trim().isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
  body('perfil').isIn(['ADMIN', 'PROFESSOR', 'ENCARREGADO']).withMessage('Perfil inválido'),
  body('relacaoEducando').if(body('perfil').equals('ENCARREGADO')).notEmpty().withMessage('Relação com educando é obrigatória'),
  body('numeroMatricula').if(body('perfil').equals('ENCARREGADO')).notEmpty().withMessage('Matrícula do aluno é obrigatória'),
  body('codigoVerificacao').if(body('perfil').equals('PROFESSOR')).notEmpty().withMessage('Código de verificação é obrigatório')
];

// Validações para atualização de usuário
const usuarioUpdateValidation = [
  body('nome').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('senha').optional().isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('telefone').optional().notEmpty().withMessage('Telefone é obrigatório'),
  body('perfil').optional().isIn(['ADMIN', 'PROFESSOR', 'ENCARREGADO']).withMessage('Perfil inválido')
];

// Validações para login
const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória')
];

/**
 * @route POST /api/usuarios
 * @desc Criar novo usuário
 * @access Admin
 */
routerUsuarios.post("/usuarios", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  usuarioValidation,
  validate,
  ControllerUsuarios.criarUsuario
);

/**
 * @route POST /api/login
 * @desc Login de usuário
 * @access Public
 */
routerUsuarios.post("/login", 
  loginLimiter,
  loginValidation,
  validate,
  ControllerUsuarios.login
);

/**
 * @route POST /api/logout
 * @desc Logout de usuário
 * @access Authenticated
 */
routerUsuarios.post("/logout", 
  MiddlewareAutenticacao.autenticar,
  ControllerUsuarios.logout
);

/**
 * @route GET /api/usuarios
 * @desc Listar todos os usuários
 * @access Admin
 */
routerUsuarios.get("/usuarios", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  query('perfil').optional().isString(),
  query('search').optional().isString(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('offset').optional().isInt({ min: 0 }),
  validate,
  ControllerUsuarios.listarUsuarios
);

/**
 * @route GET /api/usuarios/perfil
 * @desc Obter perfil do usuário autenticado
 * @access Authenticated
 */
routerUsuarios.get("/usuarios/perfil", 
  MiddlewareAutenticacao.autenticar,
  ControllerUsuarios.obterPerfil
);

/**
 * @route PUT /api/usuarios/perfil
 * @desc Atualizar perfil do usuário autenticado
 * @access Authenticated
 */
routerUsuarios.put("/usuarios/perfil", 
  MiddlewareAutenticacao.autenticar,
  usuarioUpdateValidation,
  validate,
  ControllerUsuarios.atualizarPerfil
);

/**
 * @route PUT /api/usuarios/perfil/senha
 * @desc Alterar senha do usuário autenticado
 * @access Authenticated
 */
routerUsuarios.put("/usuarios/perfil/senha", 
  MiddlewareAutenticacao.autenticar,
  body('senhaAtual').notEmpty().withMessage('Senha atual é obrigatória'),
  body('novaSenha').isLength({ min: 6 }).withMessage('Nova senha deve ter pelo menos 6 caracteres'),
  validate,
  ControllerUsuarios.alterarSenha
);

/**
 * @route GET /api/usuarios/:id
 * @desc Obter usuário por ID
 * @access Admin
 */
routerUsuarios.get("/usuarios/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerUsuarios.listarUsuarioPorId
);

/**
 * @route PUT /api/usuarios/:id
 * @desc Atualizar usuário
 * @access Admin
 */
routerUsuarios.put("/usuarios/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  usuarioUpdateValidation,
  validate,
  ControllerUsuarios.atualizarUsuario
);

/**
 * @route DELETE /api/usuarios/:id
 * @desc Deletar usuário
 * @access Admin
 */
routerUsuarios.delete("/usuarios/:id", 
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.autorizar(["ADMIN"]),
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerUsuarios.deletarUsuario
);

/**
 * @route POST /api/usuarios/recuperar-senha
 * @desc Solicitar recuperação de senha
 * @access Public
 */
routerUsuarios.post("/usuarios/recuperar-senha", 
  body('email').isEmail().withMessage('Email inválido'),
  validate,
  ControllerUsuarios.recuperarSenha
);

/**
 * @route POST /api/usuarios/resetar-senha
 * @desc Resetar senha com token
 * @access Public
 */
routerUsuarios.post("/usuarios/resetar-senha", 
  body('token').notEmpty().withMessage('Token é obrigatório'),
  body('novaSenha').isLength({ min: 6 }).withMessage('Nova senha deve ter pelo menos 6 caracteres'),
  validate,
  ControllerUsuarios.resetarSenha
);