import { Router } from "express"

const router = Router()

import { cadastrarParticipante, getTodosParticipantes } from "../controllers/Participante-CONTROLLERS.js";


router.get("/", getTodosParticipantes);
router.post("/register", cadastrarParticipante )

export default router;