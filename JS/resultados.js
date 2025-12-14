import { carregarLivros, livros } from "./dados.js";

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const q = (params.get('q') || '').trim();
  const tituloEl = document.getElementById('resultados-titulo');
  const mensagemEl = document.getElementById('resultados-mensagem');
  const gridEl = document.getElementById('resultados-grid');

  if (!q) {
    window.location.href = '../FrontEnd/telainicial.html';
    return;
  }

  if (tituloEl) tituloEl.textContent = `Resultados para "${q}"`;
  if (mensagemEl) mensagemEl.textContent = 'Carregando...';

  try {
    await carregarLivros(); // preenche a variável `livros`
    console.log('livros carregados:', Array.isArray(livros) ? livros.length : typeof livros, livros[0]);

    const qLower = q.toLowerCase();

    const resultados = (Array.isArray(livros) ? livros : []).filter(l => {
      const candidates = [
        l.titulo, l.nome,
        l.autor, 
        l.genero, 
        l.sinopse, 
        l.editora,
      ].filter(Boolean).map(v => String(v).toLowerCase());

      return candidates.join(' ').includes(qLower);
    });

    if (!resultados.length) {
      if (mensagemEl) mensagemEl.innerHTML = `<p>Nenhum resultado encontrado para "${q}".</p>`;
      if (gridEl) gridEl.innerHTML = '';
      return;
    }

    if (mensagemEl) mensagemEl.innerHTML = `<p>${resultados.length} resultado(s) para "${q}"</p>`;

if (gridEl) {
      gridEl.innerHTML = resultados.map(item => {
        const title = item.titulo || item.nome || item.title || 'Sem título';
        const autor = item.autor || 'Autor desconhecido';
        const capa =  item.img || '../IMGS/padrao.png';
        const id = item.id ?? '';

        return `
          <a class="card-link" href="Detalhes.html?id=${encodeURIComponent(id)}">
            <div class="livro-card">
              <img class="livro-capa" src="${capa}" alt="${title}">
              <div class="livro-info">
                <h3 class="livro-titulo">${title}</h3>
                <p class="livro-autor">${autor}</p>
              </div>
            </div>
          </a>
        `;
      }).join('');
    }
  } catch (err) {
    console.error('Erro ao carregar livros:', err);
    if (mensagemEl) mensagemEl.innerHTML = '<p>Erro ao buscar resultados. Verifique o servidor.</p>';
    if (gridEl) gridEl.innerHTML = '';
  }
});