
import { ServiceRelatorio } from "../service/serviceRelatorio.js";
export class ControllerRelatorio {
  static async criarRelatorio(req, res) {
    try { return res.status(201).json(await ServiceRelatorio.criarRelatorio(req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async listarRelatorios(req, res) {
    try { return res.json(await ServiceRelatorio.listarRelatorios()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterRelatorioPorId(req, res) {
    try { return res.json(await ServiceRelatorio.obterRelatorioPorId(req.params.id)); }
    catch (e) { return res.status(404).json({ error: e.message }); }
  }
  static async atualizarRelatorio(req, res) {
    try { return res.json(await ServiceRelatorio.atualizarRelatorio(req.params.id, req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async deletarRelatorio(req, res) {
    try { return res.json(await ServiceRelatorio.deletarRelatorio(req.params.id)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
}