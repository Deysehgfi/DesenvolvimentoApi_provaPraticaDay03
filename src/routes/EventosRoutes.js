import { Router } from "express"

const router = Router()


import { criarEvento, getTodosEventos, listarEvento , editarEvento, cancelarEvento, getEventoPopular } from "../controllers/Eventos-CONTROLLERS.js";

router.get("/", getTodosEventos)
router.post("/criar", criarEvento)
router.get("/agenda/:id", listarEvento)
router.put("/editar", editarEvento)
router.delete("/cancelar", cancelarEvento)
router.get("/mais-popular", getEventoPopular)

export default router;