/**
 * routerAdmin.js
 * Rotas para administração do sistema
 */
import { Router } from "express";
import { JWT } from "../bcrypt-jwt/jwt.js";
import { ControllerUsuarios } from "../controller/controllersUsuario.js";
import { rateLimit } from "express-rate-limit";
import { logger } from "../utils/logger.js";

export const routerAdmin = Router();

// Rate limiting para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: { error: "Muitas tentativas de login. Tente novamente mais tarde." }
});

/**
 * @route POST /api/admin/login
 * @desc Login do administrador
 * @access Public
 */
routerAdmin.post("/admin/login", loginLimiter, async (req, res) => {
  try {
    const { utilizador, senha } = req.body;
    
    // Validação de entrada
    if (!utilizador || typeof utilizador !== 'string' || !utilizador.trim()) {
      return res.status(400).json({ error: "Utilizador é obrigatório" });
    }
    
    if (!senha || typeof senha !== 'string') {
      return res.status(400).json({ error: "Senha é obrigatória" });
    }
    
    // Verificar credenciais
    const adminUser = process.env.ADMIN_USER || "admin";
    const adminSenha = process.env.ADMIN_SENHA || "schoolconnect2026";
    
    if (utilizador.trim() !== adminUser || senha !== adminSenha) {
      logger.warn(`Tentativa de login admin falhou: ${utilizador}`);
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    
    // Gerar token JWT
    const token = JWT.gerarToken({ 
      id: 0, 
      perfil: "ADMIN", 
      utilizador: utilizador.trim(),
      role: "admin"
    });
    
    logger.info(`Login admin realizado: ${utilizador}`);
    
    return res.json({ 
      token,
      admin: {
        nome: "Administrador",
        perfil: "ADMIN",
        email: process.env.ADMIN_EMAIL || "admin@schoolconnect.com"
      }
    });
    
  } catch (error) {
    logger.error(`Erro no login admin: ${error.message}`);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

/**
 * @route POST /api/admin/codigos
 * @desc Criar código de verificação para professor
 * @access Admin
 */
routerAdmin.post("/admin/codigos", async (req, res, next) => {
  try {
    await ControllerUsuarios.criarCodigoProfessor(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/admin/codigos
 * @desc Listar todos os códigos de professor
 * @access Admin
 */
routerAdmin.get("/admin/codigos", async (req, res, next) => {
  try {
    await ControllerUsuarios.listarCodigosProfessor(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/admin/codigos/:codigo
 * @desc Remover código de professor
 * @access Admin
 */
routerAdmin.delete("/admin/codigos/:codigo", async (req, res, next) => {
  try {
    const { codigo } = req.params;
    await ControllerUsuarios.removerCodigoProfessor(codigo, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/admin/stats
 * @desc Obter estatísticas do sistema
 * @access Admin
 */
routerAdmin.get("/admin/stats", async (req, res, next) => {
  try {
    const stats = await ControllerUsuarios.obterEstatisticas();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});