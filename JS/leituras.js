// fallback — garante que a função exista mesmo sem detalhes.js
if (typeof window.irParaDetalhes !== "function") {
  window.irParaDetalhes = function (id) {
    if (!id) return;
    window.location.href = `detalhes.html?id=${id}`;
  };
}

const API_URL = "http://localhost:3000";
const id_usuario = localStorage.getItem("userId");


async function carregarReservas() {
  const statusGrid = document.getElementById("booksStatusGrid");
  statusGrid.innerHTML = "";

  const resp = await fetch(`${API_URL}/reservas/${id_usuario}`);
  const lista = await resp.json();

   if (!lista || lista.length === 0) {
    statusGrid.innerHTML = `
      <div class="empty-box">
        Você ainda não possui nenhuma reserva efetuada.
      </div>
    `;
    return;
  }

  lista.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
    <img src="${item.caminho_capa}" alt="${item.titulo_livro}">
    <h3>${item.titulo_livro}</h3>
    <p class="tag">Devolução: ${item.data_devolucao}</p>
  `;

    card.addEventListener("click", () => window.irParaDetalhes(item.id_livro));

    statusGrid.appendChild(card);
  })
};

async function carregarFavoritos() {
  const grid = document.getElementById("booksGrid");
  grid.innerHTML = "";

  const resp = await fetch(`${API_URL}/favoritos/${id_usuario}`);
  const lista = await resp.json();

  if (!lista || lista.length === 0) {
    grid.innerHTML = `
      <div class="empty-box">
        Você ainda não possui nenhum livro favoritado.
      </div>
    `;
    return;
  }

  lista.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${item.caminho_capa}" alt="${item.titulo_livro}">
      <h3>${item.titulo_livro}</h3>
      <p class="tag">Autor: ${item.autor}</p>

      <button class="favorite-btn">
        <span class="material-symbols-outlined">favorite</span>
      </button>
    `;

    // Clique no card abre detalhes
    card.addEventListener("click", () => window.irParaDetalhes(item.livro_id));

    // Clique no botão de favorito
    const favBtn = card.querySelector(".favorite-btn");
    favBtn.addEventListener("click", async (e) => {
      e.stopPropagation(); // evita abrir detalhes
      try {
        // Remove dos favoritos via API
        await fetch(`${API_URL}/favoritos/${id_usuario}/${item.livro_id}`, {
          method: "DELETE"
        });
        // Remove o card do DOM
        card.remove();
      } catch (err) {
        console.error("Erro ao remover favorito:", err);
        alert("Não foi possível remover o favorito.");
      }
    });

    grid.appendChild(card);
  });
}


carregarReservas();
carregarFavoritos();



// comportamento do coração
document.addEventListener("click", (e) => {
  if (e.target.closest(".favorite-btn")) {
    const icon = e.target.closest(".favorite-btn").querySelector("span");

    // alterna entre filled e outline
    icon.textContent =
      icon.textContent === "favorite" ? "favorite_border" : "favorite";
  }
});

function adicionarEventos() {
  const btnVoltar = document.getElementById("voltar_inicio");

  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
      window.history.back();
    });
  }
}

adicionarEventos();