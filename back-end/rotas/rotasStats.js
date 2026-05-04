
import { Router } from "express";
import { ControllerStats } from "../controller/controllerStats.js";
const router = Router();
router.get("/stats",          ControllerStats.getStats);
router.get("/stats/usuarios", ControllerStats.listarUsuarios);
router.get("/stats/cursos",   ControllerStats.listarCursos);
router.get("/stats/alunos",   ControllerStats.listarAlunos);
router.get("/stats/avisos",   ControllerStats.listarAvisos);
router.get("/stats/eventos",  ControllerStats.listarEventos);
router.get("/stats/reunioes", ControllerStats.listarReunioes);
router.get("/stats/turmas",   ControllerStats.listarTurmas);
export default router;