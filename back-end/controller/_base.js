function resolverStatus(mensagem = "", padrao = 400) {
  const m = mensagem.toLowerCase();
  if (m.includes("não encontrado") || m.includes("não existe")) return 404;
  if (m.includes("não autorizado") || m.includes("apenas o remetente")) return 403;
  if (m.includes("token") || m.includes("expirado")) return 401;
  return padrao;
}

export function handle(fn, ok = 200) {
  return async (req, res) => {
    try {
      const result = await fn(req, res);
      if (res.headersSent) return;
      if (result === null || result === undefined) return res.status(204).send();
      return res.status(ok).json(result);
    } catch (err) {
      const status = resolverStatus(err.message);
      if (status === 500) console.error(`[ERRO]`, err);
      return res.status(status).json({ error: err.message });
    }
  };
}