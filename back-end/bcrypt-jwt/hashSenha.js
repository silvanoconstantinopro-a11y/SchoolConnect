import bcrypt from "bcrypt";

const ROUNDS = 10;

export async function hashSenha(senha) {
  if (!senha) throw new Error("Senha não fornecida");
  return bcrypt.hash(senha, ROUNDS);
}

export async function compareSenha(senha, hash) {
  if (!senha || !hash) throw new Error("Senha ou hash não fornecidos");
  return bcrypt.compare(senha, hash);
}