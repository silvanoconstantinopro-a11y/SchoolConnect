import { Router } from "express";
import { JWT } from "../bcrypt-jwt/jwt.js";
import { ControllerUsuarios } from "../controller/controllersUsuario.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerAdmin = Router();

// Login do Administrador (público)
routerAdmin.post("/admin/login", (req, res) => {
  try {
    const { utilizador, senha } = req.body;
    
    if (!utilizador || !senha) {
      return res.status(400).json({ error: "Utilizador e senha são obrigatórios." });
    }

    const adminUser = process.env.ADMIN_USER || "admin";
    const adminSenha = process.env.ADMIN_SENHA || "schoolconnect2026";

    if (utilizador !== adminUser || senha !== adminSenha) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = JWT.gerarToken({
      id: 0,
      email: "admin@schoolconnect.com",
      perfil: "ADMIN",
      nome: "Administrador"
    });

    return res.json({ 
      token, 
      perfil: "ADMIN",
      usuario: { nome: "Administrador", email: "admin@schoolconnect.com" }
    });
  } catch (err) {
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Gestão de Códigos de Professor (apenas admin)
routerAdmin.post("/admin/codigos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.criarCodigoProfessor
);

routerAdmin.get("/admin/codigos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.listarCodigosProfessor
);

routerAdmin.delete("/admin/codigos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.deletarCodigoProfessor
);