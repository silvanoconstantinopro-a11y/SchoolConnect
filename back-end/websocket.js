import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "chave-secreta-padrao-mude-isto-em-producao";

// Mapa de conexões WebSocket
const conexoes = new Map();

// Função para enviar mensagem para um usuário específico
export function enviarMensagemWS(userId, data) {
    const socket = conexoes.get(Number(userId));
    if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(data));
    }
}

// Função para enviar para múltiplos usuários
export function enviarParaMultiplos(userIds, data) {
    userIds.forEach(id => enviarMensagemWS(id, data));
}

// Função para configurar o WebSocket Server
export function configurarWebSocket(server) {
    const wss = new WebSocketServer({ 
        server,
        // Permite upgrade de conexão mesmo com CORS
        handleProtocols: () => true
    });

    wss.on("connection", (socket, request) => {
        try {
            // Extrair token da URL (query string)
            const url = new URL(request.url, `http://${request.headers.host}`);
            const token = url.searchParams.get("token");
            
            if (!token) {
                console.error("WebSocket: Token não fornecido");
                socket.close(1008, "Token não fornecido");
                return;
            }
            
            // Verificar token JWT
            let decoded;
            try {
                decoded = jwt.verify(token, SECRET_KEY);
            } catch (err) {
                console.error("WebSocket: Token inválido", err.message);
                socket.close(1008, "Token inválido");
                return;
            }
            
            const userId = Number(decoded.id);
            if (!userId || isNaN(userId)) {
                console.error("WebSocket: ID de usuário inválido");
                socket.close(1008, "ID de usuário inválido");
                return;
            }
            
            console.log(`🔌 WebSocket conectado: Usuário ${userId} (${decoded.perfil || 'desconhecido'})`);
            
            // Armazenar conexão
            conexoes.set(userId, socket);
            
            // Enviar confirmação de conexão
            socket.send(JSON.stringify({ 
                tipo: "conectado", 
                mensagem: "Conectado ao WebSocket",
                userId 
            }));

            socket.on("message", (raw) => {
                try {
                    const data = JSON.parse(raw.toString());
                    
                    if (!data.tipo) return;
                    
                    // Processar diferentes tipos de mensagens
                    switch (data.tipo) {
                        case "mensagem":
                            if (data.destinatarioId) {
                                enviarMensagemWS(data.destinatarioId, {
                                    ...data,
                                    origem: "ws"
                                });
                            }
                            break;
                            
                        case "mensagem_editada":
                            if (data.destinatarioId) {
                                enviarMensagemWS(data.destinatarioId, data);
                            }
                            break;
                            
                        case "mensagem_deletada":
                            if (data.destinatarioId) {
                                enviarMensagemWS(data.destinatarioId, data);
                            }
                            break;
                            
                        case "typing":
                            if (data.destinatarioId) {
                                enviarMensagemWS(data.destinatarioId, {
                                    tipo: "typing",
                                    userId: userId,
                                    destinatarioId: data.destinatarioId
                                });
                            }
                            break;
                            
                        case "entrar_conversa":
                            // Apenas log, útil para debug
                            console.log(`Usuário ${userId} entrou na conversa com ${data.destinatarioId}`);
                            break;
                            
                        default:
                            console.log(`WebSocket: Tipo desconhecido ${data.tipo}`);
                    }
                } catch (error) {
                    console.warn("WebSocket: Mensagem inválida:", error.message);
                }
            });

            socket.on("close", (code, reason) => {
                console.log(`🔌 WebSocket desconectado: Usuário ${userId}, código ${code}`);
                conexoes.delete(userId);
            });
            
            socket.on("error", (error) => {
                console.error(`WebSocket erro para usuário ${userId}:`, error.message);
            });
            
        } catch (error) {
            console.error("WebSocket: Erro na conexão:", error.message);
            socket.close(1011, "Erro interno");
        }
    });
    
    console.log("✅ WebSocket server configurado na mesma porta do HTTP");
    
    return wss;
}

// Função para obter número de conexões ativas
export function getConexoesAtivas() {
    return conexoes.size;
}