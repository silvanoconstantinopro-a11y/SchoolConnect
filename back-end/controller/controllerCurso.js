
import { ServiceCurso } from "../service/serviceCurso.js";

export class ControllerCurso {
  static async criarCurso(req, res) {
    try { return res.status(201).json(await ServiceCurso.criarCurso(req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async listarCursos(req, res) {
    try { return res.json(await ServiceCurso.listarCursos()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async listarCursosComDisciplinas(req, res) {
    try { return res.json(await ServiceCurso.listarCursosComDisciplinas()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterCursoPorId(req, res) {
    try { return res.json(await ServiceCurso.obterCursoPorId(req.params.id)); }
    catch (e) { return res.status(e.message.includes("não encontrado") ? 404 : 500).json({ error: e.message }); }
  }
  static async atualizarCurso(req, res) {
    try { return res.json(await ServiceCurso.atualizarCurso(req.params.id, req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async deletarCurso(req, res) {
    try { return res.json(await ServiceCurso.deletarCurso(req.params.id)); }
    catch (e) { return res.status(e.message.includes("não encontrado") ? 404 : 500).json({ error: e.message }); }
  }
}