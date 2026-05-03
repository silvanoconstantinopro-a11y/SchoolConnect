import Database from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

// Lê directamente do process.env sem depender do dotenv
// (o servidor.js já importa "dotenv/config" antes deste módulo)
const rawUrl = process.env.DATABASE_URL || "file:./dev.db";
const databaseUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
const dbPath = databaseUrl.startsWith("file:") 
  ? databaseUrl.slice(5)   // remove "file:"
  : databaseUrl;

console.log(`🗄️  Base de dados: ${dbPath}`);

const sqlite = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(sqlite);
const prisma = new PrismaClient({ adapter });

export { prisma };