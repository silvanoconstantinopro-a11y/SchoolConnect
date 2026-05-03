import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configurarWebSocket } from "./websocket.js";

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

// 🌍 CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 📦 Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =========================
// ❤️ HEALTH CHECK
// =========================
app.get("/api/health", (_, res) => {
  res.json({ status: "online", timestamp: new Date() });
});

// =========================
// 📂 STATIC FILES
// =========================
app.use(express.static(frontPath));
app.use("/img", express.static(imgPath));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// 🔗 ROTAS DA API
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
// 🌐 SPA FALLBACK (front-end)
// =========================
app.use((req, res, next) => {
  if (req.url.startsWith("/api")) return next();
  const indexPath = path.join(frontPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) next();
  });
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
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Erro global:", err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// =========================
// 🔌 WEBSOCKET
// =========================
configurarWebSocket(server);

// =========================
// 🛑 GRACEFUL SHUTDOWN
// =========================
const shutdown = async () => {
  console.log("Encerrando servidor...");
  const { prisma } = await import("./prismaClient/prismaClient.js");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Servidor encerrado.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// =========================
// 🚀 START
// =========================
server.listen(PORTA, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});
