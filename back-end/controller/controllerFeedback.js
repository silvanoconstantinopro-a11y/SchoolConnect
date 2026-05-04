
import { ServiceFeedback } from "../service/serviceFeedback.js";
const controllerFeedback = {
  async criarFeedback(req, res) {
    try { return res.status(201).json(await ServiceFeedback.criarFeedback(req.body)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  },
  async listarFeedbacks(req, res) {
    try { return res.json(await ServiceFeedback.listarFeedbacks()); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  },
  async removerFeedback(req, res) {
    try { return res.json(await ServiceFeedback.removerFeedback(req.params.id)); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  },
 
};
 export default controllerFeedback;