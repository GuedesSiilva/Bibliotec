import { db } from "../config/db.js";

// ============================
// LISTAR RESERVAS
// ============================

export const listarReservas = async (req, res) => {
  try {
    const sql = `
      SELECT 
        u.id AS id_usuario,
        u.nome AS nome_usuario,
        l.id AS id_livro,
        l.titulo AS titulo_livro,
        l.autor AS autor_livro,
        r.data_retirada,
        r.data_devolucao
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN livros l ON r.livro_id = l.id
      ORDER BY r.data_retirada DESC;
    `;

    const [rows] = await db.query(sql);


    function formatarDataBR(date) {
      const d = new Date(date);
      const dia = String(d.getDate()).padStart(2, "0");
      const mes = String(d.getMonth() + 1).padStart(2, "0");
      const ano = d.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }


    const reservasFormatadas = rows.map(r => ({
      ...r,
      data_retirada: formatarDataBR(r.data_retirada),
      data_devolucao: formatarDataBR(r.data_devolucao),
    }));

    return res.status(200).json(reservasFormatadas);

  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    return res.status(500).json({ message: "Erro ao buscar as reservas" });
  }
};

// ============================
// CRIAR RESERVA
// ============================

export const criarReserva = async (req, res) => {
  try {
    const { usuario_id, livro_id, data_devolucao } = req.body;

    // validação simples
    if (!usuario_id || !livro_id || !data_devolucao) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos: usuario_id, livro_id e data de devolução" });
    }

    const data_retirada = new Date();
    const dataDev = new Date(data_devolucao);

    // Verificação de data
    if (dataDev <= data_retirada) {
      return res
        .status(400)
        .json({ message: "A data de devolução deve ser posterior à data de retirada." });
    }

    const [livroRows] = await db.query(
      `SELECT ativo FROM livros WHERE id = ?`,
      [livro_id]
    );

    if (livroRows.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    if (livroRows[0].ativo === 0) {
      return res.status(400).json({
        message: "Este livro já está reservado ou indisponível no momento."
      });
    }

    await db.query(
      `INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, livro_id, data_retirada, data_devolucao]
    );

    await db.query(
      `UPDATE livros SET ativo = 0 WHERE id = ?`,
      [livro_id]
    );

    return res.status(201).json({ message: "Reserva efetuada com sucesso!" });

  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return res.status(500).json({ message: "Erro ao criar reserva" });
  }
};




// ============================
// EXCLUIR RESERVA
// ============================

export async function DeletarReservas(req, res) {
  try {
    const reservaId = req.params.id;

    const [rows] = await db.query(
      "SELECT livro_id FROM reservas WHERE id = ?",
      [reservaId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Reserva não encontrada." });
    }

    const livro_id = rows[0].livro_id;

    await db.execute("DELETE FROM reservas WHERE id = ?", [reservaId]);

    await db.query(
      `UPDATE livros SET ativo = 1 WHERE id = ?`,
      [livro_id]
    );

    return res.json({ mensagem: "Reserva deletada e livro reativado com sucesso!" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: err.message });
  }
};


export async function ListarReservasDeLivrosID(req, res) {
  try {
    const { id } = req.params;

    const sql = `
      SELECT 
        u.id AS id_usuario,
        u.nome AS nome_usuario,
        l.id AS id_livro,
        l.titulo AS titulo_livro,
        l.autor AS autor_livro,
        l.caminho_capa AS caminho_capa,
        r.data_devolucao
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN livros l ON r.livro_id = l.id
      WHERE u.id = ?;
    `;

    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(200).json([]);
    }

    function formatarDataBR(dataISO) {
      const d = new Date(dataISO);
      const dia = String(d.getDate()).padStart(2, "0");
      const mes = String(d.getMonth() + 1).padStart(2, "0");
      const ano = d.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }

    const formatado = rows.map(r => ({
      ...r,
      data_devolucao: formatarDataBR(r.data_devolucao),
    }));

    return res.status(200).json(formatado);

  } catch (error) {
    console.error("Erro ao obter reserva:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
};