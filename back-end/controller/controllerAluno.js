import { ServiceAluno } from "../service/serviceAluno.js";

export class ControllerAluno {
  static async criarAluno(req, res) {
    try { return res.status(201).json(await ServiceAluno.criarAluno(req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async listarAlunos(req, res) {
    try { return res.json(await ServiceAluno.listarAlunos()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterAlunoPorId(req, res) {
    try { return res.json(await ServiceAluno.obterAlunoPorId(req.params.id)); }
    catch (e) { return res.status(e.message.includes("não encontrado") ? 404 : 500).json({ error: e.message }); }
  }
  static async atualizarAluno(req, res) {
    try { return res.json(await ServiceAluno.atualizarAluno(req.params.id, req.body)); }
    catch (e) { return res.status(e.message.includes("não encontrado") ? 404 : 400).json({ error: e.message }); }
  }
  static async deletarAluno(req, res) {
    try { return res.json(await ServiceAluno.deletarAluno(req.params.id)); }
    catch (e) { return res.status(e.message.includes("não encontrado") ? 404 : 500).json({ error: e.message }); }
  }
}


