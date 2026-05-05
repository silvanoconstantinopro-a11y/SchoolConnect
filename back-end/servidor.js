// ⚠️ DOTENV PRIMEIRO — antes de qualquer import que use process.env
import "dotenv/config";

import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Prisma — importado depois do dotenv para garantir que DATABASE_URL já existe
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

// ── Validação de diretórios necessários ─────────────────────
const verificarDiretorios = () => {
  const diretorios = [frontPath, imgPath, uploadsPath];
  
  diretorios.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️  Diretório não encontrado: ${dir}`);
      try {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Diretório criado: ${dir}`);
      } catch (error) {
        console.error(`❌ Erro ao criar diretório ${dir}:`, error.message);
      }
    }
  });
};

// ── App ───────────────────────────────────────────────────────
const PORTA = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// ── Configuração CORS melhorada ───────────────────────────────
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400 // 24 horas
};

app.use(cors(corsOptions));

// ── Middlewares de parsing ────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Middleware de logging (apenas em desenvolvimento) ─────────
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.path}`);
    next();
  });
}

// ── Middleware de segurança básica ────────────────────────────
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// ── Verificar diretórios antes de iniciar ─────────────────────
verificarDiretorios();

// ── Estáticos com fallback ────────────────────────────────────
app.use(express.static(frontPath, { 
  maxAge: "1d",
  etag: true,
  lastModified: true 
}));

app.use("/img", express.static(imgPath, { 
  maxAge: "7d",
  etag: true 
}));

app.use("/uploads", express.static(uploadsPath, { 
  maxAge: "1d",
  etag: true 
}));

// ── Health check aprimorado ───────────────────────────────────
app.get("/api/health", async (_, res) => {
  const health = {
    status: "online",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    database: "checking..."
  };
  
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.database = "connected";
  } catch (error) {
    health.database = "disconnected";
    health.status = "degraded";
    console.error("[HEALTH] Database check failed:", error.message);
  }
  
  res.json(health);
});

// ── API Routes ─────────────────────────────────────────────────
const apiRouter = express.Router();

apiRouter.use("/usuarios", routerUsuarios);
apiRouter.use("/admin", routerAdmin);
apiRouter.use("/alunos", routerAluno);
apiRouter.use("/turmas", routerTurma);
apiRouter.use("/cursos", routerCurso);
apiRouter.use("/disciplinas", routerDisciplina);
apiRouter.use("/notas", routerNota);
apiRouter.use("/avisos", routerAviso);
apiRouter.use("/eventos", routerEvento);
apiRouter.use("/reunioes", routerReuniao);
apiRouter.use("/mensagens", routerMensagem);
apiRouter.use("/relatorios", routerRelatorio);
apiRouter.use("/stats", routerStats);
apiRouter.use("/feedbacks", routerFeedback);

app.use("/api", apiRouter);

// ── Rota de teste para verificar API ──────────────────────────
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API está funcionando!", 
    endpoints: [
      "/api/usuarios",
      "/api/admin",
      "/api/alunos",
      "/api/turmas",
      "/api/cursos",
      "/api/disciplinas",
      "/api/notas",
      "/api/avisos",
      "/api/eventos",
      "/api/reunioes",
      "/api/mensagens",
      "/api/relatorios",
      "/api/stats",
      "/api/feedbacks"
    ]
  });
});

// ── SPA fallback melhorado ────────────────────────────────────
app.use((req, res, next) => {
  // Ignora requisições de API, arquivos estáticos e websocket
  if (req.path.startsWith("/api") || 
      req.path.includes(".") || 
      req.headers.upgrade === "websocket") {
    return next();
  }
  
  const indexPath = path.join(frontPath, "index.html");
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("[SPA FALLBACK] Erro ao servir index.html:", err);
        next();
      }
    });
  } else {
    console.warn(`[SPA FALLBACK] index.html não encontrado em: ${indexPath}`);
    res.status(404).json({ 
      error: "Página não encontrada",
      message: "O arquivo index.html não foi encontrado no front-end"
    });
  }
});

// ── 404 handler para API ──────────────────────────────────────
app.use("/api/*", (req, res) => {
  res.status(404).json({ 
    error: "Rota não encontrada",
    path: req.originalUrl,
    method: req.method
  });
});

// ── Error handler global melhorado ────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[ERRO GLOBAL]", {
    message: err.message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
    url: req.url,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString()
  });
  
  // Erros específicos
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Payload muito grande" });
  }
  
  if (err.name === "SyntaxError" && err.message.includes("JSON")) {
    return res.status(400).json({ error: "JSON mal formatado" });
  }
  
  res.status(err.status || 500).json({ 
    error: process.env.NODE_ENV !== "production" ? err.message : "Erro interno do servidor"
  });
});

// ── WebSocket ─────────────────────────────────────────────────
try {
  configurarWebSocket(server);
  console.log("✅ WebSocket configurado com sucesso");
} catch (error) {
  console.error("❌ Erro ao configurar WebSocket:", error.message);
}

// ── Graceful shutdown aprimorado ──────────────────────────────
const shutdown = async (signal) => {
  console.log(`\n⚠️  ${signal} recebido — iniciando shutdown graceful...`);
  
  // Timeout para forçar encerramento
  const forceExit = setTimeout(() => {
    console.error("❌ Shutdown forçado após timeout de 10 segundos");
    process.exit(1);
  }, 10000);
  
  try {
    // Desconectar Prisma
    await prisma.$disconnect();
    console.log("✅ Prisma desconectado");
    
    // Fechar servidor HTTP/WebSocket
    server.close(() => {
      console.log("✅ Servidor HTTP fechado");
      clearTimeout(forceExit);
      console.log("👋 Servidor encerrado com sucesso");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Erro durante shutdown:", error);
    clearTimeout(forceExit);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Tratamento de exceções não capturadas
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  shutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  shutdown("UNHANDLED_REJECTION");
});

// ── Validação de ambiente ─────────────────────────────────────
const validarAmbiente = () => {
  const requiredVars = ["DATABASE_URL"];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error("❌ Variáveis de ambiente ausentes:", missingVars.join(", "));
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
  
  console.log("✅ Ambiente validado");
  console.log(`📦 Modo: ${process.env.NODE_ENV || "development"}`);
};

// ── Start aprimorado ──────────────────────────────────────────
validarAmbiente();

server.listen(PORTA, "0.0.0.0", () => {
  console.log("\n" + "=".repeat(50));
  console.log(`🚀 Servidor iniciado com sucesso!`);
  console.log("=".repeat(50));
  console.log(`📡 Porta: ${PORTA}`);
  console.log(`🌐 URL: http://localhost:${PORTA}`);
  console.log(`🗄️  Database: ${process.env.DATABASE_URL ? "✅ Configurada" : "❌ Não definida"}`);
  console.log(`📁 Front-end: ${fs.existsSync(frontPath) ? "✅" : "❌"} ${frontPath}`);
  console.log(`🖼️  Imagens: ${fs.existsSync(imgPath) ? "✅" : "❌"} ${imgPath}`);
  console.log(`📤 Uploads: ${fs.existsSync(uploadsPath) ? "✅" : "❌"} ${uploadsPath}`);
  console.log("=".repeat(50));
  
  if (!fs.existsSync(frontPath)) {
    console.warn("⚠️  ATENÇÃO: Diretório front-end não encontrado!");
    console.warn(`   Certifique-se de que o front-end está em: ${frontPath}`);
  }
  
  console.log("\n✅ Servidor pronto para receber requisições\n");
});

// Exportar para testes (opcional)
export { app, server };