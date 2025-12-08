function iniciarCarrosselLivros() {
  const container = document.querySelector(".carrossel-container-livros");
  if (!container) return;

  const carrossel = container.querySelector(".carrossel-livros");
  const btnPrev = container.querySelector(".prev-livros");
  const btnNext = container.querySelector(".next-livros");

  // Render
  carrossel.innerHTML = livros.map(item => `
    <a href="produto.html?id=${item.id}" class="item">
      <img src="${item.img}" alt="${item.nome}">
      <p>${item.nome}</p>
    </a>
  `).join("");

  const items = [...carrossel.querySelectorAll(".item")];
  let index = 0;

  function itensPorView() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    if (width <= 1280) return 4;
    return 4;
  }

  function gapSize() {
    return parseFloat(getComputedStyle(carrossel).gap || 0);
  }

  function totalPassos() {
    return Math.max(0, items.length - itensPorView() + 1);
  }

  function atualizar() {
    const perView = itensPorView();
    const gap = gapSize();
    const itemW = items[0].getBoundingClientRect().width;
    const step = itemW + gap;

    const total = totalPassos();
    index = Math.min(index, total - 1);

    const desloc = step * index;
    carrossel.style.transform = `translateX(${-desloc}px)`;

    btnPrev.disabled = total <= 1;
    btnNext.disabled = total <= 1;
  }

  btnNext.addEventListener("click", () => {
    const total = totalPassos();
    index = (index + 1) % total;
    atualizar();
  });

  btnPrev.addEventListener("click", () => {
    const total = totalPassos();
    index = (index - 1 + total) % total;
    atualizar();
  });

  window.addEventListener("resize", () => {
    index = 0;
    atualizar();
  });

  requestAnimationFrame(atualizar);
}

iniciarCarrosselLivros();