import { ServiceFeedback } from "../service/serviceFeedback.js";
import { handle }           from "./_base.js";

const controllerFeedback = {
  criarFeedback:   handle(async (req) => ServiceFeedback.criarFeedback(req.body), 201),
  listarFeedbacks: handle(async ()    => ServiceFeedback.listarFeedbacks()),
  removerFeedback: handle(async (req) => ServiceFeedback.removerFeedback(req.params.id)),
};

export default controllerFeedback;