// fallback — garante que a função exista mesmo sem detalhes.js
if (typeof window.irParaDetalhes !== "function") {
  window.irParaDetalhes = function(id) {
    if (!id) return;
    window.location.href = `detalhes.html?id=${id}`;
  };
}

const API_URL = "http://localhost:3000";

const urlParams = new URLSearchParams(window.location.search);
const categoria_id = urlParams.get("id");

async function carregarReservas() {
  const statusGrid = document.getElementById("livrosPorCategoria");
  statusGrid.innerHTML = "";

const resp = await fetch(`${API_URL}/categorias/${categoria_id}/livros`);
const lista = await resp.json();

  lista.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
    <img src="${item.caminho_capa}" alt="${item.titulo}">
    <h3>${item.titulo}</h3>
    <p class="tag">${item.disponibilidade === 1 || item.disponibilidade === true ? '✅ Disponível' : '❌ Indisponível'}</p>
  `;

   card.addEventListener("click", () => window.irParaDetalhes(item.id));
   
    statusGrid.appendChild(card);
  })
};

carregarReservas();

async function carregarTituloCategoria() {
  const titulo = document.getElementById("tituloCategoria");

  const resp = await fetch(`${API_URL}/categorias/${categoria_id}`);
  const dados = await resp.json();

  if (dados && dados.categoria) {
    titulo.textContent = `Livros de ${dados.categoria}`;
  } else {
    titulo.textContent = "Categoria não encontrada";
  }
}

function adicionarEventos() {
  const btnVoltar = document.getElementById("voltar_inicio");

  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
      window.history.back();
    });
  }
}

adicionarEventos();
carregarTituloCategoria();
