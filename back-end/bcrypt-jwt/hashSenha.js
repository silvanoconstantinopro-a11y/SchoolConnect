import bcrypt from "bcrypt";

const ROUNDS = 12;

export async function hashSenha(senha) {
  return bcrypt.hash(senha, ROUNDS);
}

export async function compareSenha(senha, hash) {
  return bcrypt.compare(senha, hash);
}