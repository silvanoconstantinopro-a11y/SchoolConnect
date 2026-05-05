import { ServiceFeedback } from "../service/serviceFeedback.js";
import { handle } from "./_base.js";

const controllerFeedback = {
  criarFeedback: handle(async (req) => {
    const { nome, email, assunto, mensagem } = req.body;
    return ServiceFeedback.criarFeedback({ nome, email, assunto, mensagem });
  }, 201),

  listarFeedbacks: handle(async (req) => {
    const { limit, offset, email } = req.query;
    return ServiceFeedback.listarFeedbacks({ limit, offset, email });
  }),

  obterFeedbackPorId: handle(async (req) => {
    return ServiceFeedback.obterFeedbackPorId(req.params.id);
  }),

  removerFeedback: handle(async (req) => {
    return ServiceFeedback.removerFeedback(req.params.id);
  }),

  getEstatisticas: handle(async () => {
    return ServiceFeedback.getEstatisticas();
  })
};

export default controllerFeedback;