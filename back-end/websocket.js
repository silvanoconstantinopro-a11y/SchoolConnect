import { WebSocketServer } from "ws";
import { JWT } from "./bcrypt-jwt/jwt.js";

/** Mapa: usuarioId (Number) → { ws, metadata } */
const clientes = new Map();
let wssInstance = null;

export function configurarWebSocket(server) {
  if (wssInstance) {
    console.warn("⚠️  WebSocket já configurado.");
    return wssInstance;
  }

  wssInstance = new WebSocketServer({ server });
  
  // Configurar heartbeat
  const heartbeatInterval = setInterval(() => {
    wssInstance.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        const clienteInfo = Array.from(clientes.entries()).find(([_, info]) => info.ws === ws);
        if (clienteInfo) {
          console.log(`🔌  Removendo cliente inativo: user ${clienteInfo[0]}`);
          clientes.delete(clienteInfo[0]);
        }
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wssInstance.on("close", () => {
    clearInterval(heartbeatInterval);
    wssInstance = null;
  });

  wssInstance.on("connection", (ws, req) => {
    let userId = null;

    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const token = url.searchParams.get("token");
      
      if (!token) {
        ws.close(4001, "Token não fornecido");
        return;
      }

      const decoded = JWT.verificarToken(token);
      userId = Number(decoded.id);
      
      if (!userId || isNaN(userId)) {
        ws.close(4001, "ID de utilizador inválido");
        return;
      }

      // Guardar conexão
      clientes.set(userId, { ws, metadata: { connectedAt: new Date(), user: decoded } });
      ws.isAlive = true;
      
      console.log(`🔌  WS conectado: user ${userId} (${decoded.perfil || "unknown"})`);
      
      // Notificar outros clientes sobre o status do utilizador (opcional)
      broadcast({ tipo: "user_status", userId, status: "online" }, [userId]);

    } catch (err) {
      console.error("❌ Erro na conexão WebSocket:", err.message);
      ws.close(4001, "Token inválido");
      return;
    }

    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("close", (code, reason) => {
      clientes.delete(userId);
      console.log(`🔌  WS desconectado: user ${userId} (code: ${code})`);
      
      // Notificar outros clientes
      broadcast({ tipo: "user_status", userId, status: "offline" });
    });

    ws.on("error", (err) => {
      console.error(`❌ WS erro (user ${userId}):`, err.message);
      clientes.delete(userId);
    });
  });

  console.log("🔌  WebSocket server configurado");
  return wssInstance;
}

/**
 * Envia payload a um utilizador específico
 * @param {number|string} destinatarioId
 * @param {object} payload
 * @returns {boolean} - true se enviado, false caso contrário
 */
export function enviarMensagemWS(destinatarioId, payload) {
  const cliente = clientes.get(Number(destinatarioId));
  
  if (!cliente) {
    console.debug(`⚠️  Utilizador ${destinatarioId} não está online`);
    return false;
  }
  
  const { ws } = cliente;
  if (ws?.readyState === 1) { // WebSocket.OPEN
    try {
      ws.send(JSON.stringify(payload));
      return true;
    } catch (err) {
      console.error(`❌ Erro ao enviar mensagem para ${destinatarioId}:`, err.message);
      return false;
    }
  }
  
  return false;
}

/**
 * Broadcast para todos os clientes ligados
 * @param {object} payload
 * @param {Array<number>} [excluir] - IDs de utilizadores a excluir
 */
export function broadcast(payload, excluir = []) {
  const data = JSON.stringify(payload);
  const excluirSet = new Set(excluir.map(id => Number(id)));
  let enviadas = 0;
  
  clientes.forEach(({ ws }, userId) => {
    if (!excluirSet.has(userId) && ws.readyState === 1) {
      try {
        ws.send(data);
        enviadas++;
      } catch (err) {
        console.error(`❌ Broadcast error for user ${userId}:`, err.message);
      }
    }
  });
  
  return enviadas;
}

/**
 * Obtém lista de utilizadores online
 * @returns {Array<object>}
 */
export function getUsuariosOnline() {
  const online = [];
  clientes.forEach(({ metadata }, userId) => {
    online.push({
      id: userId,
      perfil: metadata?.user?.perfil,
      connectedAt: metadata?.connectedAt
    });
  });
  return online;
}