const API_URL = "http://localhost:3000";
const id_usuario = 4; 

async function carregarReservas() {
  const statusGrid = document.getElementById("livrosPorCategoria");
  statusGrid.innerHTML = "";

const resp = await fetch(`${API_URL}/livros`);
const lista = await resp.json();

lista.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("book-card");

  card.innerHTML = `
    <img src="${item.caminho_capa}" alt="${item.titulo_livro}">
    <h3>${item.titulo_livro}</h3>
  `;

  statusGrid.appendChild(card);
})};
0 
carregarReservas();

async function carregarTituloCategoria() {
    const titulo = document.getElementById("tituloCategoria");

    const resp = await fetch(`http://localhost:3000/categorias/${idCategoria}`);
    const dados = await resp.json();

    titulo.textContent = `Categoria: ${dados.nome}`;
}

carregarTituloCategoria();
