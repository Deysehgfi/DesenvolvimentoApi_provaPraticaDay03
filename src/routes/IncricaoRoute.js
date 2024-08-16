import { Router } from "express"

const router = Router()

import {criarInscricao} from "../controllers/Incricao-CONTROLLERS.js"



router.post("/", criarInscricao)

export default router;