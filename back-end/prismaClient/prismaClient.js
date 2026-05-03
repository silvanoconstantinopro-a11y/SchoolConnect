import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

// DATABASE_URL deve ser no formato: file:./dev.db
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL não está definida nas variáveis de ambiente.");
}

// O adaptador BetterSqlite3 aceita a URL no formato "file:./caminho.db"
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

export { prisma };
