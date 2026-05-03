import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashSenha(senha) {
  try {
    return await bcrypt.hash(senha, SALT_ROUNDS);
  } catch (error) {
    throw new Error(`Erro ao encriptar senha: ${error.message}`);
  }
}

export async function compareSenha(senha, hash) {
  try {
    return await bcrypt.compare(senha, hash);
  } catch (error) {
    throw new Error(`Erro ao comparar senhas: ${error.message}`);
  }
}
