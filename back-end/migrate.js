#!/usr/bin/env node
/**
 * Script de migração seguro para produção.
 * 1. Aplica o baseline (marca migrações antigas como já feitas) se necessário.
 * 2. Corre prisma migrate deploy normalmente.
 */
import "dotenv/config";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const databaseUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
const dbPath = databaseUrl.replace(/^file:/, "");

console.log("🔍 A verificar base de dados em:", dbPath);

const db = new Database(dbPath);

// Verifica se a tabela de migrações já existe
const migrationTableExists = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='_prisma_migrations'")
  .get();

if (!migrationTableExists) {
  console.log("📋 A aplicar baseline nas migrações existentes...");
  const baselineSql = readFileSync(
    path.join(__dirname, "prisma", "baseline.sql"),
    "utf-8"
  );
  db.exec(baselineSql);
  console.log("✅ Baseline aplicado com sucesso.");
} else {
  console.log("✅ Tabela de migrações já existe, a saltar baseline.");
}

db.close();

console.log("🚀 A correr prisma migrate deploy...");
execSync("npx prisma migrate deploy", { stdio: "inherit" });
console.log("✅ Migrações aplicadas com sucesso.");