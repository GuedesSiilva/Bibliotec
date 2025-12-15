import { Router } from "express";
import { getCategoria, getLivrosPorCategoria,getTodasCategorias } from "../controllers/categorias.controllers.js";

const router = Router();

router.get("/", getTodasCategorias);

router.get("/:id", getCategoria);

router.get("/:id/livros", getLivrosPorCategoria);

export default router;
