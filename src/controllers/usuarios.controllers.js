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
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function AtualizarUsuarios(req, res) {
  const { nome, email, senha, foto } = req.body; 

  let query = "UPDATE usuarios SET nome=?, email=?, senha=?";
  const params = [nome, email, senha];

  if (foto) {
      query += ", foto=?";
      params.push(foto);
  }

  query += " WHERE id=?";
  params.push(req.params.id);

  // ADICIONE ESTE LOG DE VERIFICAÇÃO:
  console.log("QUERY SQL MONTADA:", query);
  console.log("PARÂMETROS (sem foto Base64):", params.slice(0, 4)); // Loga apenas os primeiros para não poluir o console

  try {
      const [result] = await db.execute(query, params);
      
      // VERIFIQUE SE ALGUMA LINHA FOI REALMENTE AFETADA:
      if (result.affectedRows === 0) {
           console.warn("ATENÇÃO: Nenhuma linha afetada! O ID do usuário pode estar incorreto, ou a foto não está sendo salva.");
           return res.status(404).json({ erro: "Usuário não encontrado ou dados não alterados." });
      }
      
      res.json({ mensagem: "Atualizado com sucesso!" });
  } catch (err) {
      // Loga o erro específico do MySQL, caso ele falhe.
      console.error("ERRO DO MYSQL:", err.message);
      res.status(500).json({ erro: "Erro de servidor. Verifique o log do MySQL." });
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
