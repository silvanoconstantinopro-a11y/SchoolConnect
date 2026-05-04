import { WebSocketServer } from "ws";
import { JWT }             from "./bcrypt-jwt/jwt.js";

// Mapa: usuarioId → WebSocket
const clientes = new Map();

export function configurarWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    const params  = new URL(req.url, "http://x").searchParams;
    const token   = params.get("token");
    let userId    = null;

    // Autenticar via token na query string
    try {
      const decoded = JWT.verificarToken(token);
      userId = decoded.id;
      clientes.set(userId, ws);
      console.log(`🔌  WS conectado: user ${userId}`);
    } catch {
      ws.close(4001, "Token inválido");
      return;
    }

    ws.on("close", () => {
      clientes.delete(userId);
      console.log(`🔌  WS desconectado: user ${userId}`);
    });

    ws.on("error", err => console.error(`WS erro (user ${userId}):`, err.message));
  });
}

export function enviarMensagemWS(destinatarioId, payload) {
  const ws = clientes.get(Number(destinatarioId));
  if (ws?.readyState === 1) {
    ws.send(JSON.stringify(payload));
  }
}