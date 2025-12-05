function iniciarCategoriasGrid() {
  const grid = document.querySelector(".categorias-grid");
  if (!grid) return;

  grid.innerHTML = categorias.map(item => `
    <a href="categoria.html?id=${item.id}" class="item">
      <img src="${item.img}" alt="${item.nome}">
      <p>${item.nome}</p>
    </a>
  `).join("");
}

iniciarCategoriasGrid();