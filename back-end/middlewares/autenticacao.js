import { JWT } from "../bcrypt-jwt/jwt.js";

export class MiddlewareAutenticacao {
  /**
   * Valida o Bearer token e injeta req.user = { id, email, perfil }
   */
  static autenticar(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido." });
    }
    
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Formato de token inválido. Use: Bearer <token>" });
    }
    
    const token = authHeader.slice(7);
    
    try {
      const decoded = JWT.verificarToken(token);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }
  
  /**
   * Autenticação opcional - não falha se não houver token
   */
  static autenticarOpcional(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (authHeader?.startsWith("Bearer ")) {
      try {
        req.user = JWT.verificarToken(authHeader.slice(7));
      } catch {
        // Ignora erro - autenticação é opcional
      }
    }
    
    next();
  }
  
  /**
   * Garante que o utilizador autenticado tem um dos perfis permitidos
   * @param {...string} perfis - Perfis permitidos
   * @returns {Function} - Middleware
   */
  static exigirPerfil(...perfis) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: "Não autenticado." });
      }
      
      if (!perfis.includes(req.user.perfil)) {
        return res.status(403).json({ 
          error: `Acesso negado. Perfil necessário: ${perfis.join(" ou ")}`,
          seuPerfil: req.user.perfil
        });
      }
      
      return next();
    };
  }
  
  /**
   * Verifica se o utilizador é o próprio ou tem perfil admin/professor
   * @param {string} paramIdField - Nome do campo no req.params (padrão: "id")
   * @returns {Function} - Middleware
   */
  static permitirProprioOuPerfil(paramIdField = "id") {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: "Não autenticado." });
      }
      
      const targetId = parseInt(req.params[paramIdField]);
      const userId = req.user.id;
      const userPerfil = req.user.perfil;
      
      if (userId === targetId || userPerfil === "ADMIN" || userPerfil === "PROFESSOR") {
        return next();
      }
      
      return res.status(403).json({ error: "Acesso não autorizado a este recurso." });
    };
  }
}