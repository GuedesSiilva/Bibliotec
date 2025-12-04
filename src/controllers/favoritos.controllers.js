import { db } from "../config/db.js";

// ============================
// LISTAR FAVORITOS
// ============================
export const listarFavoritos = async (req, res) => {
  try {
    const sql = `
    SELECT 
    u.id AS usuario_id,
    u.nome AS nome_usuario,
    l.id AS livro_id,
    l.titulo AS titulo_livro
    FROM favoritos f
    JOIN usuarios u ON f.usuario_id = u.id
    JOIN livros l ON f.livro_id = l.id
    ORDER BY u.id, l.titulo;
    `;

    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar favoritos:", error);
    res.status(500).json({ message: "Erro ao buscar os favoritos" });
  }
};

// ============================
// FAVORITAR LIVRO
// ============================

export const Favoritar = async (req, res) => {
  try {
    const { usuario_id, livro_id } = req.body;

    if (!usuario_id || !livro_id) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos: usuario_id e livro_id" });
    }

    const checkSql = `
      SELECT id FROM favoritos
      WHERE usuario_id = ? AND livro_id = ?
    `;
    const [exists] = await db.query(checkSql, [usuario_id, livro_id]);

    if (exists.length > 0) {
      return res.status(409).json({ message: "Livro já está favoritado por este usuário" });
    }

    const sql = `
      INSERT INTO favoritos (usuario_id, livro_id)
      VALUES (?, ?)
    `;
    await db.query(sql, [usuario_id, livro_id]);

    res.status(201).json({ message: "Livro favoritado com sucesso!" });
  } catch (error) {
    console.error("Erro ao favoritar:", error);
    res.status(500).json({ message: "Erro ao favoritar o livro" });
  }
};


// ============================
// EXCLUIR FAVORITOS
// ============================

export async function DeletarFavoritos(req, res) {
    const idUsuario = req.usuario.id; 
    const idFavorito = req.params.id;

    try {

        const [result] = await db.execute(
            "DELETE FROM favoritos WHERE id = ? AND id_usuario = ?", 
            [idFavorito, idUsuario]
        );


        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                erro: "Livro favorito não encontrado ou você não tem permissão para deletá-lo." 
            });
        }

        res.status(204).send();
        
    } catch (err) {
        res.status(500).json({ erro: "Erro interno do servidor ao tentar deletar o favorito.", detalhes: err.message });
    }
};