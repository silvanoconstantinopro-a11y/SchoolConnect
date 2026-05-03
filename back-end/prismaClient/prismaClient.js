import "dotenv/config";
import Database from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

// Limpa o valor caso venha com aspas do ambiente
const rawUrl = process.env.DATABASE_URL;

if (!rawUrl) {
  throw new Error("❌ DATABASE_URL não está definida nas variáveis de ambiente.");
}

const databaseUrl = rawUrl.trim().replace(/^["']|["']$/g, "");

// Remove o prefixo "file:" para obter o caminho real do ficheiro
const dbPath = databaseUrl.replace(/^file:/, "");

const sqlite = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(sqlite);
const prisma = new PrismaClient({ adapter });

export { prisma };
