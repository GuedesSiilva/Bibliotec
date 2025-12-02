// Mostra o texto do `alt` como tooltip (`title`) quando o usuário passa o mouse
document.querySelectorAll('.carrossel .item img').forEach(img => {
  if (!img.title && img.alt) img.title = img.alt;
});

document.querySelectorAll('.carrossel-container').forEach(container => {
  const carrossel = container.querySelector('.carrossel');
  const items = Array.from(carrossel.querySelectorAll('.item'));
  const btnPrev = container.querySelector('.prev');
  const btnNext = container.querySelector('.next');

  let index = 0;

  function itensPorView() {
    return window.innerWidth <= 768 ? 2 : 4;
  }

  function gapSize() {
    const style = getComputedStyle(carrossel);
    return parseFloat(style.gap) || 0;
  }

  function atualizar() {
    if (!items.length) return;
    const perView = itensPorView();
    const gap = gapSize();
    const itemRect = items[0].getBoundingClientRect();
    const itemWidth = itemRect.width;
    const desloc = (itemWidth + gap) * index;
    carrossel.style.transform = `translateX(${ -desloc }px)`;

    if (btnPrev) btnPrev.disabled = index <= 0;
    if (btnNext) btnNext.disabled = index >= items.length - perView;
  }

  if (btnPrev) btnPrev.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    atualizar();
  });

  if (btnNext) btnNext.addEventListener('click', () => {
    const perView = itensPorView();
    index = Math.min(items.length - perView, index + 1);
    atualizar();
  });

  window.addEventListener('resize', () => {
    const perView = itensPorView();
    index = Math.min(index, Math.max(0, items.length - perView));
    atualizar();
  });

  atualizar();
});