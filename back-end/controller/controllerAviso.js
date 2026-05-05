import { ServiceAviso } from "../service/serviceAviso.js";
import { uploadImagem } from "../middlewares/upload.js";
import { handle } from "./_base.js";

export class ControllerAviso {
  static criarAviso = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = { ...req.body };
      if (req.file) {
        dados.imagem = `/uploads/imagens/${req.file.filename}`;
      }
      return ServiceAviso.criarAviso(dados);
    }, 201)
  ];

  static listarAvisos = handle(async (req) => {
    const { limit, offset, search } = req.query;
    return ServiceAviso.listarAvisos({ limit, offset, search });
  });

  static obterAvisoPorId = handle(async (req) => {
    return ServiceAviso.obterAvisoPorId(req.params.id);
  });

  static atualizarAviso = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = { ...req.body };
      if (req.file) {
        dados.imagem = `/uploads/imagens/${req.file.filename}`;
      }
      return ServiceAviso.atualizarAviso(req.params.id, dados);
    })
  ];

  static deletarAviso = handle(async (req) => {
    return ServiceAviso.deletarAviso(req.params.id);
  });

  static getUltimosAvisos = handle(async (req) => {
    const limit = req.query.limit || 5;
    return ServiceAviso.getUltimosAvisos(limit);
  });
}