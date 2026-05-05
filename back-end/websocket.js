import { WebSocketServer } from "ws";
import { JWT } from "./bcrypt-jwt/jwt.js";

// Configurações
const WS_HEARTBEAT_INTERVAL = 30000; // 30 segundos
const MAX_CONNECTIONS_PER_USER = 5;

// Mapas para gerenciamento de conexões
const clientes = new Map(); // userId -> Set de WebSockets
const userSessions = new Map(); // userId -> Map de sessionId -> WebSocket
const heartbeatIntervals = new Map(); // ws -> intervalId

// Logger interno
const logger = {
  info: (msg, data) => console.log(`✅ ${msg}`, data || ""),
  error: (msg, data) => console.error(`❌ ${msg}`, data || ""),
  warn: (msg, data) => console.warn(`⚠️  ${msg}`, data || ""),
  debug: (msg, data) => process.env.NODE_ENV !== "production" && console.log(`🔍 ${msg}`, data || "")
};

/**
 * Inicia heartbeat para uma conexão WebSocket
 */
function startHeartbeat(ws, userId) {
  let isAlive = true;
  
  ws.on("pong", () => {
    isAlive = true;
  });
  
  const intervalId = setInterval(() => {
    if (!isAlive) {
      logger.warn(`Heartbeat falhou para usuário ${userId}, encerrando conexão`);
      ws.terminate();
      return;
    }
    
    isAlive = false;
    ws.ping();
  }, WS_HEARTBEAT_INTERVAL);
  
  heartbeatIntervals.set(ws, intervalId);
}

/**
 * Limpa todos os recursos de uma conexão WebSocket
 */
function cleanupConnection(ws, userId, sessionId) {
  // Limpar heartbeat
  const heartbeatInterval = heartbeatIntervals.get(ws);
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatIntervals.delete(ws);
  }
  
  // Remover da sessão do usuário
  if (userId && sessionId) {
    const userSessionsMap = userSessions.get(userId);
    if (userSessionsMap) {
      userSessionsMap.delete(sessionId);
      if (userSessionsMap.size === 0) {
        userSessions.delete(userId);
      }
    }
  }
  
  // Remover do mapa de clientes
  if (userId) {
    const userConns = clientes.get(userId);
    if (userConns) {
      userConns.delete(ws);
      if (userConns.size === 0) {
        clientes.delete(userId);
      }
    }
  }
}

/**
 * Envia mensagem com retry
 */
export async function enviarMensagemWS(destinatarioId, payload, options = {}) {
  const {
    retries = 3,
    retryDelay = 1000
  } = options;
  
  if (!destinatarioId) {
    logger.error("Destinatário não informado");
    return false;
  }
  
  const userId = Number(destinatarioId);
  const userConns = clientes.get(userId);
  
  if (!userConns || userConns.size === 0) {
    logger.debug(`Usuário ${userId} não está conectado`);
    return false;
  }
  
  const message = JSON.stringify({
    ...payload,
    timestamp: new Date().toISOString(),
    messageId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  });
  
  let success = false;
  
  for (const ws of userConns) {
    let sent = false;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      if (ws.readyState === 1) { // WebSocket.OPEN
        try {
          ws.send(message);
          sent = true;
          logger.debug(`Mensagem enviada para usuário ${userId}, tentativa ${attempt}`);
          break;
        } catch (error) {
          logger.error(`Erro ao enviar mensagem para ${userId} (tentativa ${attempt}):`, error.message);
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          }
        }
      } else {
        logger.debug(`Conexão WS para ${userId} não está aberta (estado: ${ws.readyState})`);
        break;
      }
    }
    
    if (sent) {
      success = true;
    }
  }
  
  return success;
}

/**
 * Envia mensagem para múltiplos usuários
 */
export async function enviarMensagemMultiplosWS(destinatariosIds, payload, options = {}) {
  const resultados = await Promise.allSettled(
    destinatariosIds.map(id => enviarMensagemWS(id, payload, options))
  );
  
  return {
    total: destinatariosIds.length,
    sucessos: resultados.filter(r => r.status === "fulfilled" && r.value).length,
    falhas: resultados.filter(r => r.status === "rejected" || !r.value).length
  };
}

/**
 * Transmissão para todos os usuários conectados (broadcast)
 */
export function broadcastWS(payload, excludeUserId = null) {
  let count = 0;
  
  for (const [userId, connections] of clientes.entries()) {
    if (excludeUserId && userId === excludeUserId) continue;
    
    for (const ws of connections) {
      if (ws.readyState === 1) {
        try {
          ws.send(JSON.stringify({
            ...payload,
            broadcast: true,
            timestamp: new Date().toISOString()
          }));
          count++;
        } catch (error) {
          logger.error(`Erro no broadcast para usuário ${userId}:`, error.message);
        }
      }
    }
  }
  
  logger.debug(`Broadcast enviado para ${count} conexões`);
  return count;
}

/**
 * Obtém estatísticas das conexões ativas
 */
export function getWSStats() {
  const stats = {
    totalUsers: clientes.size,
    totalConnections: 0,
    usersDetails: []
  };
  
  for (const [userId, connections] of clientes.entries()) {
    const connCount = connections.size;
    stats.totalConnections += connCount;
    stats.usersDetails.push({
      userId,
      connections: connCount,
      sessions: userSessions.get(userId)?.size || 0
    });
  }
  
  return stats;
}

