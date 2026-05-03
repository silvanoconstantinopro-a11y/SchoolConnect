import "dotenv/config";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRATION_TIME = process.env.EXPIRATION_TIME || "1h";

if (!SECRET_KEY) {
  throw new Error(
    "❌ SECRET_KEY não está definida. Configure a variável de ambiente antes de iniciar."
  );
}

export class JWT {
  static gerarToken(payload) {
    try {
      return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
    } catch (error) {
      throw new Error(`Erro ao gerar token JWT: ${error.message}`);
    }
  }

  static verificarToken(token) {
    if (!token) {
      throw new Error("Token não fornecido.");
    }
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      throw new Error(`Token inválido ou expirado: ${error.message}`);
    }
  }
}
