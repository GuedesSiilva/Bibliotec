const livros = [
  {
    img: "../IMGS/diario-banana.jpg",
    titulo: "Diário de um Banana",
    autor: "Jeff Kinney",
  },
  {
    img: "../IMGS/harry-potter.jpg",
    titulo: "Harry Potter e a Ordem da Fênix",
    autor: "J.K. Rowling",
  },
  {
    img: "../IMGS/mestresdotempo.jpg",
    titulo: "Mestres do Tempo",
    autor: "Jair Bolsonaro",
  },
  {
    img: "../IMGS/domcasmurro.jpg",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
  }
];

const grid = document.getElementById("booksGrid");

livros.forEach(livro => {
  const card = document.createElement("div");
  card.classList.add("book-card");

card.innerHTML = `
    <img src="${livro.img}" alt="${livro.titulo}">
    <h3>${livro.titulo}</h3>
    <p>${livro.autor}</p>

    <button class="favorite-btn">
        <span class="material-symbols-outlined">favorite_border</span>
    </button>
`;


  grid.appendChild(card);
});

// comportamento do coração
document.addEventListener("click", (e) => {
  if (e.target.closest(".favorite-btn")) {
    const icon = e.target.closest(".favorite-btn").querySelector("span");

    // alterna entre filled e outline
    icon.textContent =
      icon.textContent === "favorite" ? "favorite_border" : "favorite";
  }
});


const livrosStatus = [
  {
    img: "../IMGS/diario-banana.jpg",
    titulo: "Diário de um Banana",
    autor: "Jeff Kinney",
    tag: "RESERVADO"
  },
  {
    img: "../IMGS/harry-potter.jpg",
    titulo: "Harry Potter e a Ordem da Fênix",
    autor: "J.K. Rowling",
    tag: "DEVOLVIDO"
  },
  {
    img: "../IMGS/turma-monica.jpg",
    titulo: "Turma da Mônica",
    autor: "Mauricio de Souza",
    tag: "DEVOLVIDO"
  },
  {
    img: "../IMGS/filhasdalua.jpg",
    titulo: "Filhas da Lua",
    autor: "Carolina França",
    tag: "DEVOLVIDO"
  }
];

const statusGrid = document.getElementById("booksStatusGrid");

livrosStatus.forEach(livro => {
  const card = document.createElement("div");
  card.classList.add("book-card");

  card.innerHTML = `
        <img src="${livro.img}" alt="${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p>${livro.autor}</p>
        <span class="tag">${livro.tag}</span>
    `;

  statusGrid.appendChild(card);
});

