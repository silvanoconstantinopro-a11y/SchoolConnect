
import { ServiceEvento } from "../service/serviceEvento.js";
import { upload }         from "../middlewares/upload.js";

export class ControllerEvento {
  static criarEvento = [
    upload.single("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        if (req.file) dados.imagem = `/uploads/arquivos/${req.file.filename}`;
        return res.status(201).json(await ServiceEvento.criarEvento(dados));
      } catch (e) { return res.status(400).json({ error: e.message }); }
    },
  ];
  static async listarEventos(req, res) {
    try { return res.json(await ServiceEvento.listarEventos()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterEventoPorId(req, res) {
    try { return res.json(await ServiceEvento.obterEventoPorId(req.params.id)); }
    catch (e) { return res.status(404).json({ error: e.message }); }
  }
  static atualizarEvento = [
    upload.single("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        if (req.file) dados.imagem = `/uploads/arquivos/${req.file.filename}`;
        return res.json(await ServiceEvento.atualizarEvento(req.params.id, dados));
      } catch (e) { return res.status(400).json({ error: e.message }); }
    },
  ];
  static async deletarEvento(req, res) {
    try { return res.json(await ServiceEvento.deletarEvento(req.params.id)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
}