import {db} from "../config/db.js";

export async function getCategoria(req, res) {
    const id = req.params.id;

    const sql = "SELECT * FROM categoria WHERE id = ?";
    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
        return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.json(rows[0]);
}


export const getLivrosPorCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT l.*, GROUP_CONCAT(c.categoria SEPARATOR ', ') AS categoria,
      l.titulo as titulo_livro,
      l.caminho_capa,
 	    l.ativo AS disponibilidade
      FROM livros l
      JOIN livros_categorias lc ON l.id = lc.livro_id
      JOIN categoria c ON c.id = lc.categoria_id  
      WHERE lc.categoria_id = ?
      GROUP BY l.id
      ORDER BY l.id DESC;
      `,
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar livros por categoria", detalhe: error.message });
  }
};

export async function getTodasCategorias(req, res) {
  try {
    const [rows] = await db.query(
      "SELECT id, categoria FROM categoria ORDER BY categoria"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar categorias",
      detalhe: error.message
    });
  }
}
