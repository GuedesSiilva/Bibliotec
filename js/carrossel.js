// =====================================================
// carrossel.js
// - Preenche os 2 carrosséis (livros + categorias) a partir de arrays
// - Inicializa carrosséis por container (cíclico, sem ++/--)
// =====================================================

/* -------------------------
   DADOS (edite conforme quiser)
   ------------------------- */
const livros = [
  { id: 1, img: "images/capas/codigolimpo.jpg", nome: "Código Limpo" },
  { id: 2, img: "images/capas/domcasmurro.jpg", nome: "Dom Casmurro" },
  { id: 3, img: "images/capas/filhasdalua.jpg", nome: "Filhas da Lua" },
  { id: 4, img: "images/capas/tiparanegocios.jpg", nome: "TI para Negócios" },
  { id: 5, img: "images/capas/mestresdotempo.jpg", nome: "Mestres do Tempo" },
  { id: 6, img: "images/harryordem.jpg", nome: "Harry Potter e as Relíquias da Morte" }
];

const categorias = [
  { id: 1, img: "images/categorias/fantasia.png", nome: "Fantasia" },
  { id: 2, img: "images/categorias/ficcao.png", nome: "Ficção Científica" },
  { id: 3, img: "images/categorias/romance.png", nome: "Romance" },
  { id: 4, img: "images/categorias/tecnologia.png", nome: "Tecnologia" },
  { id: 5, img: "images/categorias/aventura.png", nome: "Aventura" }
];

/* -------------------------
   RENDER (preencher os containers)
   ------------------------- */
function renderCarrossel(selector, lista, linkBase) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = lista.map(item => `
    <a href="${linkBase}?id=${item.id}" class="item">
      <img src="${item.img}" alt="${item.nome}">
      <p>${item.nome}</p>
    </a>
  `).join('');
}

renderCarrossel('.carrossel-livros', livros, 'produto.html');
renderCarrossel('.carrossel-categorias', categorias, 'categoria.html');

/* -------------------------
   Tooltips (ALT -> TITLE)
   ------------------------- */
document.querySelectorAll('.item img').forEach(img => {
  if (!img.title && img.alt) img.title = img.alt;
});

/* -------------------------
   Inicializar cada carrossel-container
   ------------------------- */
document.querySelectorAll('.carrossel-container').forEach(container => {
  // pega o carrossel dentro desse container (livros ou categorias)
  const carrossel = container.querySelector('.carrossel-livros, .carrossel-categorias, .carrossel');
  if (!carrossel) return;

  const items = Array.from(carrossel.querySelectorAll('.item'));
  if (!items.length) return;

  const btnPrev = container.querySelector('.prev');
  const btnNext = container.querySelector('.next');

  let index = 0;

  function itensPorView() {
    return window.innerWidth <= 768 ? 2 : 4;
  }

  function gapSize() {
    const gap = getComputedStyle(carrossel).gap;
    return gap ? parseFloat(gap) : 0;
  }

  // quantos índices válidos (posições) existem -> ex: itens 6, perView 4 => 3 posições (0,1,2)
  function totalPassos() {
    return Math.max(1, items.length - itensPorView() + 1);
  }

  function atualizar() {
    const perView = itensPorView();
    const gap = gapSize();
    const itemWidth = items[0].getBoundingClientRect().width;
    const desloc = (itemWidth + gap) * index;
    carrossel.style.transform = `translateX(${-desloc}px)`;
  }

  // NEXT cíclico (sem ++)
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const total = totalPassos();
      index = (index + 1) % total;
      atualizar();
    });
  }

  // PREV cíclico (sem --)
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const total = totalPassos();
      index = (index - 1 + total) % total;
      atualizar();
    });
  }

  // mantém índice válido ao redimensionar
  window.addEventListener('resize', () => {
    const total = totalPassos();
    index = index % total;
    atualizar();
  });

  // primeira atualização
  // aguarda um frame para garantir que getBoundingClientRect() retorne valores corretos
  requestAnimationFrame(atualizar);
});