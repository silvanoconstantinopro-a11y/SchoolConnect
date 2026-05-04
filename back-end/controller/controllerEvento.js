import { ServiceEvento } from "../service/serviceEvento.js";
import { uploadImagem }   from "../middlewares/upload.js";
import { handle }         from "./_base.js";

export class ControllerEvento {
  static criarEvento = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = { ...req.body };
      if (req.file) dados.imagem = `/uploads/imagens/${req.file.filename}`;
      return ServiceEvento.criarEvento(dados);
    }, 201),
  ];

  static listarEventos    = handle(async (req) => ServiceEvento.listarEventos(req.query));
  static obterEventoPorId = handle(async (req) => ServiceEvento.obterEventoPorId(req.params.id));

  static atualizarEvento = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = { ...req.body };
      if (req.file) dados.imagem = `/uploads/imagens/${req.file.filename}`;
      return ServiceEvento.atualizarEvento(req.params.id, dados);
    }),
  ];

  static deletarEvento = handle(async (req) => ServiceEvento.deletarEvento(req.params.id));
}