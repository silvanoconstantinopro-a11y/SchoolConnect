#!/usr/bin/env node
/**
 * migrate.js
 * Corre no build do Render: aplica baseline nas migrações existentes
 * e depois corre "prisma migrate deploy" normalmente.
 */
import "dotenv/config";
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rawUrl = process.env.DATABASE_URL || "file:./dev.db";
const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
const dbPath = cleanUrl.startsWith("file:") ? cleanUrl.slice(5) : cleanUrl;

console.log(`🔍  Banco de dados: ${dbPath}`);

// Criar diretório se não existir
const dbDir = path.dirname(dbPath);
if (dbDir !== "." && !existsSync(dbDir)) {
  console.log(`📁  Criando diretório: ${dbDir}`);
  execSync(`mkdir -p ${dbDir}`);
}

let db;
try {
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
} catch (err) {
  console.error(`❌ Erro ao conectar ao banco: ${err.message}`);
  process.exit(1);
}

// Verificar se já existe tabela de migrações
const jaTemMigracoes = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='_prisma_migrations'")
  .get();

if (!jaTemMigracoes) {
  console.log("📋  A aplicar baseline (primeira execução)...");
  
  const baselinePath = path.join(__dirname, "prisma", "baseline.sql");
  if (!existsSync(baselinePath)) {
    console.error(`❌ Arquivo baseline não encontrado: ${baselinePath}`);
    process.exit(1);
  }
  
  try {
    const sql = readFileSync(baselinePath, "utf-8");
    db.exec(sql);
    console.log("✅  Baseline aplicado com sucesso.");
  } catch (err) {
    console.error(`❌ Erro ao aplicar baseline: ${err.message}`);
    process.exit(1);
  }
} else {
  console.log("✅  Tabela _prisma_migrations já existe — a saltar baseline.");
}

db.close();

// Executar migrações pendentes
console.log("🚀  A correr prisma migrate deploy...");
try {
  execSync("npx prisma migrate deploy", { 
    stdio: "inherit",
    env: { ...process.env, PRISMA_SCHEMA_ENGINE_BINARY: "node_modules/prisma/query-engine" }
  });
  console.log("✅  Migrações concluídas.");
} catch (err) {
  console.error(`❌ Erro ao executar migrações: ${err.message}`);
  process.exit(1);
}