import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configurarWebSocket } from "./websocket.js";

// 🔥 Prisma (Singleton - evita múltiplas conexões em dev)
import { PrismaClient } from "./generated/prisma/index.js";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// 📦 ROTAS
import { routerUsuarios } from "./rotas/rotasUsuario.js";
import { routerAviso } from "./rotas/rotasAviso.js";
import { routerAluno } from "./rotas/rotasAluno.js";
import { routerDisciplina } from "./rotas/rotasDisciplina.js";
import { routerEvento } from "./rotas/rotasEvento.js";
import { routerNota } from "./rotas/rotasNota.js";
import { routerReuniao } from "./rotas/rotasReuniao.js";
import { routerRelatorio } from "./rotas/rotasRelatorio.js";
import { routerTurma } from "./rotas/rotasTurma.js";
import { routerAdmin } from "./rotas/rotasAdmin.js";
import { routerCurso } from "./rotas/rotasCurso.js";
import { routerMensagem } from "./rotas/rotasMensagem.js";
import statsRoutes from "./rotas/rotasStats.js";
import routerFeedback from "./rotas/rotasFeedback.js";

// 📁 Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pastaProjeto = path.resolve(__dirname, "..");
const frontPath = path.join(pastaProjeto, "front-end");
const imgPath = path.join(pastaProjeto, "img");

// ⚙️ Configuração
const PORTA = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// 🧾 LOG de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 🌍 CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 📦 Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =========================
// 🔐 ROTA DEBUG LOGIN
// =========================
app.post("/api/debug-login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios"
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (!usuario) {
      return res.json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    const { compareSenha } = await import("./bcrypt-jwt/hashSenha.js");
    const senhaValida = await compareSenha(senha, usuario.senha);

    if (!senhaValida) {
      return res.json({
        success: false,
        message: "Senha incorreta"
      });
    }

    const { JWT } = await import("./bcrypt-jwt/jwt.js");

    const token = JWT.gerarToken({
      id: usuario.id,
      email: usuario.email,
      perfil: usuario.perfil
    });

    return res.json({
      success: true,
      token,
      usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno" });
  }
});

// =========================
// 👤 CRIAR USUÁRIO TESTE
// =========================
app.post("/api/criar-usuario-teste", async (_, res) => {
  try {
    const { hashSenha } = await import("./bcrypt-jwt/hashSenha.js");

    const usuario = await prisma.usuario.upsert({
      where: { email: "teste@schoolconnect.com" },
      update: {},
      create: {
        nome: "Usuário Teste",
        email: "teste@schoolconnect.com",
        senha: await hashSenha("12345678"),
        telefone: "+244900000001",
        perfil: "ENCARREGADO"
      }
    });

    res.json({
      success: true,
      usuario
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// ❤️ HEALTH CHECK
// =========================
app.get("/api/health", (_, res) => {
  res.json({
    status: "online",
    database: "ok",
    timestamp: new Date()
  });
});

// =========================
// 📂 STATIC FILES
// =========================
app.use(express.static(frontPath));
app.use("/img", express.static(imgPath));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// 🔗 ROTAS
// =========================
app.use("/api", routerUsuarios);
app.use("/api", routerAviso);
app.use("/api", routerAluno);
app.use("/api", routerDisciplina);
app.use("/api", routerEvento);
app.use("/api", routerNota);
app.use("/api", routerReuniao);
app.use("/api", routerRelatorio);
app.use("/api", routerTurma);
app.use("/api", routerAdmin);
app.use("/api", routerCurso);
app.use("/api", routerMensagem);
app.use("/api", statsRoutes);
app.use("/api/feedbacks", routerFeedback);

// =========================
// 🌐 SPA FALLBACK
// =========================
app.use((req, res, next) => {
  if (req.url.startsWith("/api")) return next();
  res.sendFile(path.join(frontPath, "index.html"));
});

// =========================
// ❌ 404
// =========================
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// =========================
// ⚠️ ERRO GLOBAL
// =========================
app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// =========================
// 🔌 WEBSOCKET
// =========================
configurarWebSocket(server);

// =========================
// 🛑 SHUTDOWN LIMPO
// =========================
const shutdown = async () => {
  console.log("Encerrando servidor...");
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// =========================
// 🚀 START
// =========================
server.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});
