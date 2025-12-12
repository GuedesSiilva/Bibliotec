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
            genero,
            editora,
            ano_publicacao,
            isbn,
            idioma,
            formato,
            caminho_capa,
            sinopse,
            ativo
        } = req.body;

        if (!titulo || !autor || !genero)
            return res.status(400).json({ erro: "Campos obrigatórios" });

        await db.execute(
            `INSERT INTO livros 
            (titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse, ativo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                titulo,
                autor,
                genero,
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

        res.json({ mensagem: "Livro postado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
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

        res.status(200).json(resultado);

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
            genero,
            editora,
            ano_publicacao,
            isbn,
            idioma,
            formato,
            caminho_capa,
            sinopse,
            ativo
        } = req.body;

        if (!titulo || !autor || !genero)
            return res.status(400).json({ erro: "Campos obrigatórios" });

        await db.execute(
            `UPDATE livros SET 
                titulo = ?, 
                autor = ?, 
                genero = ?, 
                editora = ?, 
                ano_publicacao = ?, 
                isbn = ?, 
                idioma = ?, 
                formato = ?, 
                caminho_capa = ?, 
                sinopse = ?, 
                ativo = ?
             WHERE id = ?`,
            [
                titulo,
                autor,
                genero,
                toNull(editora),
                toNull(ano_publicacao),
                toNull(isbn),
                toNull(idioma),
                toNull(formato),
                toNull(caminho_capa),
                toNull(sinopse),
                toNull(ativo),
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
