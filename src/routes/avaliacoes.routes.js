import express from "express";
import { listarAvaliacoes, criarAvaliacao ,  ListarAvaliacoesDeLivros} from "../controllers/avaliacoes.controllers.js";

const router = express.Router();


router.get("/", listarAvaliacoes);

router.get("/media", ListarAvaliacoesDeLivros);

router.post("/", criarAvaliacao);


export default router;