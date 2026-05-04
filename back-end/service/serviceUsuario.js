/**
 * serviceUsuario.js
 * Gestão completa de utilizadores — Professores, Encarregados e Admin.
 */
import { prisma }                    from "../prismaClient/prismaClient.js";
import { hashSenha, compareSenha }   from "../bcrypt-jwt/hashSenha.js";
import { JWT }                       from "../bcrypt-jwt/jwt.js";

// ── Constantes ────────────────────────────────────────────────
const RELACAO_MAP = {
  Pai:          "PAI",
  Mãe:          "MAE",
  Mae:          "MAE",
  Mãe:          "MAE",
  Tutor:        "TUTOR",
  "Tutor Legal":"TUTOR",
  PAI:          "PAI",
  MAE:          "MAE",
  TUTOR:        "TUTOR",
};

const PERFIL_MAP = {
  teacher:     "PROFESSOR",
  parent:      "ENCARREGADO",
  PROFESSOR:   "PROFESSOR",
  ENCARREGADO: "ENCARREGADO",
  ADMIN:       "ADMIN",
};

// ── Helpers ───────────────────────────────────────────────────
const toIds = (val) =>
  val ? (Array.isArray(val) ? val : [val]).map(Number).filter(Number.isFinite) : [];

const semSenha = ({ senha, ...resto }) => resto;

const includeCompleto = {
  disciplinas: true,
  turmas:      { include: { alunos: { select: { id: true, nome: true } } } },
  cursos:      true,
};

// ── Service ───────────────────────────────────────────────────
export class ServiceUsuario {

  // ── CRIAR ─────────────────────────────────────────────────
  static async criarUsuario(dados) {
    const {
      nome, email, senha, telefone, perfil: perfilRaw,
      imagem, relacaoEducando, numeroMatricula,
      codigoVerificacao, disciplinas, cursos, turmas,
    } = dados;

    // Validações base
    if (!nome?.trim() || !email?.trim() || !senha || !telefone?.trim() || !perfilRaw)
      throw new Error("Campos obrigatórios: nome, email, senha, telefone, perfil.");

    const perfil    = PERFIL_MAP[perfilRaw] || perfilRaw;
    const emailNorm = email.trim().toLowerCase();
    const relacao   = relacaoEducando ? (RELACAO_MAP[relacaoEducando] ?? null) : null;

    // Validações por perfil
    if (perfil === "ENCARREGADO") {
      if (!numeroMatricula?.trim())
        throw new Error("Número de matrícula do aluno é obrigatório.");
      if (!relacao || !["PAI", "MAE", "TUTOR"].includes(relacao))
        throw new Error("Relação inválida. Valores aceites: Pai, Mãe, Tutor.");
    }

    let codigoFinal = null;
    if (perfil === "PROFESSOR") {
      if (!codigoVerificacao?.trim())
        throw new Error("Código de verificação obrigatório para professores.");
      codigoFinal = codigoVerificacao.trim().toUpperCase();
      await ServiceUsuario._validarCodigo(codigoFinal);
    }

    // Unicidade
    if (await prisma.usuario.findUnique({ where: { email: emailNorm } }))
      throw new Error("Este email já está registado.");
    if (await prisma.usuario.findUnique({ where: { telefone: telefone.trim() } }))
      throw new Error("Este telefone já está registado.");

    // Valida matrícula se for encarregado
    if (perfil === "ENCARREGADO") {
      const aluno = await prisma.aluno.findUnique({ where: { matricula: numeroMatricula.trim() } });
      if (!aluno) throw new Error("Nenhum aluno encontrado com essa matrícula.");
    }

    const senhaHash = await hashSenha(senha);

    // Criação em transação
    const usuario = await prisma.$transaction(async (tx) => {
      const discIds = toIds(disciplinas);
      const curIds  = toIds(cursos);

      const u = await tx.usuario.create({
        data: {
          nome:              nome.trim(),
          email:             emailNorm,
          senha:             senhaHash,
          telefone:          telefone.trim(),
          perfil,
          imagem:            imagem || null,
          relacaoEducando:   perfil === "ENCARREGADO" ? relacao : null,
          codigoVerificacao: perfil === "PROFESSOR"   ? codigoFinal : null,
          disciplinas: discIds.length ? { connect: discIds.map(id => ({ id })) } : undefined,
          cursos:      curIds.length  ? { connect: curIds.map(id => ({ id }))  } : undefined,
        },
        include: includeCompleto,
      });

      if (perfil === "PROFESSOR") {
        await tx.codigoProfessor.update({
          where: { codigo: codigoFinal },
          data:  { usado: true, professorId: u.id },
        });
      }

      return u;
    });

    // Associar turmas ao professor
    if (perfil === "PROFESSOR") {
      const turmaIds = toIds(turmas);
      if (turmaIds.length)
        await prisma.turma.updateMany({ where: { id: { in: turmaIds } }, data: { professorId: usuario.id } });
    }

    // Associar encarregado ao aluno
    if (perfil === "ENCARREGADO") {
      await prisma.aluno.update({
        where: { matricula: numeroMatricula.trim() },
        data:  { encarregadoId: usuario.id },
      });
    }

    return semSenha(usuario);
  }

