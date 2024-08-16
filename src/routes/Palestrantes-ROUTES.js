import { Router } from "express"

const router = Router()

import { cadastrarPalestrante, getTodosPalestrantes } from "../controllers/Palestrantes-CONTROLLERS.js"


router.get("/", getTodosPalestrantes);
router.post("/cadastro", cadastrarPalestrante)

export default router;