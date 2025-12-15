import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";
import livrosRoutes from "./routes/livros.routes.js";
import avaliacoesRoutes from "./routes/avaliacoes.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";
import categoriaRoutes from "./routes/categorias.routes.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("API da Livraria funcionando!");
});

app.use("/uploads", express.static("uploads"));
app.use("/usuarios", usuarioRoutes);
app.use("/livros", livrosRoutes);
app.use("/avaliacao", avaliacoesRoutes);
app.use("/reservas", reservasRoutes);
app.use("/favoritos", favoritosRoutes);
app.use("/categorias", categoriaRoutes);

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT,() => console.log(`🚀 Servidor rodando na porta ${PORT}`));
