import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configurarWebSocket } from "./websocket.js";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CAMINHOS CORRIGIDOS PARA A TUA ESTRUTURA
const pastaProjeto = path.resolve(__dirname, ".."); 
const frontPath = path.join(pastaProjeto, "front-end");
const imgPath = path.join(pastaProjeto, "img"); // A pasta img que está fora do front-end

const PORTA = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// --- SERVIR ARQUIVOS ESTÁTICOS (A MÁGICA ESTÁ AQUI) ---

// 1. Serve a pasta front-end
app.use(express.static(frontPath));

// 2. Serve a pasta img separadamente (como ela está fora do front-end)
app.use("/img", express.static(imgPath));

// 3. Serve a pasta de uploads do back-end
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- ROTAS DA API ---
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

app.get("/api", (_, res) => res.json({ mensagem: "SchoolConnect API Online!" }));

// --- NAVEGAÇÃO (ABRIR INDEX.HTML) ---
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) return next();

    // Tenta encontrar no front-end
    const ficheiro = path.join(frontPath, req.path);
    
    res.sendFile(ficheiro, (err) => {
        if (err) {
            // Se não for um ficheiro real, abre o index principal
            res.sendFile(path.join(frontPath, "index.html"));
        }
    });
});

configurarWebSocket(server);

server.listen(PORTA, () => {
    console.log(`Servidor rodando em: https://schoolconnect-0ud2.onrender.com`);
});
