import { WebSocketServer } from "ws";
import { JWT }             from "./bcrypt-jwt/jwt.js";

/** Mapa: usuarioId (Number) → WebSocket */
const clientes = new Map();

export function configurarWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    let userId = null;

    try {
      const params  = new URL(req.url, "http://x").searchParams;
      const token   = params.get("token");
      const decoded = JWT.verificarToken(token);
      userId = Number(decoded.id);
      clientes.set(userId, ws);
      console.log(`🔌  WS conectado:     user ${userId}`);
    } catch (err) {
      ws.close(4001, "Token inválido");
      return;
    }

    // Heartbeat: mantém a conexão viva
    ws.isAlive = true;
    ws.on("pong", () => { ws.isAlive = true; });

    ws.on("close", () => {
      clientes.delete(userId);
      console.log(`🔌  WS desconectado:  user ${userId}`);
    });

    ws.on("error", err => console.error(`WS erro (user ${userId}):`, err.message));
  });

  // Ping a cada 30 s — encerra conexões mortas
  const interval = setInterval(() => {
    wss.clients.forEach(ws => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30_000);

  wss.on("close", () => clearInterval(interval));
}

/**
 * Envia um payload JSON a um utilizador específico.
 * @param {number|string} destinatarioId
 * @param {object} payload
 */
export function enviarMensagemWS(destinatarioId, payload) {
  const ws = clientes.get(Number(destinatarioId));
  if (ws?.readyState === 1) {
    ws.send(JSON.stringify(payload));
  }
}

/** Broadcast para todos os clientes ligados (útil p/ avisos globais). */
export function broadcast(payload) {
  const data = JSON.stringify(payload);
  clientes.forEach(ws => {
    if (ws.readyState === 1) ws.send(data);
  });
}