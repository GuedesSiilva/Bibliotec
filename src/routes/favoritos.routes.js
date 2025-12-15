import express from "express";
import {Favoritar , listarFavoritos ,DeletarFavoritos, listarFavoritosPorID} from "../controllers/favoritos.controllers.js";

const router = express.Router();


router.get("/", listarFavoritos);

router.get("/:id", listarFavoritosPorID);

router.post("/", Favoritar);

router.delete("/:usuarioId/:livroId", DeletarFavoritos);


export default router;