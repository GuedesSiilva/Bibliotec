import { db } from "../config/db.js";
// ============================
//  Rotas CRUD
// ============================

function toNull(value) {
    return value === undefined ? null : value;
}

export async function PostarLivros(req, res) {
    try {
        const {
            titulo,
            autor,
            categoria,
            editora,
            ano_publicacao,
            isbn,
            idioma,
            formato,
            caminho_capa,
            sinopse,
            ativo
        } = req.body;

<<<<<<< HEAD
        if (!titulo || !autor || !categoria)
            return res.status(400).json({ erro: "Campos obrigatórios" });
=======
    const {
      titulo,
      autor,
      categoria,
      editora,
      ano_publicacao,
      isbn,
      idioma,
      formato,
      sinopse,
      ativo
    } = req.body;


>>>>>>> 7ba5edc016679249e3123e2ca0307f7e787e7985

        await db.execute(
            `INSERT INTO livros 
                (titulo, autor, categoria, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse, ativo)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                titulo,
                autor,
                categoria,
                toNull(editora),
                toNull(ano_publicacao),
                toNull(isbn),
                toNull(idioma),
                toNull(formato),
                toNull(caminho_capa),
                toNull(sinopse),
                toNull(ativo)
            ]
        );
    const anoPublicacaoFinal =
      ano_publicacao === "" ? null : ano_publicacao;

    const caminhoCapa = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    await db.query(
      `INSERT INTO livros 
      (titulo, autor, categoria, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse, ativo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        autor,
        categoria,
        editora,
        anoPublicacaoFinal,
        isbn,
        idioma,
        formato,
        caminhoCapa,
        sinopse,
        ativo
      ]
    );

    res.status(201).json({ msg: "Livro cadastrado com sucesso" });

  } catch (error) {
    console.error("❌ ERRO AO INSERIR:", error);
    res.status(500).json({ erro: error.message });
  }
}

export async function ListarLivros(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM livros");

        function formatarDataBR(date) {
            const d = new Date(date);
            const dia = String(d.getDate()).padStart(2, "0");
            const mes = String(d.getMonth() + 1).padStart(2, "0");
            const ano = d.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }


        const livrosFormatados = rows.map(r => ({
            ...r,
            criado_em: formatarDataBR(r.criado_em),
            atualizado_em: formatarDataBR(r.atualizado_em),
        }));

        return res.status(200).json(livrosFormatados);

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function ObterLivros(req, res) {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM livros WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0)
            return res.status(404).json({ erro: "Livro não encontrado" });

        const formatarDataBR = date => {
            const d = new Date(date);
            return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")
                }/${d.getFullYear()}`;
        };

        const resultado = rows.map(r => ({
            ...r,
            criado_em: formatarDataBR(r.criado_em),
            atualizado_em: formatarDataBR(r.atualizado_em)
        }));

        res.status(200).json(resultado[0]);

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function AtualizarLivros(req, res) {
    try {
        const id = req.params.id;
        const {
            titulo,
            autor,
            categoria,
            editora,
            ano_publicacao,
            isbn,
            idioma,
            formato,
            caminho_capa,
            sinopse,
        } = req.body;

        if (!titulo || !autor || !categoria)
            return res.status(400).json({ erro: "Campos obrigatórios" });

        await db.execute(
            `UPDATE livros SET 
                    titulo = ?, 
                    autor = ?, 
                    categoria = ?, 
                    editora = ?, 
                    ano_publicacao = ?, 
                    isbn = ?, 
                    idioma = ?, 
                    formato = ?, 
                    caminho_capa = ?, 
                    sinopse = ?
                WHERE id = ?`,
            [
                titulo,
                autor,
                categoria,
                toNull(editora),
                toNull(ano_publicacao),
                toNull(isbn),
                toNull(idioma),
                toNull(formato),
                toNull(caminho_capa),
                toNull(sinopse),
                id
            ]
        );

        res.json({ mensagem: "Livro atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function DeletarLivros(req, res) {
    try {
        await db.execute("DELETE FROM livros WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Livro deletado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
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
};

export async function ListarLivrosIds(req, res) {
    try {
        const [rows] = await db.execute(
            "SELECT id, titulo FROM livros"
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
