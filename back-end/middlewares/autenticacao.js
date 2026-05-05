/**
 * middlewareAutenticacao.js
 * Middleware para autenticação e autorização de usuários
 */
import { JWT } from "../bcrypt-jwt/jwt.js";
import { logger } from "../utils/logger.js";

export class MiddlewareAutenticacao {
  /**
   * Middleware de autenticação - verifica token JWT
   */
  static autenticar(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.warn(`Tentativa de acesso sem token: ${req.method} ${req.path}`);
        return res.status(401).json({ 
          error: "Token não fornecido",
          code: "MISSING_TOKEN"
        });
      }
      
      const token = authHeader.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ 
          error: "Token inválido",
          code: "INVALID_TOKEN"
        });
      }
      
      const decoded = JWT.verificarToken(token);
      
      if (!decoded || !decoded.id) {
        return res.status(401).json({ 
          error: "Token inválido",
          code: "INVALID_TOKEN_DATA"
        });
      }
      
      req.usuario = decoded;
      req.userId = decoded.id;
      req.userPerfil = decoded.perfil;
      
      logger.debug(`Usuário autenticado: ${decoded.id} (${decoded.perfil})`);
      next();
      
    } catch (error) {
      logger.error(`Erro na autenticação: ${error.message}`);
      
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ 
          error: "Token expirado",
          code: "TOKEN_EXPIRED"
        });
      }
      
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ 
          error: "Token inválido",
          code: "INVALID_TOKEN"
        });
      }
      
      return res.status(401).json({ 
        error: "Erro na autenticação",
        code: "AUTH_ERROR"
      });
    }
  }

  /**
   * Middleware de autorização - verifica se usuário tem permissão
   * @param {string[]} permissoes - Array de perfis permitidos
   */
  static autorizar(permissoes) {
    return (req, res, next) => {
      if (!req.usuario) {
        return res.status(401).json({ 
          error: "Usuário não autenticado",
          code: "UNAUTHORIZED"
        });
      }
      
      const perfil = req.usuario.perfil;
      
      if (!permissoes.includes(perfil)) {
        logger.warn(`Acesso negado: ${perfil} tentou acessar ${req.method} ${req.path}`);
        return res.status(403).json({ 
          error: "Acesso negado. Permissão insuficiente.",
          code: "FORBIDDEN",
          required: permissoes,
          current: perfil
        });
      }
      
      next();
    };
  }

  /**
   * Middleware para verificar se usuário é o proprietário do recurso
   * @param {string} paramId - Nome do parâmetro de ID na rota
   */
  static verificarProprietario(paramId = "id") {
    return (req, res, next) => {
      if (!req.usuario) {
        return res.status(401).json({ 
          error: "Usuário não autenticado",
          code: "UNAUTHORIZED"
        });
      }
      
      const recursoId = parseInt(req.params[paramId]);
      const usuarioId = req.usuario.id;
      
      // Admin sempre tem acesso
      if (req.usuario.perfil === "ADMIN") {
        return next();
      }
      
      if (recursoId !== usuarioId) {
        logger.warn(`Acesso negado: Usuário ${usuarioId} tentou acessar recurso ${recursoId}`);
        return res.status(403).json({ 
          error: "Acesso negado. Você não é o proprietário deste recurso.",
          code: "NOT_OWNER"
        });
      }
      
      next();
    };
  }

  /**
   * Middleware opcional - não bloqueia se não houver token
   */
  static autenticarOpcional(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const decoded = JWT.verificarToken(token);
        req.usuario = decoded;
        req.userId = decoded.id;
        req.userPerfil = decoded.perfil;
      }
      
      next();
      
    } catch (error) {
      // Se token inválido, apenas continua sem usuário
      next();
    }
  }
}

export default MiddlewareAutenticacao;