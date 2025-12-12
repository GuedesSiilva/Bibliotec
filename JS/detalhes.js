const API_URL = "http://localhost:3000";

async function carregarDetalhesLivro(livroId) {
    try {
        console.log("Carregando livro id =", livroId);

        const response = await fetch(`${API_URL}/livros/${livroId}`);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        // tenta parsear JSON
        const data = await response.json();
        console.log("Resposta da API (raw):", data);

        // Caso a API retorne um array, pega o primeiro; se retornar objeto, usa ele.
        const livro = Array.isArray(data) ? data[0] : data;

        if (!livro) {
            throw new Error("Livro não encontrado na resposta da API.");
        }

        // renderiza
        renderizarDetalhesLivro(livro);

    } catch (error) {
        console.error("Erro ao carregar livro:", error);
        // tenta achar um container conhecido na página para mostrar a mensagem
        const container = document.getElementById("conteudoLivro") || document.getElementById("detalhes");
        if (container) {
            container.innerHTML = `<p style="color: red;">❌ Erro ao carregar detalhes: ${error.message}</p>`;
        }
    }
}

function renderizarDetalhesLivro(livro) {
    // pega container já existente (sua section id="detalhes") ou fallback
    const container = document.getElementById("detalhes") || document.getElementById("conteudoLivro");
    if (!container) {
        console.warn("Nenhum container encontrado: adicione <div id='conteudoLivro'></div> ou use id='detalhes' na section.");
        return;
    }

    container.innerHTML = `
        <div class="detalhes_head">
            <h1>Detalhes do Livro</h1>
            <button class="btn" id="voltar_inicio">Voltar</button>
        </div>
        
        <div class="detalhes_conteudo">
            <div class="detalhes_Cobrir" id="CobrirDetalhes">
                <img src="${livro.caminho_capa || '../IMGS/trabalho em andamento.jpg'}" 
                     alt="Capa: ${livro.titulo || 'Sem título'}" 
                     class="book-cover-img">
            </div>
            
            <div class="meta">
                <h2 id="detalhes_Titulo">${livro.titulo || 'Título indisponível'}</h2>
                <p class="autor" id="detalhes_Autor">Autor: ${livro.autor || 'Desconhecido'}</p>
                <p class="publicacao">Publicação: ${livro.ano_publicacao || 'N/A'}</p>
                <p class="detalhes_sinopse">Sinopse: ${livro.sinopse || 'Sem sinopse disponível'}</p>
                <p class="ativo">Disponibilidade: ${livro.ativo === 1 || livro.ativo === true ? '✅ Disponível' : '❌ Indisponível'}</p>
                
                <div class="botoes-acao">
                    <button class="btn-favoritar" id="favoritarBTN">
                        <span class="material-symbols-outlined">favorite</span>
                    </button>
                    <button class="btn-reserva" id="reservarBTN">Reservar Livro</button>
                </div>
            </div>
        </div>
        
        <div class="info-tecnica">
            <h3>Informações Técnicas</h3>
            <hr class="linha">
            
            <div class="info-item">
                <span class="info-titulo">Categorias:</span>
                <span class="tag">${livro.categoria || 'N/A'}</span>
            </div>
            
            <div class="info-item">
                <span class="info-titulo">Idioma:</span>
                <span class="tag">${livro.idioma || 'N/A'}</span>
            </div>
            
            <div class="info-item">
                <span class="info-titulo">Formato:</span>
                <span class="tag">${livro.formato || 'N/A'}</span>
            </div>
            
            <div class="info-item">
                <span class="info-titulo">Editora:</span>
                <span class="tag">${livro.editora || 'N/A'}</span>
            </div>
            
            <div class="info-item">
                <span class="info-titulo">ISBN:</span>
                <span class="tag">${livro.isbn || 'N/A'}</span>
            </div>
        </div>
    `;

    adicionarEventos();
}


function adicionarEventos() {
    const btnVoltar = document.getElementById("voltar_inicio");
    const btnFavoritar = document.getElementById("favoritarBTN");
    const btnReservar = document.getElementById("reservarBTN");
    
    if (btnVoltar) {
        btnVoltar.addEventListener("click", () => {
            window.history.back();
        });
    }
    
    if (btnFavoritar) {
        btnFavoritar.addEventListener("click", function() {
            this.classList.toggle("active");
        });
    }
    
    if (btnReservar) {
        btnReservar.addEventListener("click", () => {
            alert("Livro reservado com sucesso! ✅");
        });
    }
}

const urlParams = new URLSearchParams(window.location.search);
const livroId = urlParams.get("id") || 1;

// carrega quando a página estiver pronta
document.addEventListener("DOMContentLoaded", () => {
    carregarDetalhesLivro(livroId);
});

window.irParaDetalhes = function(id) {
  if (!id) return console.warn("irParaDetalhes: id vazio");
  window.location.href = `detalhes.html?id=${id}`;
};