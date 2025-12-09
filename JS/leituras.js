const API_URL = "http://localhost:3000";
const id_usuario = 4; 

async function carregarReservas() {
  const statusGrid = document.getElementById("booksStatusGrid");
  statusGrid.innerHTML = "";

 const resp = await fetch(`${API_URL}/reservas/${id_usuario}`);
const lista = await resp.json();

lista.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("book-card");

  card.innerHTML = `
    <img src="${item.caminho_capa}" alt="${item.titulo_livro}">
    <h3>${item.titulo_livro}</h3>
    <p class="tag">Devolução: ${item.data_devolucao}</p>
  `;

  statusGrid.appendChild(card);
})};

async function carregarFavoritos() {
  const grid = document.getElementById("booksGrid");
  grid.innerHTML = "";

  const resp = await fetch(`${API_URL}/favoritos`);
  const dados = await resp.json();

  dados.forEach(livro => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${livro.img}" alt="${livro.titulo}">
      <h3>${livro.titulo}</h3>
      <p>${livro.autor}</p>

      <button class="favorite-btn">
        <span class="material-symbols-outlined">favorite</span>
      </button>
    `;

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