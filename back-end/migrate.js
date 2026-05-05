#!/usr/bin/env node

/**
 * migrate.js
 * Script de migração para produção (Render, Heroku, etc.)
 * Aplica baseline se necessário e executa migrações
 */

import "dotenv/config";
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Constantes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const MIGRATION_TIMEOUT = 60000;

// Logger customizado
const logger = {
  info: (msg, ...args) => console.log(`✅ ${msg}`, ...args),
  error: (msg, ...args) => console.error(`❌ ${msg}`, ...args),
  warn: (msg, ...args) => console.warn(`⚠️  ${msg}`, ...args),
  step: (msg, ...args) => console.log(`\n📌 ${msg}`, ...args),
  progress: (msg, ...args) => console.log(`   → ${msg}`, ...args)
};

/**
 * Valida e limpa URL do banco de dados
 */
function validateDatabaseUrl() {
  let url = process.env.DATABASE_URL;
  
  if (!url) {
    logger.warn("DATABASE_URL não definida, usando padrão: file:./dev.db");
    url = "file:./dev.db";
  }
  
  const cleanUrl = url.trim().replace(/^["']|["']$/g, "");
  
  // Verifica se é SQLite
  if (!cleanUrl.startsWith("sqlite:") && !cleanUrl.startsWith("file:")) {
    logger.info("Banco de dados não-SQLite detectado, ignorando baseline manual");
    return null;
  }
  
  const dbPath = cleanUrl.startsWith("file:") ? cleanUrl.slice(5) : cleanUrl.slice(7);
  
  if (!dbPath || dbPath === ":memory:") {
    logger.warn("Banco de dados em memória detectado");
    return null;
  }
  
  return { dbPath, cleanUrl };
}

/**
 * Abre conexão com banco SQLite
 */
async function openDatabase(dbPath) {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

/**
 * Verifica se tabela de migrações existe
 */
async function checkMigrationsTable(db) {
  try {
    const result = await db.get(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='_prisma_migrations'
    `);
    return !!result;
  } catch (error) {
    logger.error("Erro ao verificar tabela _prisma_migrations:", error.message);
    return false;
  }
}

/**
 * Aplica baseline SQL
 */
async function applyBaseline(db, baselinePath) {
  try {
    if (!existsSync(baselinePath)) {
      logger.error(`Arquivo baseline não encontrado: ${baselinePath}`);
      return false;
    }
    
    const sql = readFileSync(baselinePath, "utf-8");
    const statements = sql.split(";").filter(stmt => stmt.trim().length > 0);
    
    logger.progress(`Aplicando ${statements.length} comandos SQL...`);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await db.exec(statement);
      }
    }
    
    logger.info("Baseline aplicado com sucesso");
    return true;
    
  } catch (error) {
    logger.error("Erro ao aplicar baseline:", error.message);
    return false;
  }
}

/**
 * Executa comando com retry
 */
function execWithRetry(command, options = {}) {
  const {
    retries = MAX_RETRIES,
    delay = RETRY_DELAY,
    timeout = MIGRATION_TIMEOUT,
    stdio = "inherit"
  } = options;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.progress(`Tentativa ${attempt}/${retries}...`);
      execSync(command, { stdio, timeout });
      return true;
    } catch (error) {
      logger.error(`Falha na tentativa ${attempt}:`, error.message);
      
      if (attempt < retries) {
        logger.progress(`Aguardando ${delay}ms antes de tentar novamente...`);
        const waitUntil = Date.now() + delay;
        while (Date.now() < waitUntil) {
          // Busy wait simples
        }
      } else {
        throw error;
      }
    }
  }
  return false;
}

/**
 * Função principal de migração
 */
async function runMigration() {
  const startTime = Date.now();
  
  console.log("\n" + "=".repeat(60));
  logger.info("INICIANDO PROCESSO DE MIGRAÇÃO");
  console.log("=".repeat(60));
  
  logger.info(`Ambiente: ${process.env.NODE_ENV || "development"}`);
  logger.info(`Timestamp: ${new Date().toISOString()}`);
  
  let db = null;
  
  try {
    // Validar ambiente
    const dbInfo = validateDatabaseUrl();
    
    // Só processa SQLite se for o caso
    if (dbInfo) {
      const { dbPath, cleanUrl } = dbInfo;
      logger.info(`Banco SQLite detectado: ${dbPath}`);
      
      // Verificar se arquivo existe
      if (!existsSync(dbPath) && dbPath !== ":memory:") {
        logger.warn(`Arquivo do banco não encontrado: ${dbPath}`);
        logger.progress("Será criado automaticamente durante a migração");
      }
      
      // Conectar ao banco
      try {
        db = await openDatabase(dbPath);
        logger.info("Conexão com banco de dados estabelecida");
        
        // Verificar se já existem tabelas
        const hasMigrations = await checkMigrationsTable(db);
        
        if (!hasMigrations) {
          logger.step("Tabela _prisma_migrations não encontrada");
          logger.progress("Verificando baseline...");
          
          const baselinePath = path.join(__dirname, "..", "prisma", "baseline.sql");
          const success = await applyBaseline(db, baselinePath);
          
          if (!success) {
            logger.warn("Falha ao aplicar baseline. Continuando com migrate deploy...");
          }
        } else {
          logger.info("Tabela _prisma_migrations já existe - pulando baseline");
        }
        
      } catch (error) {
        logger.error("Erro ao conectar ao banco SQLite:", error.message);
        throw error;
      }
    } else {
      logger.info("Banco não-SQLite detectado - usando migrate deploy padrão");
    }
    
    // Executar migrate deploy
    logger.step("Executando prisma migrate deploy...");
    
    // Verificar se Prisma CLI está disponível
    try {
      execSync("npx prisma --version", { stdio: "pipe" });
      logger.info("Prisma CLI disponível");
    } catch {
      logger.warn("Prisma CLI não encontrado, instalando...");
      execSync("npm install -g prisma@latest", { stdio: "inherit" });
    }
    
    // Gerar Prisma Client
    logger.progress("Gerando Prisma Client...");
    execSync("npx prisma generate", { stdio: "inherit" });
    
    // Executar migração com retry
    await execWithRetry("npx prisma migrate deploy", {
      retries: MAX_RETRIES,
      timeout: MIGRATION_TIMEOUT
    });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log("\n" + "=".repeat(60));
    logger.info(`MIGRAÇÃO CONCLUÍDA COM SUCESSO em ${duration}s`);
    console.log("=".repeat(60));
    
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log("\n" + "=".repeat(60));
    logger.error(`MIGRAÇÃO FALHOU após ${duration}s`);
    logger.error("Erro:", error.message);
    console.log("=".repeat(60));
    
    if (error.stderr) {
      console.error("\nDetalhes do erro:");
      console.error(error.stderr.toString());
    }
    
    process.exit(1);
  } finally {
    if (db) {
      await db.close();
      logger.progress("Conexão com banco fechada");
    }
  }
}

// Tratamento de sinais
process.on("SIGINT", () => {
  logger.warn("\nMigração interrompida pelo usuário");
  process.exit(130);
});

process.on("SIGTERM", () => {
  logger.warn("\nMigração interrompida pelo sistema");
  process.exit(143);
});

// Executar migração
runMigration();