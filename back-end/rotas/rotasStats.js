import { Router } from "express";
import { ControllerStats } from "../controller/controllerStats.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

const router = Router();

// Rotas públicas (dados básicos)
router.get("/stats", ControllerStats.getStats);
router.get("/stats/dashboard", ControllerStats.getDashboardData);

// Rotas protegidas (dados detalhados)
router.get("/stats/usuarios",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerStats.listarUsuarios
);

router.get("/stats/cursos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerStats.listarCursos
);

router.get("/stats/alunos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerStats.listarAlunos
);

router.get("/stats/avisos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerStats.listarAvisos
);

router.get("/stats/eventos",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerStats.listarEventos
);

router.get("/stats/reunioes",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerStats.listarReunioes
);

router.get("/stats/turmas",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN", "PROFESSOR"),
  ControllerStats.listarTurmas
);

router.get("/stats/periodo",
  MiddlewareAutenticacao.autenticar,
  MiddlewareAutenticacao.exigirPerfil("ADMIN"),
  ControllerStats.getStatsPorPeriodo
);

export default router;