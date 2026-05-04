
import { ServiceTurma } from "../service/ServiceTurma.js";

export class ControllerTurma {
  static async criarTurma(req, res) {
    try { return res.status(201).json(await ServiceTurma.criarTurma(req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async listarTurmas(req, res) {
    try { return res.json(await ServiceTurma.listarTurmas()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterTurmaPorId(req, res) {
    try { return res.json(await ServiceTurma.obterTurmaPorId(req.params.id)); }
    catch (e) { return res.status(e.message.includes("não encontrada") ? 404 : 500).json({ error: e.message }); }
  }
  static async atualizarTurma(req, res) {
    try { return res.json(await ServiceTurma.atualizarTurma(req.params.id, req.body)); }
    catch (e) { return res.status(e.message.includes("não encontrada") ? 404 : 400).json({ error: e.message }); }
  }
  static async deletarTurma(req, res) {
    try { return res.json(await ServiceTurma.deletarTurma(req.params.id)); }
    catch (e) { return res.status(e.message.includes("não encontrada") ? 404 : 500).json({ error: e.message }); }
  }
}