#!/usr/bin/env node
/**
 * migrate.js
 * Corre no build do Render: aplica baseline nas migrações existentes
 * (caso a BD já tenha tabelas sem histórico de migração) e depois
 * corre "prisma migrate deploy" normalmente.
 */
import "dotenv/config";
import { execSync }                    from "child_process";
import { readFileSync }                from "fs";
import { fileURLToPath }               from "url";
import path                            from "path";
import Database                        from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rawUrl   = process.env.DATABASE_URL || "file:./dev.db";
const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
const dbPath   = cleanUrl.startsWith("file:") ? cleanUrl.slice(5) : cleanUrl;

console.log(`🔍  BD: ${dbPath}`);

const db = new Database(dbPath);

const jaTemMigracoes = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='_prisma_migrations'")
  .get();

if (!jaTemMigracoes) {
  console.log("📋  A aplicar baseline...");
  const sql = readFileSync(path.join(__dirname, "prisma", "baseline.sql"), "utf-8");
  db.exec(sql);
  console.log("✅  Baseline aplicado.");
} else {
  console.log("✅  Tabela _prisma_migrations já existe — a saltar baseline.");
}

db.close();

console.log("🚀  A correr prisma migrate deploy...");
execSync("npx prisma migrate deploy", { stdio: "inherit" });
console.log("✅  Migrações concluídas.");