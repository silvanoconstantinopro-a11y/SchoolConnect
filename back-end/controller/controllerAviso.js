import { ServiceAviso } from "../service/serviceAviso.js";
import { uploadImagem }  from "../middlewares/upload.js";
import { handle }        from "./_base.js";

export class ControllerAviso {
  static criarAviso = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = { ...req.body };
      if (req.file) dados.imagem = `/uploads/imagens/${req.file.filename}`;
      return ServiceAviso.criarAviso(dados);
    }, 201),
  ];

  static listarAvisos    = handle(async (req) => ServiceAviso.listarAvisos(req.query));
  static obterAvisoPorId = handle(async (req) => ServiceAviso.obterAvisoPorId(req.params.id));

  static atualizarAviso = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = { ...req.body };
      if (req.file) dados.imagem = `/uploads/imagens/${req.file.filename}`;
      return ServiceAviso.atualizarAviso(req.params.id, dados);
    }),
  ];

  static deletarAviso = handle(async (req) => ServiceAviso.deletarAviso(req.params.id));
}