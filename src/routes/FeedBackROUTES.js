import { Router } from "express"

const router = Router()


import { criarFeedback } from "../controllers/Feedback-CONTROLLERS.js";


router.post("/", criarFeedback)

export default router;