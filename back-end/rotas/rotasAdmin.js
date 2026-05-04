import { Router }               from "express";
import { JWT }                   from "../bcrypt-jwt/jwt.js";
import { ControllerUsuarios }    from "../controller/controllersUsuario.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerAdmin = Router();

// ── Login do Administrador ─────────────────────────────────────
routerAdmin.post("/admin/login", (req, res) => {
  try {
    const { utilizador, senha } = req.body;
    if (!utilizador || !senha)
      return res.status(400).json({ error: "Utilizador e senha são obrigatórios." });

    const adminUser  = process.env.ADMIN_USER  || "admin";
    const adminSenha = process.env.ADMIN_SENHA || "schoolconnect2026";

    if (utilizador !== adminUser || senha !== adminSenha)
      return res.status(401).json({ error: "Credenciais inválidas." });

    const token = JWT.gerarToken({ id: 0, perfil: "ADMIN", utilizador });
    return res.json({ token, perfil: "ADMIN" });
  } catch {
    return res.status(500).json({ error: "Erro interno." });
  }
});

// ── Gestão de Códigos de Professor ────────────────────────────
routerAdmin.post(  "/admin/codigos",      ControllerUsuarios.criarCodigoProfessor);
routerAdmin.get(   "/admin/codigos",      ControllerUsuarios.listarCodigosProfessor);
routerAdmin.delete("/admin/codigos/:id",  ControllerUsuarios.deletarCodigoProfessor);