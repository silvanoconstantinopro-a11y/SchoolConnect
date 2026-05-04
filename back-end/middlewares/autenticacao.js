import { JWT } from "../bcrypt-jwt/jwt.js";

export class MiddlewareAutenticacao {
  /**
   * Valida o Bearer token e injeta req.user = { id, email, perfil }.
   */
  static autenticar(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido." });
    }
    try {
      req.user = JWT.verificarToken(header.slice(7));
      return next();
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }

  /**
   * Garante que o utilizador autenticado tem um dos perfis permitidos.
   * Uso: MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR")
   */
  static exigirPerfil(...perfis) {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ error: "Não autenticado." });
      if (!perfis.includes(req.user.perfil))
        return res.status(403).json({ error: "Acesso não autorizado." });
      return next();
    };
  }
}