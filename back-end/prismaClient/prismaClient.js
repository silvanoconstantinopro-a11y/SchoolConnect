/**
 * prismaClient.js
 * Instância única do Prisma com adaptador BetterSQLite3.
 * O dotenv já foi carregado no servidor.js antes deste módulo ser importado.
 */
import Database             from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient }     from "../generated/prisma/client.js";

const rawUrl    = process.env.DATABASE_URL || "file:./dev.db";
const cleanUrl  = rawUrl.trim().replace(/^["']|["']$/g, "");           // remove aspas acidentais
const dbPath    = cleanUrl.startsWith("file:") ? cleanUrl.slice(5) : cleanUrl;

console.log(`🗄️   SQLite: ${dbPath}`);

const sqlite  = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(sqlite);
const prisma  = new PrismaClient({ adapter });

export { prisma };