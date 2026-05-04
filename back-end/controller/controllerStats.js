
import { ServiceStats } from "../service/serviceStats.js";
export class ControllerStats {
  static async getStats(req, res) {
    try { return res.json({ success: true, data: await ServiceStats.getStats() }); }
    catch (e) { return res.status(500).json({ success: false, message: e.message }); }
  }
  static async listarUsuarios(req, res) {
    try { return res.json({ success: true, data: await ServiceStats.listarUsuarios() }); }
    catch (e) { return res.status(500).json({ success: false, message: e.message }); }
  }
  static async listarCursos(req, res) {
    try { return res.json({ success: true, data: await ServiceStats.listarCursos() }); }
    catch (e) { return res.status(500).json({ success: false, message: e.message }); }
  }
  static async listarAlunos(req, res) {
    try { return res.json({ success: true, data: await ServiceStats.listarAlunos() }); }
    catch (e) { return res.status(500).json({ success: false, message: e.message }); }
  }
  static async listarAvisos(req, res) {
    try { return res.json({ success: true, data: await ServiceStats.listarAvisos() }); }
    catch (e) { return res.status(500).json({ success: false, message: e.message }); }
  }
  static async listarEventos(req, res) {
    try { return res.json({ success: true, data: await ServiceStats.listarEventos() }); }
    catch (e) { return res.status(500).json({ success: false, message: e.message }); }
  }
  static async listarReunioes(req, res) {
    try { return res.json({ success: true, data: await ServiceStats.listarReunioes() }); }
    catch (e) { return res.status(500).json({ success: false, message: e.message }); }
  }
  static async listarTurmas(req, res) {
    try { return res.json({ success: true, data: await ServiceStats.listarTurmas() }); }
    catch (e) { return res.status(500).json({ success: false, message: e.message }); }
  }
}