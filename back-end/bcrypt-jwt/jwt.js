import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "schoolconnect-super-secret-key-change-in-production";
const EXPIRATION = process.env.EXPIRATION_TIME || "24h";

export const JWT = {
  gerarToken(payload) {
    if (!payload || !payload.id) {
      throw new Error("Payload inválido para geração de token.");
    }
    
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION });
  },
  
  verificarToken(token) {
    if (!token || typeof token !== "string") {
      throw new Error("Token não fornecido.");
    }
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      
      if (!decoded.id || !decoded.perfil) {
        throw new Error("Token mal formatado.");
      }
      
      return decoded;
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new Error("Token expirado. Faça login novamente.");
      }
      if (err.name === "JsonWebTokenError") {
        throw new Error("Token inválido.");
      }
      throw err;
    }
  },
  
  decodificarToken(token) {
    try {
      return jwt.decode(token);
    } catch {
      return null;
    }
  }
};