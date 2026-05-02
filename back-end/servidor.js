import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import path from "path"; // Import necessário para manipular caminhos
import { fileURLToPath } from "url"; // Necessário para ES Modules
import { configurarWebSocket } from "./websocket.js";
import { JWT } from "./bcrypt-jwt/jwt.js";

// Importando as rotas
import { routerUsuarios } from "./rotas/rotasUsuario.js";
import { routerAviso }  from "./rotas/rotasAviso.js";
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

// Configuração de diretórios para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORTA = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// 1. Configurações do middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// 2. Servir arquivos estáticos (Uploads e Front-end)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configuração vital: serve a pasta front-end que está fora da pasta back-end
// No Render, a estrutura é /src/back-end/ e /src/front-end/
app.use(express.static(path.join(__dirname, "..", "front-end")));

// 3. Rotas da API
app.get("/api", (_, res) => {
    res.json({mensagem: "Seja bem-vindo à API da Plataforma de Comunicação Escola-Família (SchoolConnect)!"});
});

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

// 4. Rota "Catch-all" para o Front-end
// Se não for uma rota de API ou arquivo estático, envia o index.html
app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(__dirname, "..", "front-end", "index.html"));
    }
});

const conexoes = new Map();
const wss = configurarWebSocket(server);

server.listen(PORTA, () => {
    console.log(`Servidor rodando em: https://schoolconnect-0ud2.onrender.com`);
    console.log(`Porta ativa: ${PORTA}`);
});
