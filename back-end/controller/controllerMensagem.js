import { ServiceMensagem } from "../service/serviceMensagem.js";
import { upload } from "../middlewares/upload.js";
import { handle } from "./_base.js";

export class ControllerMensagem {

  static criarMensagem = [
    upload.single("arquivo"),
    handle(async (req) => {
      const file = req.file;
      const mensagem = await ServiceMensagem.criarMensagem({
        ...req.body,
        remetenteId: req.user.id,
        arquivoNome: file?.originalname,
        arquivoTipo: file?.mimetype,
        arquivoTamanho: file?.size,
        arquivoUrl: file ? `/uploads/arquivos/${file.filename}` : undefined
      });
      return mensagem;
    }, 201)
  ];

  static listarMensagens = handle(async (req) => {
    const { comUsuarioId } = req.query;
    return ServiceMensagem.listarMensagens(req.user.id, comUsuarioId);
  });

  static listarContactos = handle(async (req) => {
    return ServiceMensagem.listarContactos(req.user.id);
  });

  static obterMensagemPorId = handle(async (req) => {
    return ServiceMensagem.obterMensagemPorId(req.params.id);
  });

  static atualizarMensagem = handle(async (req) => {
    const { conteudo } = req.body;
    if (!conteudo) throw new Error("Conteúdo é obrigatório.");
    return ServiceMensagem.atualizarMensagem(req.params.id, {
      conteudo,
      usuarioId: req.user.id
    });
  });

  static deletarMensagem = handle(async (req) => {
    const { tipo } = req.body;
    return ServiceMensagem.deletarMensagem(
      req.params.id,
      req.user.id,
      tipo || "para_todos"
    );
  });

  static marcarComoLida = handle(async (req) => {
    return ServiceMensagem.marcarComoLida(req.params.id, req.user.id);
  });
}