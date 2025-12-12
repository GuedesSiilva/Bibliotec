import { Router } from "express";
import { getCategoria, getLivrosPorCategoria } from "../controllers/categorias.controllers.js";

const router = Router();

router.get("/:id", getCategoria);

router.get("/:id/livros", getLivrosPorCategoria);

export default router;
