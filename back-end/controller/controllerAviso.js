
import { ServiceAviso } from "../service/serviceAviso.js";
import { upload }        from "../middlewares/upload.js";

export class ControllerAviso {
  static criarAviso = [
    upload.single("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        if (req.file) dados.imagem = `/uploads/arquivos/${req.file.filename}`;
        return res.status(201).json(await ServiceAviso.criarAviso(dados));
      } catch (e) { return res.status(400).json({ error: e.message }); }
    },
  ];
  static async listarAvisos(req, res) {
    try { return res.json(await ServiceAviso.listarAvisos()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterAvisoPorId(req, res) {
    try { return res.json(await ServiceAviso.obterAvisoPorId(req.params.id)); }
    catch (e) { return res.status(404).json({ error: e.message }); }
  }
  static atualizarAviso = [
    upload.single("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        if (req.file) dados.imagem = `/uploads/arquivos/${req.file.filename}`;
        return res.json(await ServiceAviso.atualizarAviso(req.params.id, dados));
      } catch (e) { return res.status(400).json({ error: e.message }); }
    },
  ];
  static async deletarAviso(req, res) {
    try { return res.json(await ServiceAviso.deletarAviso(req.params.id)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
}