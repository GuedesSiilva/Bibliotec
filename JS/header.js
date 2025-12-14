fetch('../FrontEnd/Header.html')
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

    // Adiciona listener para a barra de pesquisa do header (redireciona para a página de resultados)
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return; // não pesquisa se vazio

        // Redireciona para a página de resultados --- crie FrontEnd/resultados.html
        window.location.href = `../FrontEnd/resultados.html?q=${encodeURIComponent(query)}`;
      });
    } else {
      console.warn('search-form ou search-input não encontrado no header inserido.');
    }

  })
  .catch(err => console.error('Erro ao carregar Header.html:', err));