  // ── LOGIN ──────────────────────────────────────────────────
  static async loginUsuario(email, senha) {
    if (!email?.trim()) throw new Error("Email é obrigatório.");
    if (!senha)         throw new Error("Senha é obrigatória.");

    const emailNorm = email.trim().toLowerCase();
    const usuario   = await prisma.usuario.findUnique({
      where:   { email: emailNorm },
      include: includeCompleto,
    });

    if (!usuario || !(await compareSenha(senha, usuario.senha)))
      throw new Error("Email ou senha inválidos.");

    const token = JWT.gerarToken({ id: usuario.id, email: usuario.email, perfil: usuario.perfil });
    return { usuario: semSenha(usuario), token };
  }

  // ── LISTAR TODOS ───────────────────────────────────────────
  static async listarUsuarios({ perfil } = {}) {
    const where = perfil ? { perfil } : undefined;
    const lista = await prisma.usuario.findMany({
      where,
      include:  includeCompleto,
      orderBy: { nome: "asc" },
    });
    return lista.map(semSenha);
  }

  // ── OBTER POR ID ───────────────────────────────────────────
  static async listarUsuarioPorId(id) {
    const u = await prisma.usuario.findUnique({
      where:   { id: Number(id) },
      include: includeCompleto,
    });
    if (!u) throw new Error("Utilizador não encontrado.");
    return semSenha(u);
  }

  // ── ACTUALIZAR ─────────────────────────────────────────────
  static async atualizarUsuario(id, dados) {
    const {
      nome, email, senha, telefone, perfil: perfilRaw,
      imagem, relacaoEducando, numeroMatricula,
      codigoVerificacao, disciplinas, cursos,
    } = dados;

    const u = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!u) throw new Error("Utilizador não encontrado.");

    const perfil  = perfilRaw ? (PERFIL_MAP[perfilRaw] || perfilRaw) : u.perfil;
    const relacao = relacaoEducando ? (RELACAO_MAP[relacaoEducando] ?? u.relacaoEducando) : u.relacaoEducando;

    // Gestão de código de professor
    let codigoFinal = u.codigoVerificacao;
    if (perfil === "PROFESSOR" && codigoVerificacao !== undefined) {
      const novoCodigo = codigoVerificacao?.trim().toUpperCase();
      if (novoCodigo && novoCodigo !== u.codigoVerificacao) {
        await ServiceUsuario._validarCodigo(novoCodigo);
        if (u.codigoVerificacao) await ServiceUsuario._liberarCodigo(u.codigoVerificacao);
        await ServiceUsuario._associarCodigo(novoCodigo, u.id);
        codigoFinal = novoCodigo;
      }
    } else if (perfil !== "PROFESSOR" && u.codigoVerificacao) {
      await ServiceUsuario._liberarCodigo(u.codigoVerificacao);
      codigoFinal = null;
    }

