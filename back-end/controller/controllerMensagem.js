
import { ServiceMensagem }  from "../service/serviceMensagem.js";
import { enviarMensagemWS } from "../websocket.js";

export class ControllerMensagem {
  static async criarMensagem(req, res) {
    try {
      const file = req.file;
      const msg  = await ServiceMensagem.criarMensagem({
        ...req.body,
        arquivoNome:   file?.originalname,
        arquivoTipo:   file?.mimetype,
        arquivoTamanho: file?.size,
        arquivoUrl:    file ? `/uploads/arquivos/${file.filename}` : undefined,
      });
      // Notificar destinatário via WebSocket
      enviarMensagemWS(msg.destinatarioId, { tipo: "nova_mensagem", mensagem: msg });
      return res.status(201).json(msg);
    } catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async listarMensagens(req, res) {
    try { return res.json(await ServiceMensagem.listarMensagens(req.query.usuarioId)); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterMensagemPorId(req, res) {
    try { return res.json(await ServiceMensagem.obterMensagemPorId(req.params.id)); }
    catch (e) { return res.status(404).json({ error: e.message }); }
  }
  static async atualizarMensagem(req, res) {
    try {
      const msg = await ServiceMensagem.atualizarMensagem(req.params.id, { conteudo: req.body.conteudo, usuarioId: req.user.id });
      enviarMensagemWS(msg.destinatarioId, { tipo: "mensagem_editada", mensagem: msg });
      return res.json(msg);
    } catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async deletarMensagem(req, res) {
    try {
      const before = await ServiceMensagem.obterMensagemPorId(req.params.id);
      const result = await ServiceMensagem.deletarMensagem(req.params.id, req.user?.id, req.body.tipo || "para_todos");
      if (req.body.tipo === "para_todos")
        enviarMensagemWS(before.destinatarioId, { tipo: "mensagem_deletada", mensagemId: req.params.id });
      return res.json(result);
    } catch (e) { return res.status(400).json({ error: e.message }); }
  }
}