/**
 * serviceUsuario.js
 * Gestão completa de utilizadores — Professores, Encarregados e Admin.
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { hashSenha, compareSenha } from "../bcrypt-jwt/hashSenha.js";
import { JWT } from "../bcrypt-jwt/jwt.js";

// ── Constantes ────────────────────────────────────────────────
const RELACAO_MAP = {
  Pai: "PAI", Mãe: "MAE", Mae: "MAE", Mãe: "MAE",
  Tutor: "TUTOR", "Tutor Legal": "TUTOR",
  PAI: "PAI", MAE: "MAE", TUTOR: "TUTOR"
};

const PERFIL_MAP = {
  teacher: "PROFESSOR", parent: "ENCARREGADO",
  PROFESSOR: "PROFESSOR", ENCARREGADO: "ENCARREGADO", ADMIN: "ADMIN"
};

// ── Helpers ───────────────────────────────────────────────────
const toIds = (val) => {
  if (!val) return [];
  const arr = Array.isArray(val) ? val : [val];
  return arr.map(Number).filter(id => Number.isFinite(id) && id > 0);
};

const semSenha = ({ senha, ...resto }) => resto;

const includeCompleto = {
  disciplinas: { select: { id: true, nome: true, descricao: true } },
  turmas: { include: { alunos: { select: { id: true, nome: true, matricula: true } } } },
  cursos: { select: { id: true, nome: true, descricao: true } }
};

// Validação de email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ── Service ───────────────────────────────────────────────────
export class ServiceUsuario {

  static async criarUsuario(dados) {
    const {
      nome, email, senha, telefone, perfil: perfilRaw,
      imagem, relacaoEducando, numeroMatricula,
      codigoVerificacao, disciplinas, cursos, turmas
    } = dados;

    // Validações base
    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!email?.trim()) throw new Error("Email é obrigatório.");
    if (!senha) throw new Error("Senha é obrigatória.");
    if (!telefone?.trim()) throw new Error("Telefone é obrigatório.");
    if (!perfilRaw) throw new Error("Perfil é obrigatório.");
    
    if (!isValidEmail(email)) throw new Error("Email inválido.");
    if (senha.length < 6) throw new Error("Senha deve ter pelo menos 6 caracteres.");

    const perfil = PERFIL_MAP[perfilRaw] || perfilRaw;
    if (!["ADMIN", "PROFESSOR", "ENCARREGADO"].includes(perfil)) {
      throw new Error("Perfil inválido.");
    }

    const emailNorm = email.trim().toLowerCase();
    const relacao = relacaoEducando ? (RELACAO_MAP[relacaoEducando] ?? null) : null;

    // Validações por perfil
    if (perfil === "ENCARREGADO") {
      if (!numeroMatricula?.trim()) {
        throw new Error("Número de matrícula do aluno é obrigatório.");
      }
      if (!relacao || !["PAI", "MAE", "TUTOR"].includes(relacao)) {
        throw new Error("Relação inválida. Valores aceites: Pai, Mãe, Tutor.");
      }
    }

    let codigoFinal = null;
    if (perfil === "PROFESSOR") {
      if (!codigoVerificacao?.trim()) {
        throw new Error("Código de verificação obrigatório para professores.");
      }
      codigoFinal = codigoVerificacao.trim().toUpperCase();
      await ServiceUsuario._validarCodigo(codigoFinal);
    }

    // Verificar unicidade
    const [emailExists, telefoneExists] = await Promise.all([
      prisma.usuario.findUnique({ where: { email: emailNorm }, select: { id: true } }),
      prisma.usuario.findUnique({ where: { telefone: telefone.trim() }, select: { id: true } })
    ]);
    
    if (emailExists) throw new Error("Este email já está registado.");
    if (telefoneExists) throw new Error("Este telefone já está registado.");

    // Validar aluno para encarregado
    if (perfil === "ENCARREGADO") {
      const aluno = await prisma.aluno.findUnique({
        where: { matricula: numeroMatricula.trim() },
        select: { id: true }
      });
      if (!aluno) throw new Error("Nenhum aluno encontrado com essa matrícula.");
    }

    const senhaHash = await hashSenha(senha);
    const discIds = toIds(disciplinas);
    const curIds = toIds(cursos);
    const turmaIds = toIds(turmas);

    // Criação em transação
    return prisma.$transaction(async (tx) => {
      const usuario = await tx.usuario.create({
        data: {
          nome: nome.trim(),
          email: emailNorm,
          senha: senhaHash,
          telefone: telefone.trim(),
          perfil,
          imagem: imagem || null,
          relacaoEducando: perfil === "ENCARREGADO" ? relacao : null,
          codigoVerificacao: perfil === "PROFESSOR" ? codigoFinal : null,
          disciplinas: discIds.length ? { connect: discIds.map(id => ({ id })) } : undefined,
          cursos: curIds.length ? { connect: curIds.map(id => ({ id })) } : undefined
        },
        include: includeCompleto
      });

      // Marcar código como usado
      if (perfil === "PROFESSOR" && codigoFinal) {
        await tx.codigoProfessor.update({
          where: { codigo: codigoFinal },
          data: { usado: true, professorId: usuario.id }
        });
      }

      // Associar turmas ao professor
      if (perfil === "PROFESSOR" && turmaIds.length) {
        await tx.turma.updateMany({
          where: { id: { in: turmaIds } },
          data: { professorId: usuario.id }
        });
      }

      // Associar encarregado ao aluno
      if (perfil === "ENCARREGADO" && numeroMatricula) {
        await tx.aluno.update({
          where: { matricula: numeroMatricula.trim() },
          data: { encarregadoId: usuario.id }
        });
      }

      return semSenha(usuario);
    });
  }

  static async loginUsuario(email, senha) {
    if (!email?.trim()) throw new Error("Email é obrigatório.");
    if (!senha) throw new Error("Senha é obrigatória.");

    const emailNorm = email.trim().toLowerCase();
    const usuario = await prisma.usuario.findUnique({
      where: { email: emailNorm },
      include: includeCompleto
    });

    if (!usuario) throw new Error("Email ou senha inválidos.");
    
    const senhaValida = await compareSenha(senha, usuario.senha);
    if (!senhaValida) throw new Error("Email ou senha inválidos.");

    const token = JWT.gerarToken({
      id: usuario.id,
      email: usuario.email,
      perfil: usuario.perfil,
      nome: usuario.nome
    });

    return { usuario: semSenha(usuario), token };
  }

  static async listarUsuarios({ perfil } = {}) {
    const where = perfil ? { perfil } : undefined;
    const usuarios = await prisma.usuario.findMany({
      where,
      include: includeCompleto,
      orderBy: { nome: "asc" }
    });
    return usuarios.map(semSenha);
  }

  static async listarUsuarioPorId(id) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: includeCompleto
    });
    if (!usuario) throw new Error("Utilizador não encontrado.");
    return semSenha(usuario);
  }

  static async atualizarUsuario(id, dados) {
    const {
      nome, email, senha, telefone, perfil: perfilRaw,
      imagem, relacaoEducando, numeroMatricula,
      codigoVerificacao, disciplinas, cursos
    } = dados;

    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!usuario) throw new Error("Utilizador não encontrado.");

    const perfil = perfilRaw ? (PERFIL_MAP[perfilRaw] || perfilRaw) : usuario.perfil;
    const relacao = relacaoEducando ? (RELACAO_MAP[relacaoEducando] ?? usuario.relacaoEducando) : usuario.relacaoEducando;

    // Gestão de código de professor
    let codigoFinal = usuario.codigoVerificacao;
    if (perfil === "PROFESSOR" && codigoVerificacao !== undefined) {
      const novoCodigo = codigoVerificacao?.trim().toUpperCase();
      if (novoCodigo && novoCodigo !== usuario.codigoVerificacao) {
        await ServiceUsuario._validarCodigo(novoCodigo);
        if (usuario.codigoVerificacao) {
          await ServiceUsuario._liberarCodigo(usuario.codigoVerificacao);
        }
        await ServiceUsuario._associarCodigo(novoCodigo, usuario.id);
        codigoFinal = novoCodigo;
      }
    } else if (perfil !== "PROFESSOR" && usuario.codigoVerificacao) {
      await ServiceUsuario._liberarCodigo(usuario.codigoVerificacao);
      codigoFinal = null;
    }

    // Validar email único (se alterado)
    if (email && email !== usuario.email) {
      const emailNorm = email.trim().toLowerCase();
      const exists = await prisma.usuario.findUnique({ where: { email: emailNorm }, select: { id: true } });
      if (exists) throw new Error("Este email já está registado.");
    }

    // Validar telefone único (se alterado)
    if (telefone && telefone !== usuario.telefone) {
      const exists = await prisma.usuario.findUnique({ where: { telefone: telefone.trim() }, select: { id: true } });
      if (exists) throw new Error("Este telefone já está registado.");
    }

    const senhaHash = senha ? await hashSenha(senha) : usuario.senha;
    const emailNorm = email?.trim().toLowerCase() ?? usuario.email;
    const discIds = toIds(disciplinas);
    const curIds = toIds(cursos);

    return prisma.$transaction(async (tx) => {
      const atualizado = await tx.usuario.update({
        where: { id: Number(id) },
        data: {
          nome: nome?.trim() ?? usuario.nome,
          email: emailNorm,
          senha: senhaHash,
          telefone: telefone?.trim() ?? usuario.telefone,
          perfil,
          imagem: imagem ?? usuario.imagem,
          relacaoEducando: perfil === "ENCARREGADO" ? relacao : null,
          codigoVerificacao: perfil === "PROFESSOR" ? codigoFinal : null,
          disciplinas: discIds.length ? { set: discIds.map(id => ({ id })) } : undefined,
          cursos: curIds.length ? { set: curIds.map(id => ({ id })) } : undefined
        },
        include: includeCompleto
      });

      // Atualizar relação encarregado-aluno
      if (perfil === "ENCARREGADO" && numeroMatricula) {
        await tx.aluno.update({
          where: { matricula: String(numeroMatricula).trim() },
          data: { encarregadoId: atualizado.id }
        });
      }

      return semSenha(atualizado);
    });
  }

  static async deletarUsuario(id) {
    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!usuario) throw new Error("Utilizador não encontrado.");

    return prisma.$transaction(async (tx) => {
      // Liberar código de professor
      if (usuario.codigoVerificacao) {
        await tx.codigoProfessor.updateMany({
          where: { codigo: usuario.codigoVerificacao },
          data: { usado: false, professorId: null }
        });
      }

      // Remover associações de encarregado
      if (usuario.perfil === "ENCARREGADO") {
        await tx.aluno.updateMany({
          where: { encarregadoId: usuario.id },
          data: { encarregadoId: null }
        });
      }

      // Remover turmas se for professor
      if (usuario.perfil === "PROFESSOR") {
        await tx.turma.updateMany({
          where: { professorId: usuario.id },
          data: { professorId: null }
        });
      }

      await tx.usuario.delete({ where: { id: usuario.id } });
      return { mensagem: "Utilizador removido com sucesso." };
    });
  }

  // ── Códigos de Professor ───────────────────────────────────
  static async criarCodigoProfessor(codigo) {
    const c = codigo?.trim().toUpperCase();
    if (!c) throw new Error("Código inválido.");
    if (c.length < 4 || c.length > 20) {
      throw new Error("Código deve ter entre 4 e 20 caracteres.");
    }
    
    const exists = await prisma.codigoProfessor.findUnique({ where: { codigo: c } });
    if (exists) throw new Error("Código já existe.");
    
    return prisma.codigoProfessor.create({ data: { codigo: c } });
  }

  static async listarCodigosProfessor() {
    return prisma.codigoProfessor.findMany({
      include: {
        professor: {
          select: { id: true, nome: true, email: true, telefone: true, perfil: true, imagem: true }
        }
      },
      orderBy: { criadoEm: "desc" }
    });
  }

  static async deletarCodigoProfessor(id) {
    const codigo = await prisma.codigoProfessor.findUnique({ where: { id: Number(id) } });
    if (!codigo) throw new Error("Código não encontrado.");
    if (codigo.usado) throw new Error("Não é possível remover um código já utilizado.");
    
    await prisma.codigoProfessor.delete({ where: { id: Number(id) } });
    return { mensagem: "Código removido com sucesso." };
  }

  // ── Helpers privados ────────────────────────────────────────
  static async _validarCodigo(codigo) {
    const reg = await prisma.codigoProfessor.findUnique({ where: { codigo } });
    if (!reg) throw new Error("Código de professor não encontrado.");
    if (reg.usado) throw new Error("Este código já foi utilizado.");
    return reg;
  }

  static async _liberarCodigo(codigo) {
    await prisma.codigoProfessor.updateMany({
      where: { codigo },
      data: { usado: false, professorId: null }
    });
  }

  static async _associarCodigo(codigo, professorId) {
    await prisma.codigoProfessor.update({
      where: { codigo },
      data: { usado: true, professorId }
    });
  }
}