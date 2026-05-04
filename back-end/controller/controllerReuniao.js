import { ServiceReuniao } from "../service/serviceReuniao.js";

export class ControllerReuniao {
  static async criarReuniao(req, res) {
    try {
      const { titulo, linkMeeting, local, participantesIds, dataHora } = req.body;
      const criadoPorId = req.user?.id || null;
      return res.status(201).json(
        await ServiceReuniao.criarReuniao(titulo, linkMeeting, local, participantesIds, criadoPorId, dataHora)
      );
    } catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async listarReunioes(req, res) {
    try { return res.json(await ServiceReuniao.listarReunioes(req.query.usuarioId)); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  static async obterReuniaoPorId(req, res) {
    try { return res.json(await ServiceReuniao.obterReuniaoPorId(req.params.id)); }
    catch (e) { return res.status(404).json({ error: e.message }); }
  }
  static async atualizarReuniao(req, res) {
    try {
      const { titulo, linkMeeting, local, participantesIds } = req.body;
      return res.json(await ServiceReuniao.atualizarReuniao(req.params.id, titulo, linkMeeting, local, participantesIds));
    } catch (e) { return res.status(400).json({ error: e.message }); }
  }
  static async deletarReuniao(req, res) {
    try { return res.json(await ServiceReuniao.deletarReuniao(req.params.id)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  }
}



