/**
 * serviceUsuario.js
 * Gestão completa de usuários - Versão Refatorada e Corrigida
 */
import { prisma } from "../prismaClient/prismaClient.js";
import { hashSenha, compareSenha } from "../bcrypt-jwt/hashSenha.js";
import { JWT } from "../bcrypt-jwt/jwt.js";
import { logger } from "../utils/logger.js";
import { validador } from "../utils/validador.js";

const RELACAO_MAP = {
  "Pai": "PAI",
  "Mãe": "MAE",
  "Mae": "MAE",
  "Tutor": "TUTOR",
  "Tutor Legal": "TUTOR",
};

const toConnect = (val) => {
  if (!val) return undefined;
  const ids = Array.isArray(val) ? val : [val];
  return ids.filter(id => id && !isNaN(Number(id))).map(id => ({ id: Number(id) }));
};

const semSenha = ({ senha, ...rest }) => rest;

export class ServiceUsuario {

  static validarDadosUsuario(dados, isUpdate = false) {
    const erros = [];
    
    if (!isUpdate) {
      if (!dados.nome?.trim()) erros.push("Nome é obrigatório");
      if (!dados.email?.trim()) erros.push("Email é obrigatório");
      if (!dados.senha) erros.push("Senha é obrigatória");
      if (!dados.telefone?.trim()) erros.push("Telefone é obrigatório");
      if (!dados.perfil) erros.push("Perfil é obrigatório");
    }
    
    if (dados.nome && (dados.nome.length < 3 || dados.nome.length > 100))
      erros.push("Nome deve ter entre 3 e 100 caracteres");
    
    if (dados.email && !validador.validarEmail(dados.email))
      erros.push("Email inválido");
    
    if (dados.senha && dados.senha.length < 6)
      erros.push("Senha deve ter pelo menos 6 caracteres");
    
    if (dados.telefone && !validador.validarTelefone(dados.telefone))
      erros.push("Telefone inválido");
    
    if (dados.perfil && !["ADMIN", "PROFESSOR", "ENCARREGADO"].includes(dados.perfil))
      erros.push("Perfil inválido");
    
    return erros;
  }

