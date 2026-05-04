import { JWT } from "../bcrypt-jwt/jwt.js";

export class MiddlewareAutenticacao {
  static autenticar(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido." });
    }
    try {
      req.user = JWT.verificarToken(header.split(" ")[1]);
      return next();
    } catch {
      return res.status(401).json({ error: "Token inválido ou expirado." });
    }
  }
}