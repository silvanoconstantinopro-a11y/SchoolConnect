#!/usr/bin/env node
/**
 * migrate.js
 * Script simplificado para o Render - cria tabelas diretamente com SQLite
 */

import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";
import Database from "better-sqlite3";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configurar caminho do banco
const rawUrl = process.env.DATABASE_URL || "file:./dev.db";
const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
const dbPath = cleanUrl.startsWith("file:") ? cleanUrl.slice(5) : cleanUrl;

console.log(`🔍  Banco de dados: ${dbPath}`);

// Criar diretório se não existir
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir) && dbDir !== ".") {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db;
try {
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  console.log("✅ Conexão com banco estabelecida");
} catch (err) {
  console.error(`❌ Erro ao conectar ao banco: ${err.message}`);
  process.exit(1);
}

// Função para criar tabelas diretamente
function criarTabelas() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      telefone TEXT NOT NULL,
      perfil TEXT NOT NULL,
      imagem TEXT,
      relacaoEducando TEXT,
      codigoVerificacao TEXT UNIQUE,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS alunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      matricula TEXT UNIQUE NOT NULL,
      telefone TEXT,
      classe TEXT,
      imagem TEXT,
      turmaId INTEGER,
      cursoId INTEGER,
      encarregadoId INTEGER,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS turmas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT UNIQUE NOT NULL,
      professorId INTEGER,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT UNIQUE NOT NULL,
      descricao TEXT NOT NULL,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS disciplinas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      cursoId INTEGER NOT NULL,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(nome, cursoId)
    )`,
    `CREATE TABLE IF NOT EXISTS notas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      valor REAL NOT NULL,
      tipo TEXT NOT NULL,
      alunoId INTEGER NOT NULL,
      disciplinaId INTEGER NOT NULL,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(alunoId, disciplinaId, tipo)
    )`,
    `CREATE TABLE IF NOT EXISTS mensagens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conteudo TEXT NOT NULL,
      remetenteId INTEGER NOT NULL,
      destinatarioId INTEGER NOT NULL,
      arquivoUrl TEXT,
      arquivoNome TEXT,
      arquivoTipo TEXT,
      arquivoTamanho INTEGER,
      editadoEm DATETIME,
      deletadoParaRemetente INTEGER DEFAULT 0,
      deletadoParaDestinatario INTEGER DEFAULT 0,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS avisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      conteudo TEXT NOT NULL,
      imagem TEXT,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      imagem TEXT,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS reunioes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      local TEXT NOT NULL,
      linkMeeting TEXT,
      dataHora DATETIME,
      criadoPorId INTEGER,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS reuniao_participantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reuniaoId INTEGER NOT NULL,
      usuarioId INTEGER NOT NULL,
      UNIQUE(reuniaoId, usuarioId)
    )`,
    `CREATE TABLE IF NOT EXISTS relatorios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      conteudo TEXT NOT NULL,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS feedbacks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      assunto TEXT NOT NULL,
      mensagem TEXT NOT NULL,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS codigos_professor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT UNIQUE NOT NULL,
      usado INTEGER DEFAULT 0,
      professorId INTEGER UNIQUE,
      criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  for (const sql of tables) {
    try {
      db.exec(sql);
    } catch (err) {
      console.error(`Erro ao criar tabela: ${err.message}`);
    }
  }
  console.log("✅ Tabelas criadas/verificadas");
}

// Criar tabelas
criarTabelas();

// Verificar se há dados iniciais
const verificarAdmin = db.prepare("SELECT COUNT(*) as count FROM usuarios WHERE perfil = 'ADMIN'").get();

if (verificarAdmin.count === 0) {
  console.log("📋  Criando utilizador admin padrão...");
  
  // Importar bcrypt dinamicamente
  const bcrypt = await import("bcrypt");
  const senhaHash = await bcrypt.hash(process.env.ADMIN_SENHA || "schoolconnect2026", 10);
  const agora = new Date().toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO usuarios (nome, email, senha, telefone, perfil, criadoEm, atualizadoEm)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    "Administrador",
    "admin@schoolconnect.com",
    senhaHash,
    "+244 900 000 000",
    "ADMIN",
    agora,
    agora
  );
  console.log("✅ Admin criado com sucesso");
} else {
  console.log("✅ Admin já existe");
}

// Criar índices para performance
function criarIndices() {
  const indices = [
    "CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email)",
    "CREATE INDEX IF NOT EXISTS idx_usuarios_perfil ON usuarios(perfil)",
    "CREATE INDEX IF NOT EXISTS idx_alunos_matricula ON alunos(matricula)",
    "CREATE INDEX IF NOT EXISTS idx_alunos_turma ON alunos(turmaId)",
    "CREATE INDEX IF NOT EXISTS idx_notas_aluno ON notas(alunoId)",
    "CREATE INDEX IF NOT EXISTS idx_mensagens_remetente ON mensagens(remetenteId)",
    "CREATE INDEX IF NOT EXISTS idx_mensagens_destinatario ON mensagens(destinatarioId)",
    "CREATE INDEX IF NOT EXISTS idx_avisos_criadoEm ON avisos(criadoEm)",
    "CREATE INDEX IF NOT EXISTS idx_eventos_criadoEm ON eventos(criadoEm)",
    "CREATE INDEX IF NOT EXISTS idx_reunioes_dataHora ON reunioes(dataHora)"
  ];
  
  for (const sql of indices) {
    try {
      db.exec(sql);
    } catch (err) {
      // Ignorar erros de índice
    }
  }
  console.log("✅ Índices criados/verificados");
}

criarIndices();

db.close();
console.log("✅ Migração concluída com sucesso!");