
fetch('Header.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
      });
    } else {
      console.warn('menu-btn ou mobile-menu não encontrado no header inserido.');
    }

  })
  .catch(err => console.error('Erro ao carregar Header.html:', err));
