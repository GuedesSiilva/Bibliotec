import express from "express"; 
import { ListarAvaliacoesDeLivros, MediaAvaliacoesPorLivro, listarAvaliacoes, criarAvaliacao } from "../controllers/avaliacoes.controllers.js";

const router = express.Router(); 

router.get("/:id", listarAvaliacoes); 

router.get("/medias", ListarAvaliacoesDeLivros); 

router.get("/medias/:id", MediaAvaliacoesPorLivro); 

router.post("/", criarAvaliacao); 

export default router;