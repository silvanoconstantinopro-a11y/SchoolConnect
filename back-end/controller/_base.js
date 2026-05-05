/**
 * _base.js — helper partilhado por todos os controllers.
 * Centraliza o tratamento de erros e os status HTTP.
 */

/** Mapeia palavras-chave de erro para status HTTP */
function resolverStatus(mensagem = "", padrao = 400) {
  const m = mensagem.toLowerCase();
  
  // Erros de autenticação/autorização
  if (m.includes("não autenticado") || m.includes("token não fornecido")) return 401;
  if (m.includes("token expirado")) return 401;
  if (m.includes("token inválido")) return 401;
  if (m.includes("não autorizado") || m.includes("acesso negado")) return 403;
  if (m.includes("apenas o remetente")) return 403;
  
  // Erros de recurso
  if (m.includes("não encontrado") || m.includes("não existe")) return 404;
  if (m.includes("já existe") || m.includes("já registado")) return 409;
  if (m.includes("duplicado") || m.includes("único")) return 409;
  
  // Erros de validação
  if (m.includes("obrigatório") || m.includes("inválido")) return 400;
  if (m.includes("senha") && m.includes("caracteres")) return 400;
  if (m.includes("email") && m.includes("válido")) return 400;
  
  return padrao;
}

/**
 * Envolve um handler assíncrono devolvendo erro formatado
 * @param {Function} fn - async (req, res) => any
 * @param {number} ok - status em sucesso (default 200)
 * @returns {Function} - Express middleware
 */
export function handle(fn, ok = 200) {
  return async (req, res) => {
    try {
      const result = await fn(req, res);
      
      // Se o handler já enviou a resposta, não fazer nada
      if (res.headersSent) return;
      
      // Se o resultado for null/undefined, retorna 204 No Content
      if (result === null || result === undefined) {
        return res.status(204).send();
      }
      
      return res.status(ok).json(result);
    } catch (err) {
      const status = resolverStatus(err.message);
      const errorResponse = {
        error: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
      };
      
      // Log de erros 500
      if (status === 500) {
        console.error(`[ERRO ${status}]`, err);
      }
      
      return res.status(status).json(errorResponse);
    }
  };
}

/**
 * Versão paginada do handle - extrai parâmetros de paginação
 */
export function handlePaginated(fn) {
  return async (req, res) => {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
      const skip = (page - 1) * limit;
      
      const result = await fn(req, { skip, take: limit });
      
      if (res.headersSent) return;
      
      return res.status(200).json({
        data: result.data,
        pagination: {
          page,
          limit,
          total: result.total,
          pages: Math.ceil(result.total / limit)
        }
      });
    } catch (err) {
      const status = resolverStatus(err.message);
      return res.status(status).json({ error: err.message });
    }
  };
}