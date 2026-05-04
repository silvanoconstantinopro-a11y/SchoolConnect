import { ServiceMensagem }  from "../service/serviceMensagem.js";
import { enviarMensagemWS } from "../websocket.js";
import { handle }           from "./_base.js";

export class ControllerMensagem {

  static criarMensagem = handle(async (req) => {
    const file = req.file;
    const msg  = await ServiceMensagem.criarMensagem({
      ...req.body,
      remetenteId:    req.user.id,
      arquivoNome:    file?.originalname,
      arquivoTipo:    file?.mimetype,
      arquivoTamanho: file?.size,
      arquivoUrl:     file ? `/uploads/arquivos/${file.filename}` : undefined,
    });
    enviarMensagemWS(msg.destinatarioId, { tipo: "nova_mensagem", mensagem: msg });
    return msg;
  }, 201);

  static listarMensagens = handle(async (req) => {
    const { usuarioId, comUsuarioId } = req.query;
    return ServiceMensagem.listarMensagens(usuarioId, comUsuarioId);
  });

  static listarContactos = handle(async (req) => {
    return ServiceMensagem.listarContactos(req.user.id);
  });

  static obterMensagemPorId = handle(async (req) => {
    return ServiceMensagem.obterMensagemPorId(req.params.id);
  });

  static atualizarMensagem = handle(async (req) => {
    const msg = await ServiceMensagem.atualizarMensagem(req.params.id, {
      conteudo:  req.body.conteudo,
      usuarioId: req.user.id,
    });
    enviarMensagemWS(msg.destinatarioId, { tipo: "mensagem_editada", mensagem: msg });
    return msg;
  });

  static deletarMensagem = handle(async (req) => {
    const tipo   = req.body.tipo || "para_todos";
    const before = await ServiceMensagem.obterMensagemPorId(req.params.id);
    const result = await ServiceMensagem.deletarMensagem(req.params.id, req.user.id, tipo);
    if (tipo === "para_todos")
      enviarMensagemWS(before.destinatarioId, { tipo: "mensagem_deletada", mensagemId: req.params.id });
    return result;
  });
}