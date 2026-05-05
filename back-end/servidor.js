// ⚠️ DOTENV PRIMEIRO — antes de qualquer import que use process.env
import "dotenv/config";

import http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";

// Prisma — importado depois do dotenv
import { prisma } from "./prismaClient/prismaClient.js";
import { configurarWebSocket } from "./websocket.js";

// ── Rotas ────────────────────────────────────────────────────
import { routerUsuarios } from "./rotas/rotasUsuario.js";
import { routerAdmin } from "./rotas/rotasAdmin.js";
import { routerAluno } from "./rotas/rotasAluno.js";
import { routerTurma } from "./rotas/rotasTurma.js";
import { routerCurso } from "./rotas/rotasCurso.js";
import { routerDisciplina } from "./rotas/rotasDisciplina.js";
import { routerNota } from "./rotas/rotasNota.js";
import { routerAviso } from "./rotas/rotasAviso.js";
import { routerEvento } from "./rotas/rotasEvento.js";
import { routerReuniao } from "./rotas/rotasReuniao.js";
import { routerMensagem } from "./rotas/rotasMensagem.js";
import { routerRelatorio } from "./rotas/rotasRelatorio.js";
import routerStats from "./rotas/rotasStats.js";
import routerFeedback from "./rotas/rotasFeedback.js";

// ── Paths ─────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, "..");
const frontPath = path.join(rootPath, "front-end");
const imgPath = path.join(rootPath, "img");
const uploadsPath = path.join(__dirname, "uploads");

// ── App ───────────────────────────────────────────────────────
const PORTA = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// ── Security Middleware ───────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false // Permite flexibilidade para frontend
}));

// ── Rate Limiting ─────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Muitas requisições, tente novamente mais tarde." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// ── CORS ──────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ── Body Parsers ──────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Static Files ──────────────────────────────────────────────
app.use(express.static(frontPath));
app.use("/img", express.static(imgPath));
app.use("/uploads", express.static(uploadsPath));

// ── Request Logging (Development) ────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.path}`);
    next();
  });
}

// ── Health Check ──────────────────────────────────────────────
app.get("/api/health", async (_, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "online", database: "connected", ts: new Date() });
  } catch (error) {
    res.status(503).json({ status: "degraded", database: "disconnected", error: error.message });
  }
});

// ── API Routes ────────────────────────────────────────────────
app.use("/api", routerUsuarios);
app.use("/api", routerAdmin);
app.use("/api", routerAluno);
app.use("/api", routerTurma);
app.use("/api", routerCurso);
app.use("/api", routerDisciplina);
app.use("/api", routerNota);
app.use("/api", routerAviso);
app.use("/api", routerEvento);
app.use("/api", routerReuniao);
app.use("/api", routerMensagem);
app.use("/api", routerRelatorio);
app.use("/api", routerStats);
app.use("/api/feedbacks", routerFeedback);

// ── SPA Fallback ──────────────────────────────────────────────
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(frontPath, "index.html"), err => {
    if (err) next();
  });
});

// ── 404 Handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada", path: req.path });
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("[ERRO GLOBAL]", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  // Erro específico do multer
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "Ficheiro demasiado grande." });
  }

  res.status(500).json({ error: "Erro interno do servidor" });
});

// ── WebSocket ─────────────────────────────────────────────────
configurarWebSocket(server);

// ── Graceful Shutdown ─────────────────────────────────────────
const shutdown = async (sig) => {
  console.log(`\n🛑 ${sig} recebido — a encerrar...`);
  
  // Fechar conexões WebSocket
  server.close(async () => {
    console.log("🔌 Servidor HTTP fechado.");
    
    // Desconectar Prisma
    await prisma.$disconnect();
    console.log("🗄️  Prisma desconectado.");
    
    process.exit(0);
  });
  
  // Forçar encerramento após 10 segundos
  setTimeout(() => {
    console.error("⚠️  Timeout - forçando encerramento.");
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  shutdown("uncaughtException");
});

// ── Start Server ──────────────────────────────────────────────
server.listen(PORTA, "0.0.0.0", () => {
  console.log("\n═══════════════════════════════════════════════");
  console.log(`🚀  SchoolConnect Backend v2.0.0`);
  console.log(`📡  Servidor na porta ${PORTA}`);
  console.log(`🗄️   DATABASE_URL: ${process.env.DATABASE_URL ?? "NÃO DEFINIDA"}`);
  console.log(`🔧  Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("═══════════════════════════════════════════════\n");
});