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

const PORTA = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// __dirname ES MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 MIDDLEWARES
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 📁 FRONT-END (IMPORTANTE)
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(process.cwd(), "img")));

// 📡 API TESTE
app.get("/api", (_, res) => {
  res.json({
    mensagem: "Bem-vindo ao SchoolConnect API"
  });
});

// 📁 UPLOADS
app.use("/uploads", express.static("uploads"));

// 🔥 ROTAS API (NÃO MEXE)
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

// 🌐 ROTAS FRONT-END LIMPA
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/login-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login-admin.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/professor", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard-professor.html"));
});

app.get("/encarregado", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard-encarregado.html"));
});

// 🔌 WEBSOCKET
const wss = configurarWebSocket(server);

// 🚀 START SERVER
server.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});