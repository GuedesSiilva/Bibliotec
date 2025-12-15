// editlivros.js
const params = new URLSearchParams(window.location.search);
const idLivro = params.get("id");
let livroSelecionadoId = null;

console.log("ID do livro para editar:", idLivro);

const API = "http://localhost:3000/livros";

async function carregarLivrosDisponiveis() {
  try {
    const res = await fetch(`${API}`);
    const livros = await res.json();
    console.log("Livros recebidos:", livros);

    const select = document.getElementById("select-livro");
    select.innerHTML = `<option value="">Selecione um livro</option>`;

    livros.forEach(livro => {
      const option = document.createElement("option");
      option.value = livro.id;
      option.textContent = `${livro.id} - ${livro.titulo}`;
      select.appendChild(option);
    });

    if (idLivro) {
      select.value = idLivro;
      carregarLivro(idLivro);
    }
  } catch (err) {
    console.error("Erro ao carregar lista de livros:", err);
  }
}

async function carregarLivro(id) {
  try {
    const resposta = await fetch(`${API}/${id}`);
    if (!resposta.ok) throw new Error("Livro não encontrado");
    const livro = await resposta.json();

    livroSelecionadoId = id;

    document.getElementById("titulo").value = livro.titulo ?? "";
    document.getElementById("autor").value = livro.autor ?? "";
    document.getElementById("categoria").value = livro.categoria ?? "";
    document.getElementById("editora").value = livro.editora ?? "";
    document.getElementById("ano_publicacao").value = livro.ano_publicacao ?? "";
    document.getElementById("isbn").value = livro.isbn ?? "";
    document.getElementById("idioma").value = livro.idioma ?? "";
    document.getElementById("formato").value = livro.formato ?? "";
    document.getElementById("caminho_capa").value = livro.caminho_capa ?? "";
    document.getElementById("sinopse").value = livro.sinopse ?? "";

  } catch (error) {
    console.error("Erro ao carregar livro:", error);
    alert("Erro ao carregar livro. Veja console.");
  }
}

document.getElementById("select-livro").addEventListener("change", (e) => {
  if (!e.target.value) return;
  carregarLivro(e.target.value);
});

document.getElementById("form-atualizar").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!livroSelecionadoId) {
    alert("Selecione um livro primeiro");
    return;
  }

  const livroAtualizado = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    categoria: document.getElementById("categoria").value,
    editora: document.getElementById("editora").value,
    ano_publicacao: document.getElementById("ano_publicacao").value,
    isbn: document.getElementById("isbn").value
      ? parseInt(document.getElementById("isbn").value)
      : null,
    idioma: document.getElementById("idioma").value,
    formato: document.getElementById("formato").value,
    caminho_capa: document.getElementById("caminho_capa").value,
    sinopse: document.getElementById("sinopse").value
  };

  try {
    const resposta = await fetch(`${API}/${livroSelecionadoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livroAtualizado)
    });

    if (resposta.ok) {
      alert("Livro atualizado com sucesso!");
      window.location.href = "../FrontDoADM/listarLivros.html";
    } else {
      const texto = await resposta.text();
      console.error("Erro no PUT:", resposta.status, texto);
      alert("Erro ao atualizar livro. Veja console.");
    }
  } catch (err) {
    console.error("Erro na requisição PUT:", err);
    alert("Erro ao atualizar livro. Veja console.");
  }
});

// inicia
carregarLivrosDisponiveis();
