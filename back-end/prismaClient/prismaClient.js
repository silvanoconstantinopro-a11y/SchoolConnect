/**
 * prismaClient.js
 * Versão sem Prisma - usando better-sqlite3 diretamente
 */

import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuração do banco
const getDbPath = () => {
  let url = process.env.DATABASE_URL || "file:./dev.db";
  url = url.replace(/^["']|["']$/g, "");
  if (url.startsWith("file:")) {
    url = url.slice(5);
  }
  return path.resolve(__dirname, url);
};

const dbPath = getDbPath();
console.log(`🗄️  Conectando ao banco: ${dbPath}`);

// Criar diretório se não existir
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Criar conexão SQLite
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");

console.log("✅ SQLite conectado diretamente");

// Função para executar queries
export const prisma = {
  // Query raw
  $queryRaw: async (strings, ...values) => {
    const sql = strings.join("?");
    const stmt = db.prepare(sql);
    return stmt.all(...values);
  },
  
  // Connect (mock)
  $connect: async () => {
    console.log("✅ Conexão estabelecida");
    return true;
  },
  
  // Disconnect
  $disconnect: async () => {
    db.close();
    console.log("🔌 Conexão fechada");
    return true;
  },
  
  // Modelos
  usuario: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM usuarios";
      const params = [];
      if (options.where) {
        const conditions = [];
        if (options.where.perfil) {
          conditions.push("perfil = ?");
          params.push(options.where.perfil);
        }
        if (options.where.email) {
          conditions.push("email = ?");
          params.push(options.where.email);
        }
        if (conditions.length) {
          sql += " WHERE " + conditions.join(" AND ");
        }
      }
      if (options.orderBy) {
        const order = Object.entries(options.orderBy)[0];
        if (order) {
          sql += ` ORDER BY ${order[0]} ${order[1] === "asc" ? "ASC" : "DESC"}`;
        }
      }
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM usuarios WHERE id = ?");
      return stmt.get(options.where.id);
    },
    findFirst: async (options) => {
      let sql = "SELECT * FROM usuarios";
      const params = [];
      if (options.where) {
        const conditions = [];
        if (options.where.email) {
          conditions.push("email = ?");
          params.push(options.where.email);
        }
        if (options.where.telefone) {
          conditions.push("telefone = ?");
          params.push(options.where.telefone);
        }
        if (conditions.length) {
          sql += " WHERE " + conditions.join(" AND ");
        }
      }
      sql += " LIMIT 1";
      const stmt = db.prepare(sql);
      return stmt.get(...params);
    },
    create: async (options) => {
      const data = options.data;
      const columns = Object.keys(data).filter(k => data[k] !== undefined);
      const values = columns.map(k => data[k]);
      const placeholders = columns.map(() => "?").join(",");
      const sql = `INSERT INTO usuarios (${columns.join(",")}) VALUES (${placeholders})`;
      const stmt = db.prepare(sql);
      const info = stmt.run(...values);
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const updates = Object.keys(data).filter(k => data[k] !== undefined);
      const setClause = updates.map(k => `${k} = ?`).join(",");
      const values = updates.map(k => data[k]);
      values.push(where.id);
      const sql = `UPDATE usuarios SET ${setClause} WHERE id = ?`;
      const stmt = db.prepare(sql);
      stmt.run(...values);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM usuarios WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async (options = {}) => {
      let sql = "SELECT COUNT(*) as count FROM usuarios";
      const params = [];
      if (options.where) {
        if (options.where.perfil) {
          sql += " WHERE perfil = ?";
          params.push(options.where.perfil);
        }
      }
      const stmt = db.prepare(sql);
      const result = stmt.get(...params);
      return result.count;
    }
  },
  
  aluno: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM alunos";
      const params = [];
      if (options.where) {
        const conditions = [];
        if (options.where.turmaId) {
          conditions.push("turmaId = ?");
          params.push(options.where.turmaId);
        }
        if (options.where.cursoId) {
          conditions.push("cursoId = ?");
          params.push(options.where.cursoId);
        }
        if (options.where.encarregadoId) {
          conditions.push("encarregadoId = ?");
          params.push(options.where.encarregadoId);
        }
        if (conditions.length) {
          sql += " WHERE " + conditions.join(" AND ");
        }
      }
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM alunos WHERE id = ?");
      return stmt.get(options.where.id);
    },
    findFirst: async (options) => {
      let sql = "SELECT * FROM alunos";
      const params = [];
      if (options.where) {
        if (options.where.matricula) {
          sql += " WHERE matricula = ?";
          params.push(options.where.matricula);
        }
        if (options.where.telefone) {
          sql += " WHERE telefone = ?";
          params.push(options.where.telefone);
        }
      }
      sql += " LIMIT 1";
      const stmt = db.prepare(sql);
      return stmt.get(...params);
    },
    create: async (options) => {
      const data = options.data;
      const columns = Object.keys(data).filter(k => data[k] !== undefined);
      const values = columns.map(k => data[k]);
      const placeholders = columns.map(() => "?").join(",");
      const sql = `INSERT INTO alunos (${columns.join(",")}) VALUES (${placeholders})`;
      const stmt = db.prepare(sql);
      const info = stmt.run(...values);
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const updates = Object.keys(data).filter(k => data[k] !== undefined);
      const setClause = updates.map(k => `${k} = ?`).join(",");
      const values = updates.map(k => data[k]);
      values.push(where.id);
      const sql = `UPDATE alunos SET ${setClause} WHERE id = ?`;
      const stmt = db.prepare(sql);
      stmt.run(...values);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM alunos WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM alunos");
      const result = stmt.get();
      return result.count;
    }
  },
  
  turma: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM turmas";
      const params = [];
      if (options.where && options.where.professorId) {
        sql += " WHERE professorId = ?";
        params.push(options.where.professorId);
      }
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM turmas WHERE id = ?");
      return stmt.get(options.where.id);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO turmas (nome, professorId) VALUES (?, ?)");
      const info = stmt.run(data.nome, data.professorId || null);
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const stmt = db.prepare("UPDATE turmas SET nome = ?, professorId = ? WHERE id = ?");
      stmt.run(data.nome, data.professorId || null, where.id);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM turmas WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM turmas");
      const result = stmt.get();
      return result.count;
    }
  },
  
  curso: {
    findMany: async () => {
      const stmt = db.prepare("SELECT * FROM cursos ORDER BY nome ASC");
      return stmt.all();
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM cursos WHERE id = ?");
      return stmt.get(options.where.id);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO cursos (nome, descricao) VALUES (?, ?)");
      const info = stmt.run(data.nome, data.descricao || "");
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const stmt = db.prepare("UPDATE cursos SET nome = ?, descricao = ? WHERE id = ?");
      stmt.run(data.nome, data.descricao || "", where.id);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM cursos WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM cursos");
      const result = stmt.get();
      return result.count;
    }
  },
  
  disciplina: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM disciplinas";
      const params = [];
      if (options.where && options.where.cursoId) {
        sql += " WHERE cursoId = ?";
        params.push(options.where.cursoId);
      }
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM disciplinas WHERE id = ?");
      return stmt.get(options.where.id);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO disciplinas (nome, descricao, cursoId) VALUES (?, ?, ?)");
      const info = stmt.run(data.nome, data.descricao || "", data.cursoId);
      return { id: info.lastInsertRowid, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM disciplinas WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM disciplinas");
      const result = stmt.get();
      return result.count;
    }
  },
  
  nota: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM notas";
      const params = [];
      if (options.where) {
        const conditions = [];
        if (options.where.alunoId) {
          conditions.push("alunoId = ?");
          params.push(options.where.alunoId);
        }
        if (options.where.disciplinaId) {
          conditions.push("disciplinaId = ?");
          params.push(options.where.disciplinaId);
        }
        if (conditions.length) {
          sql += " WHERE " + conditions.join(" AND ");
        }
      }
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO notas (valor, tipo, alunoId, disciplinaId) VALUES (?, ?, ?, ?)");
      const info = stmt.run(data.valor, data.tipo, data.alunoId, data.disciplinaId);
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const stmt = db.prepare("UPDATE notas SET valor = ?, tipo = ? WHERE id = ?");
      stmt.run(data.valor, data.tipo, where.id);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM notas WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM notas");
      const result = stmt.get();
      return result.count;
    }
  },
  
  aviso: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM avisos ORDER BY criadoEm DESC";
      if (options.take) {
        sql += " LIMIT ?";
        const stmt = db.prepare(sql);
        return stmt.all(options.take);
      }
      const stmt = db.prepare(sql);
      return stmt.all();
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM avisos WHERE id = ?");
      return stmt.get(options.where.id);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO avisos (titulo, conteudo, imagem) VALUES (?, ?, ?)");
      const info = stmt.run(data.titulo, data.conteudo, data.imagem || null);
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const stmt = db.prepare("UPDATE avisos SET titulo = ?, conteudo = ?, imagem = ? WHERE id = ?");
      stmt.run(data.titulo, data.conteudo, data.imagem || null, where.id);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM avisos WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM avisos");
      const result = stmt.get();
      return result.count;
    }
  },
  
  evento: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM eventos ORDER BY criadoEm DESC";
      if (options.take) {
        sql += " LIMIT ?";
        const stmt = db.prepare(sql);
        return stmt.all(options.take);
      }
      const stmt = db.prepare(sql);
      return stmt.all();
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM eventos WHERE id = ?");
      return stmt.get(options.where.id);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO eventos (titulo, descricao, imagem) VALUES (?, ?, ?)");
      const info = stmt.run(data.titulo, data.descricao, data.imagem || null);
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const stmt = db.prepare("UPDATE eventos SET titulo = ?, descricao = ?, imagem = ? WHERE id = ?");
      stmt.run(data.titulo, data.descricao, data.imagem || null, where.id);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM eventos WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM eventos");
      const result = stmt.get();
      return result.count;
    }
  },
  
  reuniao: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM reunioes";
      const params = [];
      if (options.where) {
        const conditions = [];
        if (options.where.criadoPorId) {
          conditions.push("criadoPorId = ?");
          params.push(options.where.criadoPorId);
        }
        if (options.where.dataHora && options.where.dataHora.gte) {
          conditions.push("dataHora >= ?");
          params.push(options.where.dataHora.gte.toISOString());
        }
        if (conditions.length) {
          sql += " WHERE " + conditions.join(" AND ");
        }
      }
      sql += " ORDER BY dataHora ASC";
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM reunioes WHERE id = ?");
      return stmt.get(options.where.id);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO reunioes (titulo, local, linkMeeting, dataHora, criadoPorId) VALUES (?, ?, ?, ?, ?)");
      const info = stmt.run(data.titulo, data.local, data.linkMeeting || null, data.dataHora || null, data.criadoPorId || null);
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const stmt = db.prepare("UPDATE reunioes SET titulo = ?, local = ?, linkMeeting = ?, dataHora = ? WHERE id = ?");
      stmt.run(data.titulo, data.local, data.linkMeeting || null, data.dataHora || null, where.id);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM reunioes WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM reunioes");
      const result = stmt.get();
      return result.count;
    }
  },
  
  reuniaoParticipante: {
    createMany: async (options) => {
      const { data } = options;
      let count = 0;
      for (const item of data) {
        const stmt = db.prepare("INSERT INTO reuniao_participantes (reuniaoId, usuarioId) VALUES (?, ?)");
        stmt.run(item.reuniaoId, item.usuarioId);
        count++;
      }
      return { count };
    },
    deleteMany: async (options) => {
      const { where } = options;
      let sql = "DELETE FROM reuniao_participantes";
      const params = [];
      if (where.reuniaoId) {
        sql += " WHERE reuniaoId = ?";
        params.push(where.reuniaoId);
      }
      const stmt = db.prepare(sql);
      const info = stmt.run(...params);
      return { count: info.changes };
    }
  },
  
  mensagem: {
    findMany: async (options = {}) => {
      let sql = "SELECT * FROM mensagens";
      const params = [];
      if (options.where) {
        const conditions = [];
        if (options.where.remetenteId) {
          conditions.push("remetenteId = ?");
          params.push(options.where.remetenteId);
        }
        if (options.where.destinatarioId) {
          conditions.push("destinatarioId = ?");
          params.push(options.where.destinatarioId);
        }
        if (conditions.length) {
          sql += " WHERE " + conditions.join(" AND ");
        }
      }
      sql += " ORDER BY criadoEm DESC";
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare(`INSERT INTO mensagens 
        (conteudo, remetenteId, destinatarioId, arquivoUrl, arquivoNome, arquivoTipo, arquivoTamanho) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`);
      const info = stmt.run(
        data.conteudo, data.remetenteId, data.destinatarioId,
        data.arquivoUrl || null, data.arquivoNome || null, 
        data.arquivoTipo || null, data.arquivoTamanho || null
      );
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const stmt = db.prepare("UPDATE mensagens SET conteudo = ?, editadoEm = ? WHERE id = ?");
      stmt.run(data.conteudo, new Date().toISOString(), where.id);
      return { id: where.id, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM mensagens WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM mensagens");
      const result = stmt.get();
      return result.count;
    }
  },
  
  feedback: {
    findMany: async () => {
      const stmt = db.prepare("SELECT * FROM feedbacks ORDER BY criadoEm DESC");
      return stmt.all();
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO feedbacks (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)");
      const info = stmt.run(data.nome, data.email, data.assunto, data.mensagem);
      return { id: info.lastInsertRowid, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM feedbacks WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    },
    count: async () => {
      const stmt = db.prepare("SELECT COUNT(*) as count FROM feedbacks");
      const result = stmt.get();
      return result.count;
    }
  },
  
  codigoProfessor: {
    findMany: async () => {
      const stmt = db.prepare("SELECT * FROM codigos_professor ORDER BY criadoEm DESC");
      return stmt.all();
    },
    findUnique: async (options) => {
      const stmt = db.prepare("SELECT * FROM codigos_professor WHERE codigo = ?");
      return stmt.get(options.where.codigo);
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO codigos_professor (codigo) VALUES (?)");
      const info = stmt.run(data.codigo);
      return { id: info.lastInsertRowid, ...data };
    },
    update: async (options) => {
      const { where, data } = options;
      const stmt = db.prepare("UPDATE codigos_professor SET usado = ?, professorId = ? WHERE codigo = ?");
      stmt.run(data.usado ? 1 : 0, data.professorId || null, where.codigo);
      return { success: true };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM codigos_professor WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    }
  },
  
  relatorio: {
    findMany: async () => {
      const stmt = db.prepare("SELECT * FROM relatorios ORDER BY criadoEm DESC");
      return stmt.all();
    },
    create: async (options) => {
      const data = options.data;
      const stmt = db.prepare("INSERT INTO relatorios (titulo, conteudo) VALUES (?, ?)");
      const info = stmt.run(data.titulo, data.conteudo);
      return { id: info.lastInsertRowid, ...data };
    },
    delete: async (options) => {
      const stmt = db.prepare("DELETE FROM relatorios WHERE id = ?");
      stmt.run(options.where.id);
      return { success: true };
    }
  },
  
  $transaction: async (callback) => {
    db.prepare("BEGIN TRANSACTION").run();
    try {
      const result = await callback({
        usuario: prisma.usuario,
        aluno: prisma.aluno,
        turma: prisma.turma,
        curso: prisma.curso,
        disciplina: prisma.disciplina,
        nota: prisma.nota,
        mensagem: prisma.mensagem,
        aviso: prisma.aviso,
        evento: prisma.evento,
        reuniao: prisma.reuniao,
        reuniaoParticipante: prisma.reuniaoParticipante,
        feedback: prisma.feedback,
        codigoProfessor: prisma.codigoProfessor
      });
      db.prepare("COMMIT").run();
      return result;
    } catch (error) {
      db.prepare("ROLLBACK").run();
      throw error;
    }
  }
};

// Inicializar tabelas se não existirem
function initTables() {
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
    } catch (error) {
      console.error("Erro ao criar tabela:", error.message);
    }
  }
  console.log("✅ Tabelas verificadas/criadas");
}

initTables();

// Testar conexão
prisma.$connect().catch(console.error);