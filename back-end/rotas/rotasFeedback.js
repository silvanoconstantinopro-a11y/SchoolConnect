import { Router } from "express";
import controllerFeedback from "../controller/controllerFeedback.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

const router = Router();

// Rota pública para criar feedback
router.post("/", controllerFeedback.criarFeedback);

// Rotas protegidas (apenas admin)
router.get("/",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  controllerFeedback.listarFeedbacks
);

router.get("/estatisticas",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  controllerFeedback.getEstatisticas
);

router.get("/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  controllerFeedback.obterFeedbackPorId
);

router.delete("/:id",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  controllerFeedback.removerFeedback
);

export default router;