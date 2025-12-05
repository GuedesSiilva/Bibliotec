import express from "express";
import {
    ListarLivros,
    ObterLivros,
    PostarLivros,
    AtualizarLivros,
    DeletarLivros
} from "../controllers/livros.controllers.js";

const router = express.Router();


router.get("/", ListarLivros);
router.get("/:id", ObterLivros);
router.post("/", PostarLivros);
router.put("/:id", AtualizarLivros);
router.delete("/:id", DeletarLivros);

export default router;