import express from "express";
import {Favoritar , listarFavoritos ,DeletarFavoritos} from "../controllers/favoritos.controllers.js";

const router = express.Router();


router.get("/", listarFavoritos);

router.post("/", Favoritar);

router.delete("/:id", DeletarFavoritos);


export default router;