/**
 * Fecha todas as conexões de um usuário específico
 */
export function closeUserConnections(userId, reason = "Server shutdown") {
  const userConns = clientes.get(Number(userId));
  if (!userConns) return false;
  
  for (const ws of userConns) {
    if (ws.readyState === 1) {
      ws.close(1000, reason);
    }
    cleanupConnection(ws, userId, null);
  }
  
  clientes.delete(Number(userId));
  logger.info(`Conexões do usuário ${userId} encerradas: ${reason}`);
  return true;
}

/**
 * Configura o servidor WebSocket
 */
export function configurarWebSocket(server) {
  if (!server) {
    throw new Error("Servidor HTTP não fornecido");
  }
  
  const wss = new WebSocketServer({ 
    server,
    clientTracking: true
  });
  
  logger.info("Servidor WebSocket inicializado");
  
  wss.on("connection", (ws, req) => {
    const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const token = params.get("token");
    const sessionId = params.get("sessionId") || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    let userId = null;
    let userRole = null;
    
    // Autenticação via token JWT
    try {
      if (!token) {
        throw new Error("Token não fornecido");
      }
      
      const decoded = JWT.verificarToken(token);
      userId = decoded.id;
      userRole = decoded.perfil || "user";
      
      // Verificar limite de conexões por usuário
      const userConns = clientes.get(userId) || new Set();
      if (userConns.size >= MAX_CONNECTIONS_PER_USER) {
        logger.warn(`Usuário ${userId} excedeu limite máximo de conexões (${MAX_CONNECTIONS_PER_USER})`);
        ws.close(4002, "Limite de conexões excedido");
        return;
      }
      
      // Adicionar à estrutura de dados
      if (!clientes.has(userId)) {
        clientes.set(userId, new Set());
      }
      clientes.get(userId).add(ws);
      
      if (!userSessions.has(userId)) {
        userSessions.set(userId, new Map());
      }
      userSessions.get(userId).set(sessionId, ws);
      
      logger.info(`Usuário ${userId} (${userRole}) conectado via WebSocket | Sessão: ${sessionId}`);
      
    } catch (error) {
      logger.error(`Falha na autenticação WebSocket:`, error.message);
      ws.close(4001, `Token inválido: ${error.message}`);
      return;
    }
    
    // Iniciar heartbeat
    startHeartbeat(ws, userId);
    
    // Enviar confirmação de conexão
    ws.send(JSON.stringify({
      type: "connection_established",
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
      serverTime: Date.now()
    }));
    
    // Handler de mensagens recebidas
    ws.on("message", async (data, isBinary) => {
      try {
        let message;
        if (isBinary) {
          logger.debug(`Mensagem binária recebida de ${userId} (${data.length} bytes)`);
          message = { type: "binary", size: data.length };
        } else {
          message = JSON.parse(data.toString());
        }
        
        logger.debug(`Mensagem recebida de ${userId}:`, message.type || "unknown");
        
        // Echo para confirmação (opcional)
        if (message.type === "ping") {
          ws.send(JSON.stringify({ type: "pong", timestamp: Date.now() }));
        }
        
        // Disparar evento customizado se necessário
        ws.emit("message_processed", { userId, message });
        
      } catch (error) {
        logger.error(`Erro ao processar mensagem de ${userId}:`, error.message);
        ws.send(JSON.stringify({
          type: "error",
          error: "Erro ao processar mensagem",
          code: "PROCESSING_ERROR"
        }));
      }
    });
    
    // Handler de erro
    ws.on("error", (error) => {
      logger.error(`Erro na conexão WebSocket do usuário ${userId}:`, error.message);
    });
    
    // Handler de fechamento
    ws.on("close", (code, reason) => {
      logger.info(`Conexão WebSocket encerrada - Usuário: ${userId} | Código: ${code} | Razão: ${reason || "Sem razão"}`);
      cleanupConnection(ws, userId, sessionId);
    });
    
    // Evento customizado para quando a mensagem é processada
    ws.on("message_processed", (data) => {
      logger.debug(`Mensagem processada para ${data.userId}`);
    });
  });
  
  wss.on("error", (error) => {
    logger.error("Erro no servidor WebSocket:", error.message);
  });
  
  wss.on("headers", (headers, req) => {
    // Adicionar headers de segurança
    headers.push("X-WebSocket-Server: secure");
    headers.push("X-Content-Type-Options: nosniff");
  });
  
  // Função para fechar todas as conexões (graceful shutdown)
  wss.closeAllConnections = () => {
    logger.info("Encerrando todas as conexões WebSocket...");
    for (const [userId, connections] of clientes.entries()) {
      closeUserConnections(userId, "Server shutdown");
    }
  };
  
  logger.info("Servidor WebSocket pronto para conexões");
  return wss;
}

// Exportar utilitários adicionais
export default {
  configurarWebSocket,
  enviarMensagemWS,
  enviarMensagemMultiplosWS,
  broadcastWS,
  getWSStats,
  closeUserConnections
};