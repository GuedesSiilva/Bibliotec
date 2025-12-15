import express from "express";
import {
    listarReservas,
    criarReserva,
    DeletarReserva,
    ListarReservasDeLivrosID
} from "../controllers/reservas.controllers.js";

const router = express.Router();


router.get("/", listarReservas);
router.get("/:id", ListarReservasDeLivrosID);
router.post("/", criarReserva);
router.delete("/:id", DeletarReserva);

export default router;