/**
 * _base.js — helper partilhado por todos os controllers.
 * Centraliza o tratamento de erros e os status HTTP.
 */

/** Mapeia palavras-chave de erro para status HTTP. */
function resolverStatus(mensagem = "", padrao = 400) {
  const m = mensagem.toLowerCase();
  if (m.includes("não encontrad")) return 404;
  if (m.includes("não autorizado") || m.includes("apenas o remetente")) return 403;
  if (m.includes("token") || m.includes("expirado")) return 401;
  return padrao;
}

/**
 * Envolve um handler assíncrono devolvendo erro formatado.
 * @param {Function} fn   async (req, res) => any
 * @param {number}   ok   status em sucesso (default 200)
 */
export function handle(fn, ok = 200) {
  return async (req, res) => {
    try {
      const result = await fn(req, res);
      // Se o handler já enviou a resposta, não fazer nada
      if (res.headersSent) return;
      return res.status(ok).json(result);
    } catch (err) {
      const status = resolverStatus(err.message);
      return res.status(status).json({ error: err.message });
    }
  };
}