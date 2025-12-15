import express from "express";
import {
    ListarLivros,
    ObterLivros,
    PostarLivros,
    AtualizarLivros,
    DeletarLivros,
    ListarLivrosIds
} from "../controllers/livros.controllers.js";
import { upload } from "../middlewares/uploads.js";

const router = express.Router();


router.get("/", ListarLivros);
router.get("/:id", ObterLivros);
router.get("/ids", ListarLivrosIds);
router.post("/", upload.single("capa"), PostarLivros);
router.put("/:id", AtualizarLivros);
router.delete("/:id", DeletarLivros);

export default router;