
import { Router } from "express";
import controllerFeedback from "../controller/controllerFeedback.js";
const router = Router();
router.post("/",    controllerFeedback.criarFeedback);
router.get("/",     controllerFeedback.listarFeedbacks);
router.delete("/:id", controllerFeedback.removerFeedback);
export default router;