import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || process.env.SECRET_KEY;
const EXPIRATION = process.env.JWT_EXPIRATION || process.env.EXPIRATION_TIME || "24h";

if (!SECRET) {
  console.error("❌ JWT_SECRET não está definida nas variáveis de ambiente");
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required in production");
  }
}

export class JWT {
  static gerarToken(payload) {
    if (!payload || !payload.id) {
      throw new Error("Payload inválido para geração de token");
    }
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRATION });
  }

  static verificarToken(token) {
    if (!token || typeof token !== "string") {
      throw new Error("Token não fornecido ou inválido");
    }
    try {
      const decoded = jwt.verify(token, SECRET);
      if (!decoded || !decoded.id) {
        throw new Error("Token inválido: dados ausentes");
      }
      return decoded;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expirado");
      }
      if (error.name === "JsonWebTokenError") {
        throw new Error("Token inválido");
      }
      throw new Error(`Erro na verificação do token: ${error.message}`);
    }
  }
  
  static decodificarToken(token) {
    if (!token) return null;
    try {
      return jwt.decode(token);
    } catch {
      return null;
    }
  }
}