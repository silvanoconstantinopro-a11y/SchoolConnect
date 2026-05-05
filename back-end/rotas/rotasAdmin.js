import { Router } from "express";
import { JWT } from "../bcrypt-jwt/jwt.js";
import { ControllerUsuarios } from "../controller/controllersUsuario.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

const router = Router();

// Login do Administrador (público)
router.post("/admin/login", async (req, res) => {
  try {
    const { utilizador, senha } = req.body;
    
    console.log("🔐 Tentativa de login admin:", { utilizador });
    
    if (!utilizador || !senha) {
      return res.status(400).json({ error: "Utilizador e senha são obrigatórios." });
    }

    const adminUser = process.env.ADMIN_USER || "admin";
    const adminSenha = process.env.ADMIN_SENHA || "schoolconnect2026";

    if (utilizador !== adminUser || senha !== adminSenha) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = JWT.gerarToken({
      id: "admin",
      email: "admin@schoolconnect.com",
      perfil: "ADMIN",
      nome: "Administrador"
    });

    console.log("✅ Login admin bem-sucedido");

    return res.json({ 
      token, 
      perfil: "ADMIN",
      usuario: { 
        id: "admin",
        nome: "Administrador", 
        email: "admin@schoolconnect.com",
        perfil: "ADMIN"
      }
    });
    
  } catch (error) {
    console.error("❌ Erro no login admin:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rotas protegidas
router.get("/admin/codigos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.listarCodigosProfessor
);

router.post("/admin/codigos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.criarCodigoProfessor
);

router.delete("/admin/codigos/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerUsuarios.deletarCodigoProfessor
);

// Health check para admin
router.get("/admin/health", (req, res) => {
  res.json({ status: "online", adminApi: true });
});

export const routerAdmin = router;