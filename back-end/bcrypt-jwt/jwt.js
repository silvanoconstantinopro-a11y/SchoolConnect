import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "schoolconnect-super-secret-key-change-in-production";
const EXPIRATION = process.env.EXPIRATION_TIME || "24h";

export const JWT = {
  /**
   * Gera token JWT
   * @param {Object} payload - Dados a incluir no token
   * @returns {string} - Token JWT
   */
  gerarToken(payload) {
    if (!payload || !payload.id) {
      throw new Error("Payload inválido para geração de token.");
    }
    
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION });
  },
  
  /**
   * Verifica e decodifica token JWT
   * @param {string} token - Token JWT
   * @returns {Object} - Payload decodificado
   * @throws {Error} - Se token for inválido ou expirado
   */
  verificarToken(token) {
    if (!token || typeof token !== "string") {
      throw new Error("Token não fornecido.");
    }
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      
      // Validação adicional
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
  
  /**
   * Decodifica token sem verificar (apenas para debug)
   * @param {string} token - Token JWT
   * @returns {Object|null} - Payload decodificado ou null
   */
  decodificarToken(token) {
    try {
      return jwt.decode(token);
    } catch {
      return null;
    }
  }
};