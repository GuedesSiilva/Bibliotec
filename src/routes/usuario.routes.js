import express from "express";
import {
  ListarUsuarios,
  ObterUsuarios,
  CriarUsuario,
  AtualizarUsuarios,
  DeletarUsuarios
} from "../controllers/usuarios.controllers.js";

const router = express.Router();


router.get("/", ListarUsuarios);
router.get("/:id", ObterUsuarios);
router.post("/", CriarUsuario);
router.put("/:id",AtualizarUsuarios);
router.delete("/:id", DeletarUsuarios);

export default router;