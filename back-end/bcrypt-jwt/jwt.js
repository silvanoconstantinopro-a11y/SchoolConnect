import jwt from "jsonwebtoken";

const SECRET     = process.env.SECRET_KEY;
const EXPIRATION = process.env.EXPIRATION_TIME || "1h";

if (!SECRET) {
  throw new Error("❌  SECRET_KEY não está definida nas variáveis de ambiente.");
}

export class JWT {
  static gerarToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRATION });
  }

  static verificarToken(token) {
    if (!token) throw new Error("Token não fornecido.");
    try {
      return jwt.verify(token, SECRET);
    } catch {
      throw new Error("Token inválido ou expirado.");
    }
  }
}