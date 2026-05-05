import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configurarWebSocket } from "./websocket.js";

// ROTAS
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const PORTA = process.env.PORT || 3000;

// =========================
// CORS
// =========================
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// =========================
// BODY
// =========================
app.use(express.json());

// =========================
// STATIC FRONTEND
// =========================
app.use(express.static(path.join(__dirname, "../front-end")));
app.use("/img", express.static(path.join(__dirname, "../img")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// HEALTH CHECK
// =========================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// =========================
// TESTE API
// =========================
app.get("/api", (req, res) => {
  res.json({ mensagem: "SchoolConnect API 🚀" });
});

// =========================
// ROTAS API
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
// FRONT PAGES (SEM FALLBACK GLOBAL)
// =========================
const pages = [
  "index.html",
  "login.html",
  "login-admin.html",
  "registro.html",
  "dashboard-encarregado.html",
  "dashboard-professor.html",
  "admin.html"
];

pages.forEach(page => {
  app.get(`/${page.replace(".html", "")}`, (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end", page));
  });
});

// =========================
// WEBSOCKET
// =========================
configurarWebSocket(server);

// =========================
// START
// =========================
server.listen(PORTA, () => {
  console.log(`🚀 Servidor: http://localhost:${PORTA}`);
});