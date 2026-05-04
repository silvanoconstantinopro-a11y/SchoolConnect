/**
 * prismaClient.js
 * Instância única do Prisma com adaptador BetterSQLite3.
 * O dotenv é carregado no servidor.js antes deste módulo ser importado.
 */
import Database                from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient }        from "../generated/prisma/client.js";

const rawUrl   = process.env.DATABASE_URL || "file:./dev.db";
const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
const dbPath   = cleanUrl.startsWith("file:") ? cleanUrl.slice(5) : cleanUrl;

console.log(`🗄️   SQLite: ${dbPath}`);

const sqlite  = new Database(dbPath);

// WAL mode — melhor performance em leituras concorrentes
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

const adapter = new PrismaBetterSqlite3(sqlite);

export const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development"
    ? ["query", "warn", "error"]
    : ["warn", "error"],
});