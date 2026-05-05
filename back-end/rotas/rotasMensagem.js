/**
 * routerMensagem.js
 * Rotas para gestão de mensagens
 */
import { Router } from "express";
import { ControllerMensagem } from "../controller/controllerMensagem.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { upload } from "../middlewares/upload.js";
import { validate } from "../middlewares/validate.js";
import { body, param } from "express-validator";

export const routerMensagem = Router();

const mensagemValidation = [
  body('destinatarioId').isInt({ min: 1 }).withMessage('Destinatário inválido'),
  body('conteudo').optional().isString().trim(),
  body().custom((value, { req }) => {
    if (!req.body.conteudo && !req.file) {
      throw new Error('Mensagem deve ter texto ou arquivo');
    }
    return true;
  })
];

const mensagemUpdateValidation = [
  body('conteudo').notEmpty().withMessage('Conteúdo é obrigatório')
];

/**
 * @route POST /api/mensagens
 * @desc Enviar nova mensagem
 * @access Authenticated
 */
routerMensagem.post("/mensagens", 
  MiddlewareAutenticacao.autenticar,
  upload.single("arquivo"),
  mensagemValidation,
  validate,
  ControllerMensagem.criarMensagem
);

/**
 * @route GET /api/mensagens
 * @desc Listar mensagens do usuário
 * @access Authenticated
 */
routerMensagem.get("/mensagens", 
  MiddlewareAutenticacao.autenticar,
  ControllerMensagem.listarMensagens
);

/**
 * @route GET /api/mensagens/conversas
 * @desc Listar conversas do usuário
 * @access Authenticated
 */
routerMensagem.get("/mensagens/conversas", 
  MiddlewareAutenticacao.autenticar,
  ControllerMensagem.listarConversas
);

/**
 * @route GET /api/mensagens/nao-lidas
 * @desc Obter quantidade de mensagens não lidas
 * @access Authenticated
 */
routerMensagem.get("/mensagens/nao-lidas", 
  MiddlewareAutenticacao.autenticar,
  ControllerMensagem.obterNaoLidas
);

/**
 * @route GET /api/mensagens/:id
 * @desc Obter mensagem por ID
 * @access Authenticated
 */
routerMensagem.get("/mensagens/:id", 
  MiddlewareAutenticacao.autenticar,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerMensagem.obterMensagemPorId
);

/**
 * @route PUT /api/mensagens/:id
 * @desc Atualizar mensagem
 * @access Authenticated (apenas remetente)
 */
routerMensagem.put("/mensagens/:id", 
  MiddlewareAutenticacao.autenticar,
  mensagemUpdateValidation,
  validate,
  ControllerMensagem.atualizarMensagem
);

/**
 * @route DELETE /api/mensagens/:id
 * @desc Deletar mensagem
 * @access Authenticated
 */
routerMensagem.delete("/mensagens/:id", 
  MiddlewareAutenticacao.autenticar,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  ControllerMensagem.deletarMensagem
);

/**
 * @route DELETE /api/mensagens/:id/for-all
 * @desc Deletar mensagem para todos (apenas remetente)
 * @access Authenticated
 */
routerMensagem.delete("/mensagens/:id/for-all", 
  MiddlewareAutenticacao.autenticar,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
  (req, res, next) => {
    req.query.tipo = "para_todos";
    next();
  },
  ControllerMensagem.deletarMensagem
);