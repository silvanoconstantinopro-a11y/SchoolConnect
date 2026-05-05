import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "schoolconnect-super-secret-key-change-in-production-2026";
const EXPIRATION = process.env.EXPIRATION_TIME || "24h";

export const JWT = {
  gerarToken(payload) {
    if (!payload) {
      throw new Error("Payload inválido para geração de token.");
    }
    
    // Garantir que o payload tem os campos mínimos
    const tokenPayload = {
      id: payload.id,
      email: payload.email || null,
      perfil: payload.perfil,
      nome: payload.nome || (payload.perfil === "ADMIN" ? "Administrador" : "Usuário"),
      iat: Math.floor(Date.now() / 1000)
    };
    
    return jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: EXPIRATION });
  },
  
  verificarToken(token) {
    if (!token || typeof token !== "string") {
      throw new Error("Token não fornecido.");
    }
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
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