/**
 * serviceUsuario.js
 * Versão Corrigida e Blindada
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { hashSenha, compareSenha } from "../bcrypt-jwt/hashSenha.js";
import { JWT } from "../bcrypt-jwt/jwt.js";

const RELACAO_MAP = {
  "Pai": "PAI",
  "Mãe": "MAE",
  "Mae": "MAE",
  "Tutor": "TUTOR",
  "Tutor Legal": "TUTOR",
};

const toConnect = (val) =>
  val ? (Array.isArray(val) ? val : [val]).map(id => ({ id: Number(id) })) : undefined;

const semSenha = ({ senha, ...rest }) => rest;

export class ServiceUsuario {

  // ──────────────────────────────────────────────────────────
  // CRIAR UTILIZADOR (Refatorado)
  // ──────────────────────────────────────────────────────────
  static async criarUsuario(dados) {
    const {
      nome, email, senha, telefone, perfil, imagem,
      relacaoEducando, numeroMatricula,
      codigoVerificacao, disciplinas, cursos, turmas,
    } = dados;

    // Proteção contra campos undefined/null antes de usar trim()
    if (!nome || typeof nome !== 'string' || !nome.trim() ||
        !email || typeof email !== 'string' || !email.trim() ||
        !senha || !telefone || !perfil) {
      throw new Error("Campos obrigatórios: nome, email, senha, telefone, perfil.");
    }

    const relacao = relacaoEducando
      ? (RELACAO_MAP[relacaoEducando] || relacaoEducando)
      : null;

    if (perfil === "ENCARREGADO") {
      if (!numeroMatricula || typeof numeroMatricula !== 'string' || !numeroMatricula.trim()) 
        throw new Error("Número de matrícula do aluno obrigatório.");
      if (!relacao) throw new Error("Relação com o educando obrigatória.");
      if (!["PAI","MAE","TUTOR"].includes(relacao))
        throw new Error("Relação inválida. Use: Pai, Mãe ou Tutor.");
    }

    let codigoFinal = null;
    if (perfil === "PROFESSOR") {
      if (!codigoVerificacao || typeof codigoVerificacao !== 'string' || !codigoVerificacao.trim()) 
        throw new Error("Código de verificação obrigatório.");
      codigoFinal = codigoVerificacao.trim().toUpperCase();
      await ServiceUsuario._validarCodigo(codigoFinal);
    }

    const emailNorm = email.trim().toLowerCase();

    if (await prisma.usuario.findUnique({ where: { email: emailNorm } }))
      throw new Error("Email já cadastrado.");
    
    if (await prisma.usuario.findUnique({ where: { telefone } }))
      throw new Error("Telefone já cadastrado.");

    if (perfil === "ENCARREGADO") {
      const aluno = await prisma.aluno.findUnique({ where: { matricula: numeroMatricula.trim() } });
      if (!aluno) throw new Error("Aluno com esta matrícula não encontrado.");
    }

    const senhaHash = await hashSenha(senha);

    const usuario = await prisma.$transaction(async (tx) => {
      const u = await tx.usuario.create({
        data: {
          nome: nome.trim(),
          email: emailNorm,
          senha: senhaHash,
          telefone,
          perfil,
          imagem: imagem || null,
          relacaoEducando: perfil === "ENCARREGADO" ? relacao : null,
          codigoVerificacao: perfil === "PROFESSOR" ? codigoFinal : null,
          disciplinas: disciplinas ? { connect: toConnect(disciplinas) } : undefined,
          cursos: cursos ? { connect: toConnect(cursos) } : undefined,
        },
        include: { disciplinas: true, turmas: true, cursos: true },
      });

      if (perfil === "PROFESSOR") {
        await tx.codigoProfessor.update({
          where: { codigo: codigoFinal },
          data: { usado: true, professorId: u.id },
        });
      }
      return u;
    });

    if (perfil === "PROFESSOR" && turmas) {
      const ids = (Array.isArray(turmas) ? turmas : [turmas]).map(Number).filter(Boolean);
      if (ids.length)
        await prisma.turma.updateMany({ where: { id: { in: ids } }, data: { professorId: usuario.id } });
    }

    if (perfil === "ENCARREGADO") {
      await prisma.aluno.update({
        where: { matricula: numeroMatricula.trim() },
        data: { encarregadoId: usuario.id },
      });
    }

    return semSenha(usuario);
  }

  // ──────────────────────────────────────────────────────────
  // LOGIN (Refatorado - Resolve o erro do .replace/.trim)
  // ──────────────────────────────────────────────────────────
  static async loginUsuario(email, senha) {
    // Validação inicial para impedir erros de undefined
    if (!email || typeof email !== 'string' || !email.trim()) {
      throw new Error("O campo email é obrigatório e deve ser um texto.");
    }
    if (!senha) {
      throw new Error("O campo senha é obrigatório.");
    }

    const emailNorm = email.trim().toLowerCase();

    const usuario = await prisma.usuario.findUnique({
      where: { email: emailNorm },
      include: { disciplinas: true, turmas: true, cursos: true },
    });

    if (!usuario || !await compareSenha(senha, usuario.senha))
      throw new Error("Email ou senha inválidos.");

    const token = JWT.gerarToken({ id: usuario.id, email: usuario.email, perfil: usuario.perfil });
    return { usuario: semSenha(usuario), token };
  }

  // ──────────────────────────────────────────────────────────
  // ACTUALIZAR (Refatorado)
  // ──────────────────────────────────────────────────────────
  static async atualizarUsuario(id, dados) {
    const {
      nome, email, senha, telefone, perfil, imagem,
      relacaoEducando, numeroMatricula,
      codigoVerificacao, disciplinas, cursos,
    } = dados;

    const u = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!u) throw new Error("Usuário não encontrado.");

    const perfilFinal = perfil ?? u.perfil;
    const relacao = relacaoEducando
      ? (RELACAO_MAP[relacaoEducando] || relacaoEducando)
      : null;

    if (perfilFinal === "ENCARREGADO" && numeroMatricula) {
      const a = await prisma.aluno.findUnique({ where: { matricula: String(numeroMatricula).trim() } });
      if (!a) throw new Error("Aluno com esta matrícula não encontrado.");
    }

    let codigoFinal = u.codigoVerificacao;
    if (perfilFinal === "PROFESSOR" && codigoVerificacao !== undefined) {
      if (typeof codigoVerificacao === 'string') {
        const c = codigoVerificacao.trim().toUpperCase();
        if (c !== u.codigoVerificacao) {
          await ServiceUsuario._validarCodigo(c);
          if (u.codigoVerificacao) await ServiceUsuario._liberarCodigo(u.codigoVerificacao);
          await ServiceUsuario._associarCodigo(c, u.id);
          codigoFinal = c;
        }
      }
    } else if (perfilFinal !== "PROFESSOR") {
      if (u.codigoVerificacao) await ServiceUsuario._liberarCodigo(u.codigoVerificacao);
      codigoFinal = null;
    }

    const senhaHash = senha ? await hashSenha(senha) : u.senha;

    const atualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        nome: nome ? nome.trim() : u.nome,
        email: (email && typeof email === 'string') ? email.trim().toLowerCase() : u.email,
        senha: senhaHash,
        telefone: telefone ?? u.telefone,
        perfil: perfilFinal,
        imagem: imagem ?? u.imagem,
        relacaoEducando: perfilFinal === "ENCARREGADO" ? (relacao || u.relacaoEducando) : null,
        codigoVerificacao: perfilFinal === "PROFESSOR" ? codigoFinal : null,
        disciplinas: disciplinas ? { set: toConnect(disciplinas) } : undefined,
        cursos: cursos ? { set: toConnect(cursos) } : undefined,
      },
      include: { disciplinas: true, turmas: true, cursos: true },
    });

    if (perfilFinal === "ENCARREGADO" && numeroMatricula) {
      await prisma.aluno.update({
        where: { matricula: String(numeroMatricula).trim() },
        data: { encarregadoId: atualizado.id },
      });
    }

    return semSenha(atualizado);
  }

  // ... (restante dos métodos listar e deletar permanecem iguais)
  static async listarUsuarios() {
    const lista = await prisma.usuario.findMany({
      include: { disciplinas: true, turmas: true, cursos: true },
    });
    return lista.map(semSenha);
  }

  static async listarUsuarioPorId(id) {
    const u = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: { disciplinas: true, turmas: true, cursos: true },
    });
    if (!u) throw new Error("Usuário não encontrado.");
    return semSenha(u);
  }

  static async deletarUsuario(id) {
    const u = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!u) throw new Error("Usuário não encontrado.");
    await prisma.usuario.delete({ where: { id: Number(id) } });
    return { mensagem: "Usuário deletado com sucesso." };
  }

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
          select: { id:true, nome:true, email:true, telefone:true, perfil:true, imagem:true, codigoVerificacao:true },
        },
      },
      orderBy: { criadoEm: "desc" },
    });
  }

  static async _validarCodigo(codigo) {
    const reg = await prisma.codigoProfessor.findUnique({ where: { codigo } });
    if (!reg) throw new Error("Código de professor não existe.");
    if (reg.usado) throw new Error("Código já foi utilizado.");
    return reg;
  }

  static async _liberarCodigo(codigo) {
    await prisma.codigoProfessor.updateMany({
      where: { codigo },
      data: { usado: false, professorId: null },
    });
  }

  static async _associarCodigo(codigo, professorId) {
    await prisma.codigoProfessor.update({
      where: { codigo },
      data: { usado: true, professorId },
    });
  }
}