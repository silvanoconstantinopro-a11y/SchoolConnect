import { Router } from "express";
import jwt from "jsonwebtoken";
import { ControllerUsuarios } from "../controller/controllersUsuario.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

const router = Router();

const SECRET_KEY = process.env.SECRET_KEY || "schoolconnect-super-secret-key-change-in-production";
const EXPIRATION = process.env.EXPIRATION_TIME || "24h";

// Função para gerar token (simplificada para admin)
function gerarTokenAdmin(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION });
}

// Login do Administrador
router.post("/admin/login", async (req, res) => {
  try {
    const { utilizador, senha } = req.body;
    
    console.log("🔐 Tentativa de login admin:", { utilizador });
    
    if (!utilizador || !senha) {
      return res.status(400).json({ error: "Utilizador e senha são obrigatórios." });
    }

    const adminUser = process.env.ADMIN_USER || "admin";
    const adminSenha = process.env.ADMIN_SENHA || "schoolconnect2026";
    
    console.log("👤 Admin esperado:", { user: adminUser });

    if (utilizador !== adminUser || senha !== adminSenha) {
      console.log("❌ Credenciais inválidas");
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Gerar token para admin
    const token = gerarTokenAdmin({
      id: 0,
      email: "admin@schoolconnect.com",
      perfil: "ADMIN",
      nome: "Administrador"
    });

    console.log("✅ Login admin bem-sucedido, token gerado");
    
    return res.json({ 
      token, 
      perfil: "ADMIN",
      usuario: { 
        id: 0,
        nome: "Administrador", 
        email: "admin@schoolconnect.com",
        perfil: "ADMIN"
      }
    });
    
  } catch (error) {
    console.error("❌ Erro no login admin:", error);
    return res.status(500).json({ 
      error: "Erro interno do servidor",
      message: error.message 
    });
  }
});

// Gestão de Códigos de Professor
router.post("/admin/codigos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.criarCodigoProfessor
);

router.get("/admin/codigos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.listarCodigosProfessor
);

router.delete("/admin/codigos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.deletarCodigoProfessor
);

export const routerAdmin = router;