import "dotenv/config";
import Database from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL não está definida.");
}

// Extrai o caminho do ficheiro: "file:./dev.db" → "./dev.db"
const dbPath = databaseUrl.replace(/^file:/, "");

const sqlite = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(sqlite);
const prisma = new PrismaClient({ adapter });

export { prisma };
