import { prisma } from "../prismaClient/prismaClient.js";
import { hashSenha, compareSenha } from "../bcrypt-jwt/hashSenha.js";
import { JWT } from "../bcrypt-jwt/jwt.js";

const RELACAO_MAP = {
  Pai: "PAI", Mãe: "MAE", Mae: "MAE", Tutor: "TUTOR", "Tutor Legal": "TUTOR",
  PAI: "PAI", MAE: "MAE", TUTOR: "TUTOR"
};

const PERFIL_MAP = {
  teacher: "PROFESSOR", parent: "ENCARREGADO",
  PROFESSOR: "PROFESSOR", ENCARREGADO: "ENCARREGADO", ADMIN: "ADMIN"
};

const toIds = (val) => {
  if (!val) return [];
  const arr = Array.isArray(val) ? val : [val];
  return arr.map(Number).filter(id => Number.isFinite(id) && id > 0);
};

const semSenha = ({ senha, ...resto }) => resto;

export class ServiceUsuario {

  static async criarUsuario(dados) {
    const {
      nome, email, senha, telefone, perfil: perfilRaw,
      imagem, relacaoEducando, numeroMatricula,
      codigoVerificacao, disciplinas, cursos, turmas
    } = dados;

    if (!nome?.trim()) throw new Error("Nome é obrigatório.");
    if (!email?.trim()) throw new Error("Email é obrigatório.");
    if (!senha) throw new Error("Senha é obrigatória.");
    if (!telefone?.trim()) throw new Error("Telefone é obrigatório.");
    if (!perfilRaw) throw new Error("Perfil é obrigatório.");

    const perfil = PERFIL_MAP[perfilRaw] || perfilRaw;
    const emailNorm = email.trim().toLowerCase();
    const relacao = relacaoEducando ? (RELACAO_MAP[relacaoEducando] ?? null) : null;

    if (perfil === "ENCARREGADO") {
      if (!numeroMatricula?.trim()) throw new Error("Número de matrícula do aluno é obrigatório.");
    }

    let codigoFinal = null;
    if (perfil === "PROFESSOR") {
      if (!codigoVerificacao?.trim()) throw new Error("Código de verificação obrigatório.");
      codigoFinal = codigoVerificacao.trim().toUpperCase();
      const codigoValido = await ServiceUsuario._validarCodigo(codigoFinal);
      if (!codigoValido) throw new Error("Código de verificação inválido ou já usado.");
    }

    const emailExists = await prisma.usuario.findFirst({ where: { email: emailNorm } });
    if (emailExists) throw new Error("Este email já está registado.");

    const telefoneExists = await prisma.usuario.findFirst({ where: { telefone: telefone.trim() } });
    if (telefoneExists) throw new Error("Este telefone já está registado.");

    const senhaHash = await hashSenha(senha);
    const discIds = toIds(disciplinas);
    const curIds = toIds(cursos);
    const turmaIds = toIds(turmas);

    const usuario = await prisma.usuario.create({
      data: {
        nome: nome.trim(),
        email: emailNorm,
        senha: senhaHash,
        telefone: telefone.trim(),
        perfil,
        imagem: imagem || null,
        relacaoEducando: perfil === "ENCARREGADO" ? relacao : null,
        codigoVerificacao: perfil === "PROFESSOR" ? codigoFinal : null
      }
    });

    if (perfil === "PROFESSOR" && codigoFinal) {
      await prisma.codigoProfessor.update({
        where: { codigo: codigoFinal },
        data: { usado: true, professorId: usuario.id }
      });
    }

    if (perfil === "ENCARREGADO" && numeroMatricula) {
      const aluno = await prisma.aluno.findFirst({ where: { matricula: numeroMatricula.trim() } });
      if (aluno) {
        await prisma.aluno.update({
          where: { id: aluno.id },
          data: { encarregadoId: usuario.id }
        });
      }
    }

    return semSenha(usuario);
  }

  static async loginUsuario(email, senha) {
    if (!email?.trim()) throw new Error("Email é obrigatório.");
    if (!senha) throw new Error("Senha é obrigatória.");

    const emailNorm = email.trim().toLowerCase();
    const usuario = await prisma.usuario.findFirst({ where: { email: emailNorm } });

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
    const where = perfil ? { perfil } : {};
    const usuarios = await prisma.usuario.findMany({ where });
    return usuarios.map(semSenha);
  }

  static async listarUsuarioPorId(id) {
    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!usuario) throw new Error("Utilizador não encontrado.");
    return semSenha(usuario);
  }

  static async atualizarUsuario(id, dados) {
    const { nome, email, senha, telefone, perfil, imagem, relacaoEducando, codigoVerificacao } = dados;
    
    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!usuario) throw new Error("Utilizador não encontrado.");

    const updateData = {};
    if (nome) updateData.nome = nome.trim();
    if (email) updateData.email = email.trim().toLowerCase();
    if (telefone) updateData.telefone = telefone.trim();
    if (perfil) updateData.perfil = perfil;
    if (imagem !== undefined) updateData.imagem = imagem;
    if (relacaoEducando !== undefined) updateData.relacaoEducando = relacaoEducando;
    if (codigoVerificacao !== undefined) updateData.codigoVerificacao = codigoVerificacao;
    if (senha) updateData.senha = await hashSenha(senha);

    const atualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: updateData
    });
    return semSenha(atualizado);
  }

  static async deletarUsuario(id) {
    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    if (!usuario) throw new Error("Utilizador não encontrado.");
    
    if (usuario.codigoVerificacao) {
      await prisma.codigoProfessor.updateMany({
        where: { codigo: usuario.codigoVerificacao },
        data: { usado: false, professorId: null }
      });
    }
    
    await prisma.usuario.delete({ where: { id: Number(id) } });
    return { mensagem: "Utilizador removido com sucesso." };
  }

  static async criarCodigoProfessor(codigo) {
    const c = codigo?.trim().toUpperCase();
    if (!c) throw new Error("Código inválido.");
    if (c.length < 4 || c.length > 20) throw new Error("Código deve ter entre 4 e 20 caracteres.");
    
    const exists = await prisma.codigoProfessor.findUnique({ where: { codigo: c } });
    if (exists) throw new Error("Código já existe.");
    
    const result = await prisma.codigoProfessor.create({ data: { codigo: c } });
    return { id: result.id, codigo: result.codigo, usado: false };
  }

  static async listarCodigosProfessor() {
    return prisma.codigoProfessor.findMany();
  }

  static async deletarCodigoProfessor(id) {
    const codigo = await prisma.codigoProfessor.findUnique({ where: { id: Number(id) } });
    if (!codigo) throw new Error("Código não encontrado.");
    if (codigo.usado) throw new Error("Não é possível remover um código já utilizado.");
    
    await prisma.codigoProfessor.delete({ where: { id: Number(id) } });
    return { mensagem: "Código removido com sucesso." };
  }

  static async _validarCodigo(codigo) {
    const reg = await prisma.codigoProfessor.findUnique({ where: { codigo } });
    if (!reg) return false;
    if (reg.usado) return false;
    return true;
  }
}