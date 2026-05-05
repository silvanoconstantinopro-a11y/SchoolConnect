import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configurarWebSocket } from "./websocket.js";
import { JWT } from "./bcrypt-jwt/jwt.js";

// Importando as rotas
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

// Configuração para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Configurações do middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, "../front-end")));
app.use("/img", express.static(path.join(__dirname, "../img")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas da API
app.get("/api", (_, res) => {
    res.json({
        mensagem: "Seja bem-vindo à API da Plataforma de Comunicação Escola-Família (SchoolConnect)!",
        versao: "1.0.0",
        status: "online"
    });
});

// Usando as rotas da API
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

// Rota para servir o index.html como página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/index.html"));
});

// Rota para servir arquivos HTML específicos
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/login.html"));
});

app.get("/login-admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/login-admin.html"));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/registro.html"));
});

app.get("/dashboard-encarregado", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/dashboard-encarregado.html"));
});

app.get("/dashboard-professor", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/dashboard-professor.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/admin.html"));
});

// Rota para servir outros arquivos HTML (capturar qualquer .html)
app.get("/*.html", (req, res) => {
    const fileName = req.params[0] + ".html";
    res.sendFile(path.join(__dirname, "../front-end", fileName));
});

// Rota 404 para API (rotas não encontradas)
app.use("/api/*", (req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada",
        mensagem: `A rota ${req.originalUrl} não existe`
    });
});

// Rota 404 para páginas (fallback)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../front-end/index.html"));
});

// Configurar WebSocket
const wss = configurarWebSocket(server);

// Iniciar servidor
server.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando com sucesso!`);
    console.log(`📍 URL: http://localhost:${PORTA}`);
    console.log(`📡 API: http://localhost:${PORTA}/api`);
    console.log(`🔌 WebSocket: ws://localhost:${PORTA}`);
    console.log(`📁 Front-end sendo servido na raiz`);
});