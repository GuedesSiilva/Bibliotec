import { db } from "../config/db.js";

// ============================
// LISTAR AVALIAÇÕES
// ============================
export async function listarAvaliacoes(req, res){
  try {
    const id_livro = req.params.id

    const sql = `
SELECT
    a.nota,
    a.comentario,
    DATE_FORMAT(a.data_avaliacao, '%Y-%m-%d') AS data_avaliacao
FROM avaliacoes a
WHERE a.livro_id = ?
ORDER BY data_avaliacao desc
    `;

    const [rows] = await db.query(sql , [id_livro]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar avaliação:", error);
    res.status(500).json({ message: "Erro ao buscar avaliação" });
  }
};

// ============================
// CRIAR AVALIAÇÃO
// ============================
export async function criarAvaliacao(req, res){
  try {
    const { usuario_id, livro_id, comentario, nota } = req.body;

    if (!usuario_id || !livro_id || !comentario || !nota) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos: usuario_id, livro_id, comentario e nota" });
    }

    const sql = `
      INSERT INTO avaliacoes (usuario_id, livro_id, comentario, nota)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(sql, [usuario_id, livro_id, comentario, nota]);

    res.status(201).json({ message: "Avaliação criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ message: "Erro ao criar avaliação" });
  }
};

export async function ListarAvaliacoesDeLivros(req, res) {
  try {
    const livroId = req.params.id;
    const sql = `
        SELECT
        l.id AS id_livro,
        l.titulo,
        COUNT(a.id) AS total_avaliacoes,
        COALESCE(ROUND(AVG(a.nota), 2), 0) AS media_notas
        FROM livros l
        LEFT JOIN avaliacoes a ON l.id = a.livro_id
        GROUP BY l.id, l.titulo
        ORDER BY l.titulo;
        `;
    const [rows] = await db.query(sql, [livroId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar avaliações do livro:", error);
    res.status(500).json({ message: "Erro ao buscar avaliações do livro" });
  }
}

export async function MediaAvaliacoesPorLivro(req, res) {
  try {
    const livroId = req.params.id;

    const sql = `
            SELECT
            l.id AS id_livro,
            COUNT(a.id) AS total_avaliacoes,
            COALESCE(ROUND(AVG(a.nota), 2), 0) AS media
            FROM livros l
            LEFT JOIN avaliacoes a ON l.id = a.livro_id
            WHERE l.id = ?
            GROUP BY l.id;
        `;

    const [rows] = await db.query(sql, [livroId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    res.status(200).json(rows[0]);
    // { id_livro, total_avaliacoes, media }

  } catch (error) {
    console.error("Erro ao buscar média:", error);
    res.status(500).json({ message: "Erro ao buscar média do livro" });
  }
}