    if (perfil === "ENCARREGADO" && numeroMatricula) {
      const aluno = await prisma.aluno.findUnique({ where: { matricula: String(numeroMatricula).trim() } });
      if (!aluno) throw new Error("Aluno com esta matrícula não encontrado.");
    }

    const senhaHash      = senha ? await hashSenha(senha) : u.senha;
    const emailNorm      = email?.trim().toLowerCase() ?? u.email;
    const discIds        = toIds(disciplinas);
    const curIds         = toIds(cursos);

    const atualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        nome:              nome?.trim()   ?? u.nome,
        email:             emailNorm,
        senha:             senhaHash,
        telefone:          telefone?.trim() ?? u.telefone,
        perfil,
        imagem:            imagem ?? u.imagem,
        relacaoEducando:   perfil === "ENCARREGADO" ? relacao : null,
        codigoVerificacao: perfil === "PROFESSOR"   ? codigoFinal : null,
        disciplinas:       discIds.length ? { set: discIds.map(id => ({ id })) } : undefined,
        cursos:            curIds.length  ? { set: curIds.map(id => ({ id }))  } : undefined,
      },
      include: includeCompleto,
    });

    if (perfil === "ENCARREGADO" && numeroMatricula) {
      await prisma.aluno.update({
        where: { matricula: String(numeroMatricula).trim() },
        data:  { encarregadoId: atualizado.id },
      });
    }

    return semSenha(atualizado);
  }

  // ── DELETAR ────────────────────────────────────────────────
  static async deletarUsuario(id) {
    const u = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!u) throw new Error("Utilizador não encontrado.");

    // Liberar código de professor antes de apagar
    if (u.codigoVerificacao) await ServiceUsuario._liberarCodigo(u.codigoVerificacao);

    await prisma.usuario.delete({ where: { id: Number(id) } });
    return { mensagem: "Utilizador removido com sucesso." };
  }

  // ── CÓDIGOS DE PROFESSOR ───────────────────────────────────
  static async criarCodigoProfessor(codigo) {
    const c = codigo?.trim().toUpperCase();
    if (!c) throw new Error("Código inválido.");
    if (await prisma.codigoProfessor.findUnique({ where: { codigo: c } }))
      throw new Error("Código já existe.");
    return prisma.codigoProfessor.create({ data: { codigo: c } });
  }

  static async listarCodigosProfessor() {
    return prisma.codigoProfessor.findMany({
      include: {
        professor: {
          select: { id: true, nome: true, email: true, telefone: true, perfil: true, imagem: true },
        },
      },
      orderBy: { criadoEm: "desc" },
    });
  }

  static async deletarCodigoProfessor(id) {
    const c = await prisma.codigoProfessor.findUnique({ where: { id: Number(id) } });
    if (!c) throw new Error("Código não encontrado.");
    if (c.usado) throw new Error("Não é possível remover um código já utilizado.");
    await prisma.codigoProfessor.delete({ where: { id: Number(id) } });
    return { mensagem: "Código removido." };
  }

  // ── Helpers privados ────────────────────────────────────────
  static async _validarCodigo(codigo) {
    const reg = await prisma.codigoProfessor.findUnique({ where: { codigo } });
    if (!reg)     throw new Error("Código de professor não encontrado.");
    if (reg.usado) throw new Error("Este código já foi utilizado.");
    return reg;
  }

  static async _liberarCodigo(codigo) {
    await prisma.codigoProfessor.updateMany({
      where: { codigo },
      data:  { usado: false, professorId: null },
    });
  }

  static async _associarCodigo(codigo, professorId) {
    await prisma.codigoProfessor.update({
      where: { codigo },
      data:  { usado: true, professorId },
    });
  }
}