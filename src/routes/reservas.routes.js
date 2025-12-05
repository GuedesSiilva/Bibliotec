import express from "express";
import {
    listarReservas,
    criarReserva,
    DeletarReservas
} from "../controllers/reservas.controllers.js";

const router = express.Router();


router.get("/", listarReservas);
router.post("/", criarReserva);
router.delete("/:id", DeletarReservas);

export default router;