  static async criarUsuario(dados) {
    try {
      const {
        nome, email, senha, telefone, perfil, imagem,
        relacaoEducando, numeroMatricula,
        codigoVerificacao, disciplinas, cursos, turmas,
      } = dados;

      // Validação básica
      const erros = this.validarDadosUsuario({ nome, email, senha, telefone, perfil });
      if (erros.length > 0) {
        throw new Error(`Dados inválidos: ${erros.join(", ")}`);
      }

      const relacao = relacaoEducando ? (RELACAO_MAP[relacaoEducando] || relacaoEducando) : null;

      // Validações específicas por perfil
      if (perfil === "ENCARREGADO") {
        if (!numeroMatricula?.trim()) {
          throw new Error("Número de matrícula do aluno obrigatório");
        }
        if (!relacao) throw new Error("Relação com o educando obrigatória");
        if (!["PAI", "MAE", "TUTOR"].includes(relacao)) {
          throw new Error("Relação inválida. Use: Pai, Mãe ou Tutor");
        }
      }

      let codigoFinal = null;
      if (perfil === "PROFESSOR") {
        if (!codigoVerificacao?.trim()) {
          throw new Error("Código de verificação obrigatório");
        }
        codigoFinal = codigoVerificacao.trim().toUpperCase();
        await ServiceUsuario._validarCodigo(codigoFinal);
      }

      const emailNorm = email.trim().toLowerCase();

      // Verificar duplicatas
      const [emailExists, telefoneExists] = await Promise.all([
        prisma.usuario.findUnique({ where: { email: emailNorm } }),
        prisma.usuario.findUnique({ where: { telefone: telefone.trim() } })
      ]);

      if (emailExists) throw new Error("Email já cadastrado");
      if (telefoneExists) throw new Error("Telefone já cadastrado");

      // Verificar aluno para encarregado
      if (perfil === "ENCARREGADO") {
        const aluno = await prisma.aluno.findUnique({ 
          where: { matricula: numeroMatricula.trim() } 
        });
        if (!aluno) throw new Error("Aluno com esta matrícula não encontrado");
      }

      const senhaHash = await hashSenha(senha);

      const usuario = await prisma.$transaction(async (tx) => {
        const u = await tx.usuario.create({
          data: {
            nome: nome.trim(),
            email: emailNorm,
            senha: senhaHash,
            telefone: telefone.trim(),
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

      // Atualizar relações pós-criação
      if (perfil === "PROFESSOR" && turmas) {
        const ids = toConnect(turmas);
        if (ids?.length) {
          await prisma.turma.updateMany({ 
            where: { id: { in: ids.map(c => c.id) } }, 
            data: { professorId: usuario.id } 
          });
        }
      }

      if (perfil === "ENCARREGADO") {
        await prisma.aluno.update({
          where: { matricula: numeroMatricula.trim() },
          data: { encarregadoId: usuario.id },
        });
      }

      logger.info(`Usuário criado: ${usuario.nome} (${usuario.email}) - Perfil: ${perfil}`);
      return semSenha(usuario);

    } catch (error) {
      logger.error(`Erro ao criar usuário: ${error.message}`);
      throw error;
    }
  }

  static async loginUsuario(email, senha) {
    try {
      if (!email?.trim()) throw new Error("Email é obrigatório");
      if (!senha) throw new Error("Senha é obrigatória");

      const emailNorm = email.trim().toLowerCase();

      const usuario = await prisma.usuario.findUnique({
        where: { email: emailNorm },
        include: { disciplinas: true, turmas: true, cursos: true },
      });

      if (!usuario || !await compareSenha(senha, usuario.senha)) {
        throw new Error("Email ou senha inválidos");
      }

      // Atualizar último login
      await prisma.usuario.update({
        where: { id: usuario.id },
        data: { ultimoLogin: new Date() }
      });

      const token = JWT.gerarToken({ 
        id: usuario.id, 
        email: usuario.email, 
        perfil: usuario.perfil,
        nome: usuario.nome
      });
      
      logger.info(`Login realizado: ${usuario.email}`);
      return { usuario: semSenha(usuario), token };

    } catch (error) {
      logger.error(`Erro no login: ${error.message}`);
      throw error;
    }
  }

  static async atualizarUsuario(id, dados) {
    try {
      const {
        nome, email, senha, telefone, perfil, imagem,
        relacaoEducando, numeroMatricula,
        codigoVerificacao, disciplinas, cursos,
      } = dados;

      const usuarioExistente = await prisma.usuario.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!usuarioExistente) throw new Error("Usuário não encontrado");

      const perfilFinal = perfil || usuarioExistente.perfil;
      const relacao = relacaoEducando ? (RELACAO_MAP[relacaoEducando] || relacaoEducando) : null;

      // Validações específicas
      if (perfilFinal === "ENCARREGADO" && numeroMatricula) {
        const aluno = await prisma.aluno.findUnique({ 
          where: { matricula: numeroMatricula.trim() } 
        });
        if (!aluno) throw new Error("Aluno com esta matrícula não encontrado");
      }

      let codigoFinal = usuarioExistente.codigoVerificacao;
      if (perfilFinal === "PROFESSOR" && codigoVerificacao !== undefined) {
        if (codigoVerificacao?.trim()) {
          const codigo = codigoVerificacao.trim().toUpperCase();
          if (codigo !== usuarioExistente.codigoVerificacao) {
            await ServiceUsuario._validarCodigo(codigo);
            if (usuarioExistente.codigoVerificacao) {
              await ServiceUsuario._liberarCodigo(usuarioExistente.codigoVerificacao);
            }
            await ServiceUsuario._associarCodigo(codigo, usuarioExistente.id);
            codigoFinal = codigo;
          }
        }
      } else if (perfilFinal !== "PROFESSOR" && usuarioExistente.codigoVerificacao) {
        await ServiceUsuario._liberarCodigo(usuarioExistente.codigoVerificacao);
        codigoFinal = null;
      }

      // Verificar duplicatas de email/telefone
      if (email && email !== usuarioExistente.email) {
        const emailExists = await prisma.usuario.findUnique({ 
          where: { email: email.trim().toLowerCase() } 
        });
        if (emailExists) throw new Error("Email já cadastrado");
      }

      if (telefone && telefone !== usuarioExistente.telefone) {
        const telefoneExists = await prisma.usuario.findUnique({ 
          where: { telefone: telefone.trim() } 
        });
        if (telefoneExists) throw new Error("Telefone já cadastrado");
      }

      const senhaHash = senha ? await hashSenha(senha) : usuarioExistente.senha;

      const atualizado = await prisma.usuario.update({
        where: { id: Number(id) },
        data: {
          nome: nome?.trim() || usuarioExistente.nome,
          email: email?.trim().toLowerCase() || usuarioExistente.email,
          senha: senhaHash,
          telefone: telefone?.trim() || usuarioExistente.telefone,
          perfil: perfilFinal,
          imagem: imagem !== undefined ? imagem : usuarioExistente.imagem,
          relacaoEducando: perfilFinal === "ENCARREGADO" ? (relacao || usuarioExistente.relacaoEducando) : null,
          codigoVerificacao: perfilFinal === "PROFESSOR" ? codigoFinal : null,
          disciplinas: disciplinas ? { set: toConnect(disciplinas) } : undefined,
          cursos: cursos ? { set: toConnect(cursos) } : undefined,
        },
        include: { disciplinas: true, turmas: true, cursos: true },
      });

      if (perfilFinal === "ENCARREGADO" && numeroMatricula) {
        await prisma.aluno.update({
          where: { matricula: numeroMatricula.trim() },
          data: { encarregadoId: atualizado.id },
        });
      }

      logger.info(`Usuário atualizado: ${atualizado.nome} (${atualizado.email})`);
      return semSenha(atualizado);

    } catch (error) {
      logger.error(`Erro ao atualizar usuário ${id}: ${error.message}`);
      throw error;
    }
  }

  static async listarUsuarios(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.perfil) where.perfil = filtros.perfil;
      if (filtros.search) {
        where.OR = [
          { nome: { contains: filtros.search, mode: 'insensitive' } },
          { email: { contains: filtros.search, mode: 'insensitive' } }
        ];
      }
      
      const usuarios = await prisma.usuario.findMany({
        where,
        include: { disciplinas: true, turmas: true, cursos: true },
        orderBy: { nome: "asc" },
        take: filtros.limit ? Number(filtros.limit) : undefined,
        skip: filtros.offset ? Number(filtros.offset) : undefined
      });
      
      return usuarios.map(semSenha);
    } catch (error) {
      logger.error(`Erro ao listar usuários: ${error.message}`);
      throw error;
    }
  }

  static async obterUsuarioPorId(id) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) },
        include: { disciplinas: true, turmas: true, cursos: true },
      });
      if (!usuario) throw new Error("Usuário não encontrado");
      return semSenha(usuario);
    } catch (error) {
      logger.error(`Erro ao obter usuário ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deletarUsuario(id) {
    try {
      const usuario = await prisma.usuario.findUnique({ 
        where: { id: Number(id) } 
      });
      if (!usuario) throw new Error("Usuário não encontrado");
      
      // Se for professor, liberar códigos
      if (usuario.perfil === "PROFESSOR" && usuario.codigoVerificacao) {
        await ServiceUsuario._liberarCodigo(usuario.codigoVerificacao);
      }
      
      await prisma.usuario.delete({ where: { id: Number(id) } });
      
      logger.info(`Usuário deletado: ${usuario.nome} (${usuario.email})`);
      return { 
        mensagem: "Usuário deletado com sucesso",
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
      };
    } catch (error) {
      logger.error(`Erro ao deletar usuário ${id}: ${error.message}`);
      throw error;
    }
  }

  // Métodos para códigos de professor
  static async criarCodigoProfessor(codigo) {
    try {
      const codigoUpper = codigo?.trim().toUpperCase();
      if (!codigoUpper) throw new Error("Código inválido");
      
      const existing = await prisma.codigoProfessor.findUnique({ 
        where: { codigo: codigoUpper } 
      });
      if (existing) throw new Error("Código já existe");
      
      return prisma.codigoProfessor.create({ data: { codigo: codigoUpper } });
    } catch (error) {
      logger.error(`Erro ao criar código de professor: ${error.message}`);
      throw error;
    }
  }

  static async listarCodigosProfessor() {
    try {
      return prisma.codigoProfessor.findMany({
        include: {
          professor: {
            select: {
              id: true, nome: true, email: true, 
              telefone: true, perfil: true, imagem: true,
              codigoVerificacao: true
            },
          },
        },
        orderBy: { criadoEm: "desc" },
      });
    } catch (error) {
      logger.error(`Erro ao listar códigos: ${error.message}`);
      throw error;
    }
  }

  static async _validarCodigo(codigo) {
    const registro = await prisma.codigoProfessor.findUnique({ where: { codigo } });
    if (!registro) throw new Error("Código de professor não existe");
    if (registro.usado) throw new Error("Código já foi utilizado");
    return registro;
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