import { db } from "../config/db.js";
// ============================
//  Rotas CRUD
// ============================

export async function CriarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );

    res.json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function ListarUsuarios(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function ObterUsuarios(req, res){
 try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar usuário" });
  }
}



export async function AtualizarUsuarios(req, res) {
  let { nome, email, senha, data_nascimento, perfil } = req.body;

  // Corrige data para formato YYYY-MM-DD, caso venha no formato ISO
  if (data_nascimento) {
    // Remove hora e timezone
    data_nascimento = data_nascimento.split("T")[0];
  }

  const query = `
    UPDATE usuarios 
    SET nome = ?, email = ?, senha = ?, data_nascimento = ?, perfil = ?
    WHERE id = ?
  `;

  const params = [nome, email, senha, data_nascimento, perfil, req.params.id];

  console.log("QUERY FINAL:", query);
  console.log("PARAMS:", params);

  try {
    const [result] = await db.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    console.error("ERRO MYSQL:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function DeletarUsuarios(req, res) {
  try {
    await db.execute("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};