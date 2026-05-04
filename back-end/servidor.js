// ⚠️  DOTENV PRIMEIRO — antes de qualquer import que use process.env
import "dotenv/config";

import http            from "http";
import express         from "express";
import cors            from "cors";
import path            from "path";
import { fileURLToPath } from "url";

// Prisma — importado depois do dotenv para garantir que DATABASE_URL já existe
import { prisma }      from "./prismaClient/prismaClient.js";
import { configurarWebSocket } from "./websocket.js";

// ── Rotas ────────────────────────────────────────────────────
import { routerUsuarios }  from "./rotas/rotasUsuario.js";
import { routerAdmin }     from "./rotas/rotasAdmin.js";
import { routerAluno }     from "./rotas/rotasAluno.js";
import { routerTurma }     from "./rotas/rotasTurma.js";
import { routerCurso }     from "./rotas/rotasCurso.js";
import { routerDisciplina} from "./rotas/rotasDisciplina.js";
import { routerNota }      from "./rotas/rotasNota.js";
import { routerAviso }     from "./rotas/rotasAviso.js";
import { routerEvento }    from "./rotas/rotasEvento.js";
import { routerReuniao }   from "./rotas/rotasReuniao.js";
import { routerMensagem }  from "./rotas/rotasMensagem.js";
import { routerRelatorio } from "./rotas/rotasRelatorio.js";
import routerStats         from "./rotas/rotasStats.js";
import routerFeedback      from "./rotas/rotasFeedback.js";

// ── Paths ─────────────────────────────────────────────────────
const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const rootPath   = path.resolve(__dirname, "..");
const frontPath  = path.join(rootPath, "front-end");
const imgPath    = path.join(rootPath, "img");
const uploadsPath = path.join(__dirname, "uploads");

// ── App ───────────────────────────────────────────────────────
const PORTA = process.env.PORT || 3000;
const app    = express();
const server = http.createServer(app);

app.use(cors({
  origin:  "*",
  methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Estáticos ─────────────────────────────────────────────────
app.use(express.static(frontPath));
app.use("/img",     express.static(imgPath));
app.use("/uploads", express.static(uploadsPath));

// ── Health ────────────────────────────────────────────────────
app.get("/api/health", (_, res) =>
  res.json({ status: "online", ts: new Date() })
);

// ── API ───────────────────────────────────────────────────────
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

// ── SPA fallback ──────────────────────────────────────────────
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(frontPath, "index.html"), err => { if (err) next(); });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ error: "Rota não encontrada" })
);

// ── Erro global ───────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[ERRO GLOBAL]", err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// ── WebSocket ─────────────────────────────────────────────────
configurarWebSocket(server);

// ── Graceful shutdown ─────────────────────────────────────────
const shutdown = async (sig) => {
  console.log(`\n${sig} recebido — a encerrar...`);
  await prisma.$disconnect();
  server.close(() => {
    console.log("Servidor encerrado.");
    process.exit(0);
  });
};
process.on("SIGINT",  () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// ── Start ─────────────────────────────────────────────────────
server.listen(PORTA, "0.0.0.0", () => {
  console.log(`🚀  Servidor na porta ${PORTA}`);
  console.log(`🗄️   DATABASE_URL: ${process.env.DATABASE_URL ?? "NÃO DEFINIDA"}`);
});