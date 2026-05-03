import { prisma } from "../prismaClient/prismaClient.js";
import { hashSenha, compareSenha } from "../bcrypt-jwt/hashSenha.js";
import { JWT } from "../bcrypt-jwt/jwt.js";

export class ServiceUsuario {

  // ========================
  // CRIAR USUÁRIO
  // ========================
  static async criarUsuario(dados) {
    try {
      const {
        nome, email, senha, telefone, perfil, imagem,
        relacaoEducando, numeroMatricula,
        codigoVerificacao, disciplinas, cursos, turmas
      } = dados;

      if (!nome?.trim() || !email?.trim() || !senha || !telefone || !perfil) {
        throw new Error("Campos obrigatórios em falta.");
      }

      const relacaoMap = { "Pai": "PAI", "Mãe": "MAE", "Mae": "MAE", "Tutor Legal": "TUTOR", "Tutor": "TUTOR" };
      const relacaoConvertida = relacaoEducando ? (relacaoMap[relacaoEducando] || relacaoEducando) : null;

      if (perfil === "ENCARREGADO") {
        if (!numeroMatricula?.trim()) throw new Error("Número de matrícula do aluno obrigatório.");
        if (!relacaoConvertida) throw new Error("Relação com o educando obrigatória.");
        if (!["PAI", "MAE", "TUTOR"].includes(relacaoConvertida)) throw new Error("Relação inválida. Use: Pai, Mãe ou Tutor.");
      }

      let codigoProfessorFinal = null;
      if (perfil === "PROFESSOR") {
        if (!codigoVerificacao?.trim()) throw new Error("Código de verificação obrigatório.");
        codigoProfessorFinal = codigoVerificacao.trim().toUpperCase();
        await this.validarCodigoProfessor(codigoProfessorFinal);
      }

      const emailFormatado = email.trim().toLowerCase();

      const emailExistente = await prisma.usuario.findUnique({ where: { email: emailFormatado } });
      if (emailExistente) throw new Error("Email já cadastrado.");

      const telefoneExistente = await prisma.usuario.findUnique({ where: { telefone } });
      if (telefoneExistente) throw new Error("Telefone já cadastrado.");

      if (perfil === "ENCARREGADO") {
        const alunoExiste = await prisma.aluno.findUnique({ where: { matricula: numeroMatricula } });
        if (!alunoExiste) throw new Error("Aluno com esse número de matrícula não encontrado.");
      }

      const senhaHash = await hashSenha(senha);

      const toIds = (val) => val
        ? (Array.isArray(val) ? val : [val]).map(id => ({ id: Number(id) }))
        : undefined;

      const usuarioCriado = await prisma.$transaction(async (tx) => {
        const usuario = await tx.usuario.create({
          data: {
            nome,
            email: emailFormatado,
            senha: senhaHash,
            telefone,
            perfil,
            imagem: imagem || null,
            relacaoEducando: perfil === "ENCARREGADO" ? relacaoConvertida : null,
            codigoVerificacao: perfil === "PROFESSOR" ? codigoProfessorFinal : null,
            disciplinas: disciplinas ? { connect: toIds(disciplinas) } : undefined,
            cursos: cursos ? { connect: toIds(cursos) } : undefined,
          },
          include: { disciplinas: true, turmas: true, cursos: true }
        });

        if (perfil === "PROFESSOR") {
          await tx.codigoProfessor.update({
            where: { codigo: codigoProfessorFinal },
            data: { usado: true, professorId: usuario.id }
          });
        }

        return usuario;
      });

      // Associar turmas ao professor (campo correcto é professorId)
      if (perfil === "PROFESSOR" && turmas) {
        const turmasArray = Array.isArray(turmas) ? turmas : [turmas];
        if (turmasArray.length > 0) {
          await prisma.turma.updateMany({
            where: { id: { in: turmasArray.map(id => Number(id)) } },
            data: { professorId: usuarioCriado.id }
          });
        }
      }

      // Ligar encarregado ao aluno
      if (perfil === "ENCARREGADO") {
        await prisma.aluno.update({
          where: { matricula: numeroMatricula },
          data: { encarregadoId: usuarioCriado.id }
        });
      }

      const { senha: _, ...usuarioSemSenha } = usuarioCriado;
      return usuarioSemSenha;

    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  // ========================
  // VALIDAR CÓDIGO PROFESSOR
  // ========================
  static async validarCodigoProfessor(codigo) {
    const codigoUpper = codigo?.trim().toUpperCase();
    if (!codigoUpper) throw new Error("Código de verificação obrigatório.");

    const registro = await prisma.codigoProfessor.findUnique({ where: { codigo: codigoUpper } });
    if (!registro) throw new Error("Código de professor não existe.");
    if (registro.usado) throw new Error("Código já foi utilizado por outro professor.");

    return registro;
  }

  static async criarCodigoProfessor(codigo) {
    const codigoUpper = codigo?.trim().toUpperCase();
    if (!codigoUpper) throw new Error("Código inválido.");

    const existente = await prisma.codigoProfessor.findUnique({ where: { codigo: codigoUpper } });
    if (existente) throw new Error("Código já existe.");

    return prisma.codigoProfessor.create({ data: { codigo: codigoUpper } });
  }

  static async listarCodigosProfessor() {
    return prisma.codigoProfessor.findMany({
      include: {
        professor: {
          select: { id: true, nome: true, email: true, telefone: true, perfil: true, imagem: true, codigoVerificacao: true }
        }
      },
      orderBy: { criadoEm: "desc" }
    });
  }

  static async associarCodigoProfessor(codigo, usuarioId) {
    const codigoUpper = codigo?.trim().toUpperCase();
    if (!codigoUpper) throw new Error("Código inválido.");
    return prisma.codigoProfessor.update({
      where: { codigo: codigoUpper },
      data: { usado: true, professorId: usuarioId }
    });
  }

  static async liberarCodigoProfessor(codigo) {
    const codigoUpper = codigo?.trim().toUpperCase();
    if (!codigoUpper) return;
    await prisma.codigoProfessor.updateMany({
      where: { codigo: codigoUpper },
      data: { usado: false, professorId: null }
    });
  }

  // ========================
  // LOGIN
  // ========================
  static async loginUsuario(email, senha) {
    try {
      if (!email?.trim() || !senha) throw new Error("Email e senha são obrigatórios.");

      const emailFormatado = email.trim().toLowerCase();

      const usuario = await prisma.usuario.findUnique({
        where: { email: emailFormatado },
        include: { disciplinas: true, turmas: true, cursos: true }
      });

      if (!usuario) throw new Error("Email ou senha inválidos.");

      const senhaValida = await compareSenha(senha, usuario.senha);
      if (!senhaValida) throw new Error("Email ou senha inválidos.");

      const token = JWT.gerarToken({ id: usuario.id, email: usuario.email, perfil: usuario.perfil });

      const { senha: _, ...usuarioSemSenha } = usuario;
      return { usuario: usuarioSemSenha, token };

    } catch (error) {
      throw new Error(`Erro no login: ${error.message}`);
    }
  }

  // ========================
  // LISTAR TODOS
  // ========================
  static async listarUsuarios() {
    try {
      const usuarios = await prisma.usuario.findMany({
        include: { disciplinas: true, turmas: true, cursos: true }
      });
      return usuarios.map(({ senha, ...rest }) => rest);
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  // ========================
  // LISTAR POR ID
  // ========================
  static async listarUsuarioPorId(id) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: parseInt(id) },
        include: { disciplinas: true, turmas: true, cursos: true }
      });
      if (!usuario) throw new Error("Usuário não encontrado.");
      const { senha, ...usuarioSemSenha } = usuario;
      return usuarioSemSenha;
    } catch (error) {
      throw new Error(`Erro ao listar usuário por ID: ${error.message}`);
    }
  }

  // ========================
  // ATUALIZAR
  // ========================
  static async atualizarUsuario(id, dados) {
    try {
      const {
        nome, email, senha, telefone, perfil, imagem, disciplinas, cursos,
        relacaoEducando, numeroMatricula, codigoVerificacao
      } = dados;

      const usuarioExistente = await prisma.usuario.findUnique({ where: { id: parseInt(id) } });
      if (!usuarioExistente) throw new Error("Usuário não encontrado.");

      const perfilFinal = perfil ?? usuarioExistente.perfil;
      const relacaoMap = { "Pai": "PAI", "Mãe": "MAE", "Mae": "MAE", "Tutor Legal": "TUTOR", "Tutor": "TUTOR" };

      if (perfilFinal === "ENCARREGADO" && numeroMatricula) {
        const alunoExiste = await prisma.aluno.findUnique({ where: { matricula: numeroMatricula } });
        if (!alunoExiste) throw new Error("Aluno com esse número de matrícula não encontrado.");
      }

      let codigoVerificacaoFinal = usuarioExistente.codigoVerificacao;
      const codigoAntigo = usuarioExistente.codigoVerificacao;

      if (perfilFinal === "PROFESSOR" && codigoVerificacao !== undefined) {
        const codigoUpper = codigoVerificacao.trim().toUpperCase();
        if (codigoUpper !== codigoAntigo) {
          await this.validarCodigoProfessor(codigoUpper);
          await this.liberarCodigoProfessor(codigoAntigo);
          await this.associarCodigoProfessor(codigoUpper, usuarioExistente.id);
          codigoVerificacaoFinal = codigoUpper;
        } else {
          codigoVerificacaoFinal = codigoUpper;
        }
      } else if (perfilFinal !== "PROFESSOR") {
        if (codigoAntigo) await this.liberarCodigoProfessor(codigoAntigo);
        codigoVerificacaoFinal = null;
      }

      const senhaHash = senha ? await hashSenha(senha) : usuarioExistente.senha;

      const toIds = (val) => val
        ? (Array.isArray(val) ? val : [val]).map(id => ({ id: Number(id) }))
        : undefined;

      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: {
          nome: nome ?? usuarioExistente.nome,
          email: email ? email.trim().toLowerCase() : usuarioExistente.email,
          senha: senhaHash,
          telefone: telefone ?? usuarioExistente.telefone,
          perfil: perfilFinal,
          imagem: imagem ?? usuarioExistente.imagem,
          relacaoEducando: perfilFinal === "ENCARREGADO"
            ? (relacaoMap[relacaoEducando] || relacaoEducando || usuarioExistente.relacaoEducando)
            : null,
          codigoVerificacao: perfilFinal === "PROFESSOR" ? codigoVerificacaoFinal : null,
          disciplinas: disciplinas ? { set: toIds(disciplinas) } : undefined,
          cursos: cursos ? { set: toIds(cursos) } : undefined,
        },
        include: { disciplinas: true, turmas: true, cursos: true }
      });

      if (perfilFinal === "ENCARREGADO" && numeroMatricula) {
        await prisma.aluno.update({
          where: { matricula: numeroMatricula },
          data: { encarregadoId: usuarioAtualizado.id }
        });
      }

      const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
      return usuarioSemSenha;

    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  // ========================
  // DELETAR
  // ========================
  static async deletarUsuario(id) {
    try {
      const usuarioExistente = await prisma.usuario.findUnique({ where: { id: parseInt(id) } });
      if (!usuarioExistente) throw new Error("Usuário não encontrado.");

      await prisma.usuario.delete({ where: { id: parseInt(id) } });
      return { mensagem: "Usuário deletado com sucesso." };

    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}