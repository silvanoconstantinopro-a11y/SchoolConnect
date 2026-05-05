/**
 * prismaClient.js
 * Camada de acesso a dados completa usando better-sqlite3 diretamente
 * Substitui completamente o Prisma Client
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

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

function toJSON(data) {
  return JSON.parse(JSON.stringify(data));
}

function formatDate(date) {
  if (!date) return null;
  return new Date(date).toISOString();
}

// ============================================================
// MODELO USUARIO
// ============================================================
const usuario = {
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
    return toJSON(stmt.all(...params));
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare("SELECT * FROM usuarios WHERE id = ?");
    return toJSON(stmt.get(options.where.id));
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
    return toJSON(stmt.get(...params));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO usuarios (
        nome, email, senha, telefone, perfil, imagem, 
        relacaoEducando, codigoVerificacao, criadoEm, atualizadoEm
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.nome,
      data.email,
      data.senha,
      data.telefone,
      data.perfil,
      data.imagem || null,
      data.relacaoEducando || null,
      data.codigoVerificacao || null,
      agora,
      agora
    );
    
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const updates = [];
    const values = [];
    
    if (data.nome !== undefined) { updates.push("nome = ?"); values.push(data.nome); }
    if (data.email !== undefined) { updates.push("email = ?"); values.push(data.email); }
    if (data.senha !== undefined) { updates.push("senha = ?"); values.push(data.senha); }
    if (data.telefone !== undefined) { updates.push("telefone = ?"); values.push(data.telefone); }
    if (data.perfil !== undefined) { updates.push("perfil = ?"); values.push(data.perfil); }
    if (data.imagem !== undefined) { updates.push("imagem = ?"); values.push(data.imagem); }
    if (data.relacaoEducando !== undefined) { updates.push("relacaoEducando = ?"); values.push(data.relacaoEducando); }
    if (data.codigoVerificacao !== undefined) { updates.push("codigoVerificacao = ?"); values.push(data.codigoVerificacao); }
    
    updates.push("atualizadoEm = ?");
    values.push(agora);
    values.push(where.id);
    
    const sql = `UPDATE usuarios SET ${updates.join(", ")} WHERE id = ?`;
    const stmt = db.prepare(sql);
    stmt.run(...values);
    
    return toJSON({ id: where.id, ...data });
  },
  
  delete: async (options) => {
    const stmt = db.prepare("DELETE FROM usuarios WHERE id = ?");
    stmt.run(options.where.id);
    return { success: true };
  },
  
  count: async (options = {}) => {
    let sql = "SELECT COUNT(*) as count FROM usuarios";
    const params = [];
    if (options.where && options.where.perfil) {
      sql += " WHERE perfil = ?";
      params.push(options.where.perfil);
    }
    const stmt = db.prepare(sql);
    const result = stmt.get(...params);
    return result.count;
  }
};

// ============================================================
// MODELO ALUNO
// ============================================================
const aluno = {
  findMany: async (options = {}) => {
    let sql = `
      SELECT a.*, t.nome as turma_nome, c.nome as curso_nome, u.nome as encarregado_nome
      FROM alunos a
      LEFT JOIN turmas t ON a.turmaId = t.id
      LEFT JOIN cursos c ON a.cursoId = c.id
      LEFT JOIN usuarios u ON a.encarregadoId = u.id
    `;
    const params = [];
    
    if (options.where) {
      const conditions = [];
      if (options.where.turmaId) {
        conditions.push("a.turmaId = ?");
        params.push(options.where.turmaId);
      }
      if (options.where.cursoId) {
        conditions.push("a.cursoId = ?");
        params.push(options.where.cursoId);
      }
      if (options.where.encarregadoId) {
        conditions.push("a.encarregadoId = ?");
        params.push(options.where.encarregadoId);
      }
      if (conditions.length) {
        sql += " WHERE " + conditions.join(" AND ");
      }
    }
    
    sql += " ORDER BY a.nome ASC";
    const stmt = db.prepare(sql);
    const results = stmt.all(...params);
    
    return toJSON(results.map(r => ({
      id: r.id,
      nome: r.nome,
      matricula: r.matricula,
      telefone: r.telefone,
      classe: r.classe,
      imagem: r.imagem,
      turmaId: r.turmaId,
      cursoId: r.cursoId,
      encarregadoId: r.encarregadoId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      turma: r.turmaId ? { id: r.turmaId, nome: r.turma_nome } : null,
      curso: r.cursoId ? { id: r.cursoId, nome: r.curso_nome } : null,
      encarregado: r.encarregadoId ? { id: r.encarregadoId, nome: r.encarregado_nome } : null
    })));
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare(`
      SELECT a.*, t.nome as turma_nome, c.nome as curso_nome, u.nome as encarregado_nome
      FROM alunos a
      LEFT JOIN turmas t ON a.turmaId = t.id
      LEFT JOIN cursos c ON a.cursoId = c.id
      LEFT JOIN usuarios u ON a.encarregadoId = u.id
      WHERE a.id = ?
    `);
    const r = stmt.get(options.where.id);
    if (!r) return null;
    
    return toJSON({
      id: r.id,
      nome: r.nome,
      matricula: r.matricula,
      telefone: r.telefone,
      classe: r.classe,
      imagem: r.imagem,
      turmaId: r.turmaId,
      cursoId: r.cursoId,
      encarregadoId: r.encarregadoId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      turma: r.turmaId ? { id: r.turmaId, nome: r.turma_nome } : null,
      curso: r.cursoId ? { id: r.cursoId, nome: r.curso_nome } : null,
      encarregado: r.encarregadoId ? { id: r.encarregadoId, nome: r.encarregado_nome } : null
    });
  },
  
  findFirst: async (options) => {
    let sql = "SELECT * FROM alunos";
    const params = [];
    if (options.where && options.where.matricula) {
      sql += " WHERE matricula = ?";
      params.push(options.where.matricula);
    }
    sql += " LIMIT 1";
    const stmt = db.prepare(sql);
    return toJSON(stmt.get(...params));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO alunos (
        nome, matricula, telefone, classe, imagem, 
        turmaId, cursoId, encarregadoId, criadoEm, atualizadoEm
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.nome,
      data.matricula,
      data.telefone || null,
      data.classe || null,
      data.imagem || null,
      data.turmaId,
      data.cursoId,
      data.encarregadoId || null,
      agora,
      agora
    );
    
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const updates = [];
    const values = [];
    
    if (data.nome !== undefined) { updates.push("nome = ?"); values.push(data.nome); }
    if (data.matricula !== undefined) { updates.push("matricula = ?"); values.push(data.matricula); }
    if (data.telefone !== undefined) { updates.push("telefone = ?"); values.push(data.telefone); }
    if (data.classe !== undefined) { updates.push("classe = ?"); values.push(data.classe); }
    if (data.imagem !== undefined) { updates.push("imagem = ?"); values.push(data.imagem); }
    if (data.turmaId !== undefined) { updates.push("turmaId = ?"); values.push(data.turmaId); }
    if (data.cursoId !== undefined) { updates.push("cursoId = ?"); values.push(data.cursoId); }
    if (data.encarregadoId !== undefined) { updates.push("encarregadoId = ?"); values.push(data.encarregadoId); }
    
    updates.push("atualizadoEm = ?");
    values.push(agora);
    values.push(where.id);
    
    const sql = `UPDATE alunos SET ${updates.join(", ")} WHERE id = ?`;
    const stmt = db.prepare(sql);
    stmt.run(...values);
    
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO TURMA
// ============================================================
const turma = {
  findMany: async (options = {}) => {
    let sql = `
      SELECT t.*, u.nome as professor_nome
      FROM turmas t
      LEFT JOIN usuarios u ON t.professorId = u.id
    `;
    const params = [];
    
    if (options.where && options.where.professorId) {
      sql += " WHERE t.professorId = ?";
      params.push(options.where.professorId);
    }
    
    sql += " ORDER BY t.nome ASC";
    const stmt = db.prepare(sql);
    const results = stmt.all(...params);
    
    return toJSON(results.map(r => ({
      id: r.id,
      nome: r.nome,
      professorId: r.professorId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      professor: r.professorId ? { id: r.professorId, nome: r.professor_nome } : null,
      _count: { alunos: 0 }
    })));
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare(`
      SELECT t.*, u.nome as professor_nome
      FROM turmas t
      LEFT JOIN usuarios u ON t.professorId = u.id
      WHERE t.id = ?
    `);
    const r = stmt.get(options.where.id);
    if (!r) return null;
    
    return toJSON({
      id: r.id,
      nome: r.nome,
      professorId: r.professorId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      professor: r.professorId ? { id: r.professorId, nome: r.professor_nome } : null
    });
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO turmas (nome, professorId, criadoEm, atualizadoEm)
      VALUES (?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.nome,
      data.professorId || null,
      agora,
      agora
    );
    
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      UPDATE turmas SET nome = ?, professorId = ?, atualizadoEm = ? WHERE id = ?
    `);
    stmt.run(data.nome, data.professorId || null, agora, where.id);
    
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO CURSO
// ============================================================
const curso = {
  findMany: async () => {
    const stmt = db.prepare("SELECT * FROM cursos ORDER BY nome ASC");
    return toJSON(stmt.all());
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare("SELECT * FROM cursos WHERE id = ?");
    return toJSON(stmt.get(options.where.id));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO cursos (nome, descricao, criadoEm, atualizadoEm)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.nome, data.descricao || "", agora, agora);
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      UPDATE cursos SET nome = ?, descricao = ?, atualizadoEm = ? WHERE id = ?
    `);
    stmt.run(data.nome, data.descricao || "", agora, where.id);
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO DISCIPLINA
// ============================================================
const disciplina = {
  findMany: async (options = {}) => {
    let sql = `
      SELECT d.*, c.nome as curso_nome
      FROM disciplinas d
      LEFT JOIN cursos c ON d.cursoId = c.id
    `;
    const params = [];
    
    if (options.where) {
      const conditions = [];
      if (options.where.cursoId) {
        conditions.push("d.cursoId = ?");
        params.push(options.where.cursoId);
      }
      if (conditions.length) {
        sql += " WHERE " + conditions.join(" AND ");
      }
    }
    
    sql += " ORDER BY d.nome ASC";
    const stmt = db.prepare(sql);
    const results = stmt.all(...params);
    
    return toJSON(results.map(r => ({
      id: r.id,
      nome: r.nome,
      descricao: r.descricao,
      cursoId: r.cursoId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      curso: r.cursoId ? { id: r.cursoId, nome: r.curso_nome } : null,
      professores: [],
      _count: { notas: 0 }
    })));
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare(`
      SELECT d.*, c.nome as curso_nome
      FROM disciplinas d
      LEFT JOIN cursos c ON d.cursoId = c.id
      WHERE d.id = ?
    `);
    const r = stmt.get(options.where.id);
    if (!r) return null;
    
    return toJSON({
      id: r.id,
      nome: r.nome,
      descricao: r.descricao,
      cursoId: r.cursoId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      curso: r.cursoId ? { id: r.cursoId, nome: r.curso_nome } : null
    });
  },
  
  findFirst: async (options) => {
    let sql = "SELECT * FROM disciplinas";
    const params = [];
    if (options.where) {
      const conditions = [];
      if (options.where.nome && options.where.cursoId) {
        conditions.push("nome = ? AND cursoId = ?");
        params.push(options.where.nome, options.where.cursoId);
      }
      if (conditions.length) {
        sql += " WHERE " + conditions.join(" AND ");
      }
    }
    sql += " LIMIT 1";
    const stmt = db.prepare(sql);
    return toJSON(stmt.get(...params));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO disciplinas (nome, descricao, cursoId, criadoEm, atualizadoEm)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.nome, data.descricao || "", data.cursoId, agora, agora);
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const updates = [];
    const values = [];
    
    if (data.nome !== undefined) { updates.push("nome = ?"); values.push(data.nome); }
    if (data.descricao !== undefined) { updates.push("descricao = ?"); values.push(data.descricao); }
    if (data.cursoId !== undefined) { updates.push("cursoId = ?"); values.push(data.cursoId); }
    
    updates.push("atualizadoEm = ?");
    values.push(agora);
    values.push(where.id);
    
    const sql = `UPDATE disciplinas SET ${updates.join(", ")} WHERE id = ?`;
    const stmt = db.prepare(sql);
    stmt.run(...values);
    
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO NOTA
// ============================================================
const nota = {
  findMany: async (options = {}) => {
    let sql = `
      SELECT n.*, a.nome as aluno_nome, d.nome as disciplina_nome
      FROM notas n
      LEFT JOIN alunos a ON n.alunoId = a.id
      LEFT JOIN disciplinas d ON n.disciplinaId = d.id
    `;
    const params = [];
    
    if (options.where) {
      const conditions = [];
      if (options.where.alunoId) {
        conditions.push("n.alunoId = ?");
        params.push(options.where.alunoId);
      }
      if (options.where.disciplinaId) {
        conditions.push("n.disciplinaId = ?");
        params.push(options.where.disciplinaId);
      }
      if (options.where.tipo) {
        conditions.push("n.tipo = ?");
        params.push(options.where.tipo);
      }
      if (conditions.length) {
        sql += " WHERE " + conditions.join(" AND ");
      }
    }
    
    sql += " ORDER BY n.criadoEm DESC";
    const stmt = db.prepare(sql);
    const results = stmt.all(...params);
    
    return toJSON(results.map(r => ({
      id: r.id,
      valor: r.valor,
      tipo: r.tipo,
      alunoId: r.alunoId,
      disciplinaId: r.disciplinaId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      aluno: r.alunoId ? { id: r.alunoId, nome: r.aluno_nome } : null,
      disciplina: r.disciplinaId ? { id: r.disciplinaId, nome: r.disciplina_nome } : null
    })));
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare("SELECT * FROM notas WHERE id = ?");
    return toJSON(stmt.get(options.where.id));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO notas (valor, tipo, alunoId, disciplinaId, criadoEm, atualizadoEm)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.valor, data.tipo, data.alunoId, data.disciplinaId, agora, agora);
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      UPDATE notas SET valor = ?, tipo = ?, atualizadoEm = ? WHERE id = ?
    `);
    stmt.run(data.valor, data.tipo, agora, where.id);
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO AVISO
// ============================================================
const aviso = {
  findMany: async (options = {}) => {
    let sql = "SELECT * FROM avisos ORDER BY criadoEm DESC";
    if (options.take) {
      sql += " LIMIT ?";
      const stmt = db.prepare(sql);
      return toJSON(stmt.all(options.take));
    }
    const stmt = db.prepare(sql);
    return toJSON(stmt.all());
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare("SELECT * FROM avisos WHERE id = ?");
    return toJSON(stmt.get(options.where.id));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO avisos (titulo, conteudo, imagem, criadoEm, atualizadoEm)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.titulo, data.conteudo, data.imagem || null, agora, agora);
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      UPDATE avisos SET titulo = ?, conteudo = ?, imagem = ?, atualizadoEm = ? WHERE id = ?
    `);
    stmt.run(data.titulo, data.conteudo, data.imagem || null, agora, where.id);
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO EVENTO
// ============================================================
const evento = {
  findMany: async (options = {}) => {
    let sql = "SELECT * FROM eventos ORDER BY criadoEm DESC";
    if (options.take) {
      sql += " LIMIT ?";
      const stmt = db.prepare(sql);
      return toJSON(stmt.all(options.take));
    }
    const stmt = db.prepare(sql);
    return toJSON(stmt.all());
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare("SELECT * FROM eventos WHERE id = ?");
    return toJSON(stmt.get(options.where.id));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO eventos (titulo, descricao, imagem, criadoEm, atualizadoEm)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.titulo, data.descricao, data.imagem || null, agora, agora);
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      UPDATE eventos SET titulo = ?, descricao = ?, imagem = ?, atualizadoEm = ? WHERE id = ?
    `);
    stmt.run(data.titulo, data.descricao, data.imagem || null, agora, where.id);
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO REUNIAO
// ============================================================
const reuniao = {
  findMany: async (options = {}) => {
    let sql = `
      SELECT r.*, u.nome as criadoPor_nome
      FROM reunioes r
      LEFT JOIN usuarios u ON r.criadoPorId = u.id
    `;
    const params = [];
    
    if (options.where) {
      const conditions = [];
      if (options.where.criadoPorId) {
        conditions.push("r.criadoPorId = ?");
        params.push(options.where.criadoPorId);
      }
      if (options.where.dataHora && options.where.dataHora.gte) {
        conditions.push("r.dataHora >= ?");
        params.push(options.where.dataHora.gte.toISOString());
      }
      if (conditions.length) {
        sql += " WHERE " + conditions.join(" AND ");
      }
    }
    
    sql += " ORDER BY r.dataHora ASC";
    const stmt = db.prepare(sql);
    const results = stmt.all(...params);
    
    return toJSON(results.map(r => ({
      id: r.id,
      titulo: r.titulo,
      local: r.local,
      linkMeeting: r.linkMeeting,
      dataHora: r.dataHora,
      criadoPorId: r.criadoPorId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      criadoPor: r.criadoPorId ? { id: r.criadoPorId, nome: r.criadoPor_nome } : null,
      participantes: []
    })));
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare(`
      SELECT r.*, u.nome as criadoPor_nome
      FROM reunioes r
      LEFT JOIN usuarios u ON r.criadoPorId = u.id
      WHERE r.id = ?
    `);
    const r = stmt.get(options.where.id);
    if (!r) return null;
    
    // Buscar participantes
    const participantesStmt = db.prepare(`
      SELECT rp.*, u.nome as usuario_nome, u.email as usuario_email
      FROM reuniao_participantes rp
      LEFT JOIN usuarios u ON rp.usuarioId = u.id
      WHERE rp.reuniaoId = ?
    `);
    const participantes = participantesStmt.all(r.id);
    
    return toJSON({
      id: r.id,
      titulo: r.titulo,
      local: r.local,
      linkMeeting: r.linkMeeting,
      dataHora: r.dataHora,
      criadoPorId: r.criadoPorId,
      criadoEm: r.criadoEm,
      atualizadoEm: r.atualizadoEm,
      criadoPor: r.criadoPorId ? { id: r.criadoPorId, nome: r.criadoPor_nome } : null,
      participantes: participantes.map(p => ({
        id: p.id,
        reuniaoId: p.reuniaoId,
        usuarioId: p.usuarioId,
        usuario: p.usuarioId ? { id: p.usuarioId, nome: p.usuario_nome, email: p.usuario_email } : null
      }))
    });
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO reunioes (titulo, local, linkMeeting, dataHora, criadoPorId, criadoEm, atualizadoEm)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      data.titulo,
      data.local,
      data.linkMeeting || null,
      data.dataHora || null,
      data.criadoPorId || null,
      agora,
      agora
    );
    
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const updates = [];
    const values = [];
    
    if (data.titulo !== undefined) { updates.push("titulo = ?"); values.push(data.titulo); }
    if (data.local !== undefined) { updates.push("local = ?"); values.push(data.local); }
    if (data.linkMeeting !== undefined) { updates.push("linkMeeting = ?"); values.push(data.linkMeeting); }
    if (data.dataHora !== undefined) { updates.push("dataHora = ?"); values.push(data.dataHora); }
    
    updates.push("atualizadoEm = ?");
    values.push(agora);
    values.push(where.id);
    
    const sql = `UPDATE reunioes SET ${updates.join(", ")} WHERE id = ?`;
    const stmt = db.prepare(sql);
    stmt.run(...values);
    
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO REUNIAO PARTICIPANTE
// ============================================================
const reuniaoParticipante = {
  createMany: async (options) => {
    const { data } = options;
    let count = 0;
    for (const item of data) {
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO reuniao_participantes (reuniaoId, usuarioId)
        VALUES (?, ?)
      `);
      const info = stmt.run(item.reuniaoId, item.usuarioId);
      if (info.changes > 0) count++;
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
};

// ============================================================
// MODELO MENSAGEM
// ============================================================
const mensagem = {
  findMany: async (options = {}) => {
    let sql = `
      SELECT m.*, 
        r.nome as remetente_nome, r.email as remetente_email, r.perfil as remetente_perfil,
        d.nome as destinatario_nome, d.email as destinatario_email, d.perfil as destinatario_perfil
      FROM mensagens m
      LEFT JOIN usuarios r ON m.remetenteId = r.id
      LEFT JOIN usuarios d ON m.destinatarioId = d.id
    `;
    const params = [];
    
    if (options.where) {
      const conditions = [];
      if (options.where.remetenteId) {
        conditions.push("m.remetenteId = ?");
        params.push(options.where.remetenteId);
      }
      if (options.where.destinatarioId) {
        conditions.push("m.destinatarioId = ?");
        params.push(options.where.destinatarioId);
      }
      if (conditions.length) {
        sql += " WHERE " + conditions.join(" AND ");
      }
    }
    
    sql += " ORDER BY m.criadoEm ASC";
    const stmt = db.prepare(sql);
    const results = stmt.all(...params);
    
    return toJSON(results.map(r => ({
      id: r.id,
      conteudo: r.conteudo,
      remetenteId: r.remetenteId,
      destinatarioId: r.destinatarioId,
      arquivoUrl: r.arquivoUrl,
      arquivoNome: r.arquivoNome,
      arquivoTipo: r.arquivoTipo,
      arquivoTamanho: r.arquivoTamanho,
      editadoEm: r.editadoEm,
      deletadoParaRemetente: r.deletadoParaRemetente === 1,
      deletadoParaDestinatario: r.deletadoParaDestinatario === 1,
      criadoEm: r.criadoEm,
      remetente: r.remetenteId ? {
        id: r.remetenteId,
        nome: r.remetente_nome,
        email: r.remetente_email,
        perfil: r.remetente_perfil
      } : null,
      destinatario: r.destinatarioId ? {
        id: r.destinatarioId,
        nome: r.destinatario_nome,
        email: r.destinatario_email,
        perfil: r.destinatario_perfil
      } : null
    })));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO mensagens (
        conteudo, remetenteId, destinatarioId, 
        arquivoUrl, arquivoNome, arquivoTipo, arquivoTamanho,
        criadoEm
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.conteudo || "",
      data.remetenteId,
      data.destinatarioId,
      data.arquivoUrl || null,
      data.arquivoNome || null,
      data.arquivoTipo || null,
      data.arquivoTamanho || null,
      agora
    );
    
    return toJSON({ id: info.lastInsertRowid, ...data, criadoEm: agora });
  },
  
  update: async (options) => {
    const { where, data } = options;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      UPDATE mensagens SET conteudo = ?, editadoEm = ? WHERE id = ?
    `);
    stmt.run(data.conteudo, agora, where.id);
    
    return toJSON({ id: where.id, ...data });
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
};

// ============================================================
// MODELO FEEDBACK
// ============================================================
const feedback = {
  findMany: async () => {
    const stmt = db.prepare("SELECT * FROM feedbacks ORDER BY criadoEm DESC");
    return toJSON(stmt.all());
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO feedbacks (nome, email, assunto, mensagem, criadoEm)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.nome, data.email, data.assunto, data.mensagem, agora);
    return toJSON({ id: info.lastInsertRowid, ...data });
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
};

// ============================================================
// MODELO CODIGO PROFESSOR
// ============================================================
const codigoProfessor = {
  findMany: async () => {
    const stmt = db.prepare(`
      SELECT c.*, u.nome as professor_nome, u.email as professor_email
      FROM codigos_professor c
      LEFT JOIN usuarios u ON c.professorId = u.id
      ORDER BY c.criadoEm DESC
    `);
    const results = stmt.all();
    
    return toJSON(results.map(r => ({
      id: r.id,
      codigo: r.codigo,
      usado: r.usado === 1,
      professorId: r.professorId,
      criadoEm: r.criadoEm,
      professor: r.professorId ? {
        id: r.professorId,
        nome: r.professor_nome,
        email: r.professor_email
      } : null
    })));
  },
  
  findUnique: async (options) => {
    const stmt = db.prepare("SELECT * FROM codigos_professor WHERE codigo = ?");
    return toJSON(stmt.get(options.where.codigo));
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO codigos_professor (codigo, usado, criadoEm)
      VALUES (?, 0, ?)
    `);
    const info = stmt.run(data.codigo, agora);
    return toJSON({ id: info.lastInsertRowid, codigo: data.codigo, usado: false });
  },
  
  update: async (options) => {
    const { where, data } = options;
    
    const updates = [];
    const values = [];
    
    if (data.usado !== undefined) { updates.push("usado = ?"); values.push(data.usado ? 1 : 0); }
    if (data.professorId !== undefined) { updates.push("professorId = ?"); values.push(data.professorId); }
    
    if (updates.length === 0) return { success: true };
    
    values.push(where.codigo);
    const sql = `UPDATE codigos_professor SET ${updates.join(", ")} WHERE codigo = ?`;
    const stmt = db.prepare(sql);
    stmt.run(...values);
    
    return { success: true };
  },
  
  delete: async (options) => {
    const stmt = db.prepare("DELETE FROM codigos_professor WHERE id = ?");
    stmt.run(options.where.id);
    return { success: true };
  }
};

// ============================================================
// MODELO RELATORIO
// ============================================================
const relatorio = {
  findMany: async () => {
    const stmt = db.prepare("SELECT * FROM relatorios ORDER BY criadoEm DESC");
    return toJSON(stmt.all());
  },
  
  create: async (options) => {
    const data = options.data;
    const agora = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO relatorios (titulo, conteudo, criadoEm, atualizadoEm)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.titulo, data.conteudo, agora, agora);
    return toJSON({ id: info.lastInsertRowid, ...data });
  },
  
  delete: async (options) => {
    const stmt = db.prepare("DELETE FROM relatorios WHERE id = ?");
    stmt.run(options.where.id);
    return { success: true };
  }
};

// ============================================================
// EXPORTAÇÃO COMPLETA
// ============================================================
export const prisma = {
  $queryRaw: async (strings, ...values) => {
    const sql = strings.join("?");
    const stmt = db.prepare(sql);
    return stmt.all(...values);
  },
  
  $connect: async () => {
    console.log("✅ Conexão estabelecida");
    return true;
  },
  
  $disconnect: async () => {
    db.close();
    console.log("🔌 Conexão fechada");
    return true;
  },
  
  // Modelos
  usuario,
  aluno,
  turma,
  curso,
  disciplina,
  nota,
  mensagem,
  aviso,
  evento,
  reuniao,
  reuniaoParticipante,
  feedback,
  codigoProfessor,
  relatorio,
  
  // Transação (simplificada)
  $transaction: async (callback) => {
    db.prepare("BEGIN TRANSACTION").run();
    try {
      const result = await callback(prisma);
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