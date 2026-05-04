import { ServiceNota } from "../service/serviceNota.js";
export class ControllerNota {
  static async criarNota(req, res) {
    try { return res.status(201).json(await ServiceNota.criarNota(req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async listarNotas(req, res) {
    try { return res.json(await ServiceNota.listarNotas()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterNotaPorId(req, res) {
    try { return res.json(await ServiceNota.obterNotaPorId(req.params.id)); }
    catch (e) { return res.status(404).json({ error: e.message }); }
  }
  static async atualizarNota(req, res) {
    try { return res.json(await ServiceNota.atualizarNota(req.params.id, req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async deletarNota(req, res) {
    try { return res.json(await ServiceNota.deletarNota(req.params.id)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
}

