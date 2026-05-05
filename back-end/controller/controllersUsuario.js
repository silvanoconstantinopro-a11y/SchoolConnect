/**
 * controllerUsuarios.js
 * Controlador para gestão de usuários
 */
import { ServiceUsuario } from "../service/serviceUsuario.js";
import { uploadSingle, deleteFile } from "../middlewares/upload.js";
import { logger } from "../utils/logger.js";
import { hashSenha, compareSenha } from "../bcrypt-jwt/hashSenha.js";

export class ControllerUsuarios {

  // POST /api/usuarios
  static criarUsuario = [
    uploadSingle("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };

        // Normalizar perfil (front-end pode enviar "teacher" | "parent")
        const perfilMap = { teacher: "PROFESSOR", parent: "ENCARREGADO" };
        if (dados.perfil) {
          dados.perfil = perfilMap[dados.perfil] || dados.perfil;
        }

        // Arrays enviados como "disciplinas[]"
        if (dados["disciplinas[]"]) {
          dados.disciplinas = [].concat(dados["disciplinas[]"]);
          delete dados["disciplinas[]"];
        }
        if (dados["turmas[]"]) {
          dados.turmas = [].concat(dados["turmas[]"]);
          delete dados["turmas[]"];
        }
        if (dados["cursos[]"]) {
          dados.cursos = [].concat(dados["cursos[]"]);
          delete dados["cursos[]"];
        }

        if (req.file) {
          dados.imagem = req.file.filename;
        }

        const usuario = await ServiceUsuario.criarUsuario(dados);
        
        logger.info(`Usuário criado: ${usuario.email} (${usuario.perfil}) pelo admin ${req.usuario?.id}`);
        
        return res.status(201).json({
          success: true,
          message: "Usuário criado com sucesso",
          data: usuario
        });
      } catch (error) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        
        logger.error(`Erro ao criar usuário: ${error.message}`);
        return res.status(400).json({
          success: false,
          error: error.message,
          code: "CREATE_USUARIO_ERROR"
        });
      }
    },
  ];

  // POST /api/login
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          error: "Email e senha são obrigatórios",
          code: "MISSING_CREDENTIALS"
        });
      }
      
      const result = await ServiceUsuario.loginUsuario(email, senha);
      
      logger.info(`Login realizado: ${email}`);
      
      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        data: result
      });
    } catch (error) {
      logger.error(`Erro no login: ${error.message}`);
      return res.status(401).json({
        success: false,
        error: error.message,
        code: "LOGIN_ERROR"
      });
    }
  }

  // POST /api/logout
  static async logout(req, res) {
    try {
      logger.info(`Logout realizado: ${req.usuario?.email}`);
      
      return res.json({
        success: true,
        message: "Logout realizado com sucesso"
      });
    } catch (error) {
      logger.error(`Erro no logout: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LOGOUT_ERROR"
      });
    }
  }

  // GET /api/usuarios
  static async listarUsuarios(req, res) {
    try {
      const { perfil, search, limit, offset } = req.query;
      const filtros = { 
        perfil, 
        search, 
        limit: limit ? parseInt(limit) : undefined, 
        offset: offset ? parseInt(offset) : undefined 
      };
      
      const usuarios = await ServiceUsuario.listarUsuarios(filtros);
      
      return res.json({
        success: true,
        data: usuarios,
        count: usuarios.length,
        filters: filtros
      });
    } catch (error) {
      logger.error(`Erro ao listar usuários: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_USUARIOS_ERROR"
      });
    }
  }

  // GET /api/usuarios/perfil
  static async obterPerfil(req, res) {
    try {
      const usuario = await ServiceUsuario.obterUsuarioPorId(req.usuario.id);
      
      return res.json({
        success: true,
        data: usuario
      });
    } catch (error) {
      logger.error(`Erro ao obter perfil: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "GET_PERFIL_ERROR"
      });
    }
  }

  // PUT /api/usuarios/perfil
  static async atualizarPerfil(req, res) {
    try {
      const usuario = await ServiceUsuario.atualizarUsuario(req.usuario.id, req.body);
      
      logger.info(`Perfil atualizado: ${usuario.email}`);
      
      return res.json({
        success: true,
        message: "Perfil atualizado com sucesso",
        data: usuario
      });
    } catch (error) {
      logger.error(`Erro ao atualizar perfil: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "UPDATE_PERFIL_ERROR"
      });
    }
  }

  // PUT /api/usuarios/perfil/senha
  static async alterarSenha(req, res) {
    try {
      const { senhaAtual, novaSenha } = req.body;
      
      if (!senhaAtual || !novaSenha) {
        return res.status(400).json({
          success: false,
          error: "Senha atual e nova senha são obrigatórias",
          code: "MISSING_PASSWORD_DATA"
        });
      }
      
      if (novaSenha.length < 6) {
        return res.status(400).json({
          success: false,
          error: "Nova senha deve ter pelo menos 6 caracteres",
          code: "WEAK_PASSWORD"
        });
      }
      
      // Verificar senha atual
      const usuario = await ServiceUsuario.obterUsuarioPorId(req.usuario.id);
      const senhaValida = await compareSenha(senhaAtual, usuario.senha);
      
      if (!senhaValida) {
        return res.status(401).json({
          success: false,
          error: "Senha atual incorreta",
          code: "INVALID_CURRENT_PASSWORD"
        });
      }
      
      // Atualizar senha
      const novaSenhaHash = await hashSenha(novaSenha);
      
      await ServiceUsuario.atualizarUsuario(req.usuario.id, { senha: novaSenhaHash });
      
      logger.info(`Senha alterada para usuário: ${usuario.email}`);
      
      return res.json({
        success: true,
        message: "Senha alterada com sucesso"
      });
    } catch (error) {
      logger.error(`Erro ao alterar senha: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "CHANGE_PASSWORD_ERROR"
      });
    }
  }

  // GET /api/usuarios/:id
  static async listarUsuarioPorId(req, res) {
    try {
      const usuario = await ServiceUsuario.obterUsuarioPorId(req.params.id);
      
      return res.json({
        success: true,
        data: usuario
      });
    } catch (error) {
      logger.error(`Erro ao obter usuário ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "GET_USUARIO_ERROR"
      });
    }
  }

  // PUT /api/usuarios/:id
  static atualizarUsuario = [
    uploadSingle("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        
        const perfilMap = { teacher: "PROFESSOR", parent: "ENCARREGADO" };
        if (dados.perfil) {
          dados.perfil = perfilMap[dados.perfil] || dados.perfil;
        }
        
        if (req.file) {
          dados.imagem = req.file.filename;
        }
        
        const usuario = await ServiceUsuario.atualizarUsuario(req.params.id, dados);
        
        logger.info(`Usuário ${req.params.id} atualizado pelo admin ${req.usuario?.id}`);
        
        return res.json({
          success: true,
          message: "Usuário atualizado com sucesso",
          data: usuario
        });
      } catch (error) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        
        logger.error(`Erro ao atualizar usuário ${req.params.id}: ${error.message}`);
        const status = error.message.includes("não encontrado") ? 404 : 400;
        return res.status(status).json({
          success: false,
          error: error.message,
          code: "UPDATE_USUARIO_ERROR"
        });
      }
    },
  ];

  // DELETE /api/usuarios/:id
  static async deletarUsuario(req, res) {
    try {
      const result = await ServiceUsuario.deletarUsuario(req.params.id);
      logger.info(`Usuário ${req.params.id} deletado pelo admin ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: result.mensagem,
        data: result.usuario
      });
    } catch (error) {
      logger.error(`Erro ao deletar usuário ${req.params.id}: ${error.message}`);
      const status = error.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({
        success: false,
        error: error.message,
        code: "DELETE_USUARIO_ERROR"
      });
    }
  }

  // POST /api/usuarios/recuperar-senha
  static async recuperarSenha(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: "Email é obrigatório",
          code: "MISSING_EMAIL"
        });
      }
      
      const usuario = await ServiceUsuario.obterUsuarioPorEmail(email);
      
      if (!usuario) {
        // Por segurança, não revelar se o email existe ou não
        return res.json({
          success: true,
          message: "Se o email existir, enviaremos instruções de recuperação"
        });
      }
      
      // Gerar token de recuperação (implementar)
      const resetToken = Math.random().toString(36).substring(2, 15);
      
      // Salvar token no banco (adicione campo resetToken e resetTokenExpiry no schema)
      // Enviar email com link de recuperação
      
      logger.info(`Recuperação de senha solicitada para: ${email}`);
      
      return res.json({
        success: true,
        message: "Instruções de recuperação enviadas para o email"
      });
    } catch (error) {
      logger.error(`Erro na recuperação de senha: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "RECOVER_PASSWORD_ERROR"
      });
    }
  }

  // POST /api/usuarios/resetar-senha
  static async resetarSenha(req, res) {
    try {
      const { token, novaSenha } = req.body;
      
      if (!token || !novaSenha) {
        return res.status(400).json({
          success: false,
          error: "Token e nova senha são obrigatórios",
          code: "MISSING_RESET_DATA"
        });
      }
      
      if (novaSenha.length < 6) {
        return res.status(400).json({
          success: false,
          error: "Nova senha deve ter pelo menos 6 caracteres",
          code: "WEAK_PASSWORD"
        });
      }
      
      // Verificar token e resetar senha (implementar)
      const novaSenhaHash = await hashSenha(novaSenha);
      
      logger.info(`Senha resetada via token: ${token}`);
      
      return res.json({
        success: true,
        message: "Senha resetada com sucesso"
      });
    } catch (error) {
      logger.error(`Erro ao resetar senha: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "RESET_PASSWORD_ERROR"
      });
    }
  }

  // POST /api/admin/codigos
  static async criarCodigoProfessor(req, res) {
    try {
      const { codigo } = req.body;
      
      if (!codigo) {
        return res.status(400).json({
          success: false,
          error: "Código é obrigatório",
          code: "MISSING_CODE"
        });
      }
      
      const result = await ServiceUsuario.criarCodigoProfessor(codigo);
      
      logger.info(`Código de professor criado: ${codigo} pelo admin ${req.usuario?.id}`);
      
      return res.status(201).json({
        success: true,
        message: "Código de professor criado com sucesso",
        data: result
      });
    } catch (error) {
      logger.error(`Erro ao criar código de professor: ${error.message}`);
      return res.status(400).json({
        success: false,
        error: error.message,
        code: "CREATE_CODIGO_ERROR"
      });
    }
  }

  // GET /api/admin/codigos
  static async listarCodigosProfessor(req, res) {
    try {
      const codigos = await ServiceUsuario.listarCodigosProfessor();
      
      return res.json({
        success: true,
        data: codigos,
        count: codigos.length
      });
    } catch (error) {
      logger.error(`Erro ao listar códigos de professor: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "LIST_CODIGOS_ERROR"
      });
    }
  }

  // DELETE /api/admin/codigos/:codigo
  static async removerCodigoProfessor(req, res) {
    try {
      const { codigo } = req.params;
      const result = await ServiceUsuario.removerCodigoProfessor(codigo);
      
      logger.info(`Código de professor removido: ${codigo} pelo admin ${req.usuario?.id}`);
      
      return res.json({
        success: true,
        message: "Código removido com sucesso",
        data: result
      });
    } catch (error) {
      logger.error(`Erro ao remover código de professor: ${error.message}`);
      return res.status(400).json({
        success: false,
        error: error.message,
        code: "DELETE_CODIGO_ERROR"
      });
    }
  }

  // GET /api/usuarios/estatisticas
  static async obterEstatisticas(req, res) {
    try {
      const stats = await ServiceUsuario.getEstatisticas();
      
      return res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error(`Erro ao obter estatísticas: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: "STATS_ERROR"
      });
    }
  }
}

export default ControllerUsuarios;