import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configurarWebSocket } from "./websocket.js";
import { PrismaClient } from "@prisma/client";

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

// CAMINHOS
const pastaProjeto = path.resolve(__dirname, ".."); 
const frontPath = path.join(pastaProjeto, "front-end");
const imgPath = path.join(pastaProjeto, "img");

const PORTA = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

// Middleware de LOG para todas as requisições
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(cors({ 
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
    allowedHeaders: ["Content-Type", "Authorization"] 
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// --- ROTA DE DEBUG PARA TESTAR LOGIN ---
app.post("/api/debug-login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        console.log("=== DEBUG LOGIN ===");
        console.log("Email recebido:", email);
        console.log("Senha recebida:", senha ? "***" : "vazia");
        
        if (!email || !senha) {
            return res.status(400).json({ 
                success: false, 
                message: "Email e senha são obrigatórios" 
            });
        }
        
        const emailFormatado = email.trim().toLowerCase();
        
        // Buscar usuário
        const usuario = await prisma.usuario.findUnique({
            where: { email: emailFormatado }
        });
        
        if (!usuario) {
            console.log("❌ Usuário NÃO encontrado");
            return res.json({ 
                success: false, 
                message: "Usuário não encontrado",
                usuarioEncontrado: false 
            });
        }
        
        console.log("✅ Usuário encontrado:", {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            perfil: usuario.perfil,
            senhaHash: usuario.senha ? usuario.senha.substring(0, 30) + "..." : "SEM HASH"
        });
        
        // Importar função compareSenha
        const { compareSenha } = await import('./bcrypt-jwt/hashSenha.js');
        
        // Testar senha
        const senhaValida = await compareSenha(senha, usuario.senha);
        console.log("🔐 Senha válida:", senhaValida);
        
        if (!senhaValida) {
            return res.json({
                success: true,
                usuarioEncontrado: true,
                senhaValida: false,
                message: "Senha incorreta"
            });
        }
        
        // Gerar token
        const { JWT } = await import('./bcrypt-jwt/jwt.js');
        const token = JWT.gerarToken({
            id: usuario.id,
            email: usuario.email,
            perfil: usuario.perfil
        });
        
        res.json({
            success: true,
            usuarioEncontrado: true,
            senhaValida: true,
            token: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }
        });
        
    } catch (error) {
        console.error("❌ Erro no debug:", error);
        res.status(500).json({ 
            success: false, 
            error: error.message,
            stack: error.stack 
        });
    }
});

// --- ROTA PARA CRIAR USUÁRIO DE TESTE ---
app.post("/api/criar-usuario-teste", async (req, res) => {
    try {
        const { hashSenha } = await import('./bcrypt-jwt/hashSenha.js');
        const senhaHash = await hashSenha("12345678");
        
        const usuario = await prisma.usuario.upsert({
            where: { email: "teste@schoolconnect.com" },
            update: {
                senha: senhaHash
            },
            create: {
                nome: "Usuário Teste",
                email: "teste@schoolconnect.com",
                senha: senhaHash,
                telefone: "+244 900 000 001",
                perfil: "ENCARREGADO"
            }
        });
        
        console.log("✅ Usuário de teste criado/atualizado:", usuario.email);
        
        res.json({
            success: true,
            message: "Usuário de teste criado com sucesso",
            email: "teste@schoolconnect.com",
            senha: "12345678"
        });
        
    } catch (error) {
        console.error("❌ Erro ao criar usuário de teste:", error);
        res.status(500).json({ error: error.message });
    }
});

// --- SERVIR ARQUIVOS ESTÁTICOS ---
app.use(express.static(frontPath));
app.use("/img", express.static(imgPath));
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

// --- NAVEGAÇÃO ---
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    
    const ficheiro = path.join(frontPath, req.path);
    
    res.sendFile(ficheiro, (err) => {
        if (err) {
            res.sendFile(path.join(frontPath, "index.html"));
        }
    });
});

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error("❌ Erro não tratado:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
});

configurarWebSocket(server);

server.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando em: https://schoolconnect-0ud2.onrender.com`);
    console.log(`📡 Porta: ${PORTA}`);
    console.log(`🔧 Rotas de debug disponíveis:`);
    console.log(`   POST /api/debug-login - Testar login`);
    console.log(`   POST /api/criar-usuario-teste - Criar usuário de teste`);
});