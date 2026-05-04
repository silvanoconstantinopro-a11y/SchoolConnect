
import { ServiceDisciplina } from "../service/serviceDisciplina.js";

export class ControllerDisciplina {
  static async criarDisciplina(req, res) {
    try { return res.status(201).json(await ServiceDisciplina.criarDisciplina(req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async listarDisciplinas(req, res) {
    try { return res.json(await ServiceDisciplina.listarDisciplinas()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterDisciplinaPorId(req, res) {
    try { return res.json(await ServiceDisciplina.obterDisciplinaPorId(req.params.id)); }
    catch (e) { return res.status(e.message.includes("não encontrada") ? 404 : 500).json({ error: e.message }); }
  }
  static async atualizarDisciplina(req, res) {
    try { return res.json(await ServiceDisciplina.atualizarDisciplina(req.params.id, req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async deletarDisciplina(req, res) {
    try { return res.json(await ServiceDisciplina.deletarDisciplina(req.params.id)); }
    catch (e) { return res.status(e.message.includes("não encontrada") ? 404 : 500).json({ error: e.message }); }
  }
}