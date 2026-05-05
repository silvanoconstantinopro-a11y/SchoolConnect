import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * Gera hash de uma senha
 * @param {string} senha - Senha em texto plano
 * @returns {Promise<string>} - Hash da senha
 * @throws {Error} - Se senha for inválida
 */
export async function hashSenha(senha) {
  if (!senha || typeof senha !== "string") {
    throw new Error("Senha inválida.");
  }
  
  if (senha.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }
  
  return bcrypt.hash(senha, SALT_ROUNDS);
}

/**
 * Compara senha com hash
 * @param {string} senha - Senha em texto plano
 * @param {string} hash - Hash armazenado
 * @returns {Promise<boolean>} - true se coincidir
 */
export async function compareSenha(senha, hash) {
  if (!senha || !hash) {
    return false;
  }
  
  return bcrypt.compare(senha, hash);
}