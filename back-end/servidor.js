import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configurarWebSocket } from "./websocket.js";

// Rotas
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

// ES Modules config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORTA = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// 🔐 CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 📦 Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 📁 Static files
app.use(express.static(path.join(__dirname, "../front-end")));
app.use("/img", express.static(path.join(__dirname, "../img")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/front-end", express.static(path.join(__dirname, "../front-end")));

// 🧪 API test
app.get("/api", (_, res) => {
    res.json({
        mensagem: "Seja bem-vindo à API SchoolConnect 🚀"
    });
});

// 🌐 Rotas de páginas
const pages = [
    "index.html",
    "login-admin.html",
    "login.html",
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


// 🔥 FALLBACK CORRIGIDO (SEM * — isso evitava crash)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../front-end", "index.html"));
});


// 🔌 APIs
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

// 🔌 WebSocket
configurarWebSocket(server);

// 🚀 Start server
server.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
    console.log(`📡 API: http://localhost:${PORTA}/api`);
});