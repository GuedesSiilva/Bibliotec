const API_URL = "http://localhost:3000";
const usuarioId = Number(localStorage.getItem("userId"));

// ============================
// CARREGAR DETALHES DO LIVRO
// ============================
async function carregarDetalhesLivro(livroId) {
    try {
        console.log("Carregando livro id =", livroId);

        const response = await fetch(`${API_URL}/livros/${livroId}`);
        if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

        const data = await response.json();
        const livro = Array.isArray(data) ? data[0] : data;
        if (!livro) throw new Error("Livro não encontrado");

        const media = await carregarMediaAvaliacoes(livroId);
        renderizarDetalhesLivro(livro, media);

    } catch (error) {
        console.error("Erro ao carregar livro:", error);
        const container = document.getElementById("conteudoLivro") || document.getElementById("detalhes");
        if (container) container.innerHTML = `<p style="color: red;">❌ Erro ao carregar detalhes: ${error.message}</p>`;
    }
}

// ============================
// MÉDIA DE AVALIAÇÕES
// ============================
async function carregarMediaAvaliacoes(livroId) {
    try {
        const response = await fetch(`${API_URL}/avaliacao/medias/${livroId}`);
        if (!response.ok) throw new Error("Erro ao buscar média");

        const data = await response.json();
        return Number(data.media) || 0;

    } catch (err) {
        console.error("Erro média avaliações:", err);
        return 0;
    }
}

// ============================
// COMENTÁRIOS
// ============================
async function carregarComentarios(livroId) {
    try {
        const response = await fetch(`${API_URL}/avaliacao/${livroId}`);
        if (!response.ok) throw new Error("Erro ao buscar comentários");

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("Erro comentários:", err);
        return [];
    }
}

function renderizarComentarios(comentarios) {
    const container = document.getElementById("comentarios-container");
    if (!container) return;

    let html = `<div class="comentarios">
        <h3>Comentários</h3>
        <hr class="linha">`;

    if (!comentarios || comentarios.length === 0) {
        html += `<p class="sem-comentarios">Nenhum comentário ainda.</p>`;
    } else {
        comentarios.forEach(c => {
            html += `
            <div class="comentario">
                <div class="avatar">
                    <span class="material-symbols-outlined">person</span>
                </div>
                <div class="nome-nota">
                    <div class="comentario-nota">⭐ ${Number(c.nota).toFixed(1)}</div>
                    <span class="usuario-nome">${c.nome_usuario || 'Usuário'}</span>
                </div>
                <p class="comentario-texto">${c.comentario}</p>
                <span class="comentario-data">${c.data_avaliacao}</span>
            </div>`;
        });
    }

    html += `</div>`;
    container.innerHTML = html;
}

// ============================
// RENDER DETALHES
// ============================
async function renderizarDetalhesLivro(livro, media) {
    const container = document.getElementById("detalhes") || document.getElementById("conteudoLivro");
    if (!container) return;

    container.innerHTML = `
     <div class="detalhes_head">
        <h1>Detalhes do Livro</h1>
        <button class="btn" id="voltar_inicio">Voltar</button>
    </div>

    <div class="detalhes_conteudo">
        <div class="detalhes_Cobrir">
            <img src="${livro.caminho_capa || '../IMGS/trabalho em andamento.jpg'}" 
                 alt="Capa: ${livro.titulo || 'Sem título'}" 
                 class="book-cover-img">
        </div>

        <div class="meta">
            <h2>${livro.titulo || 'Título indisponível'}</h2>
            <p>Autor: ${livro.autor || 'Desconhecido'}</p>
            <p>Publicação: ${livro.ano_publicacao || 'N/A'}</p>
            <p>Sinopse: ${livro.sinopse || 'Sem sinopse disponível'}</p>

            <div class="detalhes_media">
                Avaliação média:
                ${media && media > 0 ? `
                    <div class="estrelas-wrapper">
                        <div class="estrelas">
                            <div class="estrelas-back">★★★★★</div>
                            <div class="estrelas-front" style="width: ${(media/5)*100}%">★★★★★</div>
                        </div>
                        <span class="nota">(${media.toFixed(1)})</span>
                    </div>` : `<span class="sem-avaliacao">Sem avaliações</span>`}
            </div>

            <p class="ativo">Disponibilidade: ${livro.ativo === 1 || livro.ativo === true ? 'Disponível <span class="material-symbols-outlined" id="disponibilidade">check_small</span>' : 'Indisponível<span class="material-symbols-outlined" id="disponibilidade">close_small</span>'}</p>

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

    <div id="comentarios-container"></div>
    `;

    const comentarios = await carregarComentarios(livro.id);
    renderizarComentarios(comentarios);

    adicionarEventos();
    configurarFavorito(livro.id);
    configurarReserva(livro.id, livro.ativo);
}

// ============================
// FAVORITOS
// ============================
async function configurarFavorito(livroId) {
    const btn = document.getElementById("favoritarBTN");
    if (!btn) return;

    const novoBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(novoBtn, btn);

    try {
        const resp = await fetch(`${API_URL}/favoritos/${usuarioId}`);
        const favoritos = await resp.json();
        novoBtn.classList.toggle("active", favoritos.some(f => Number(f.livro_id) === Number(livroId)));
    } catch (err) { console.error(err); }

    novoBtn.addEventListener("click", async () => {
        novoBtn.disabled = true;
        try {
            if (novoBtn.classList.contains("active")) {
                await fetch(`${API_URL}/favoritos/${usuarioId}/${livroId}`, { method: "DELETE" });
                novoBtn.classList.remove("active");
            } else {
                await fetch(`${API_URL}/favoritos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuario_id: usuarioId, livro_id: livroId })
                });
                novoBtn.classList.add("active");
            }
        } catch (err) { console.error(err); } 
        finally { novoBtn.disabled = false; }
    });
}

// ============================
// RESERVAS
// ============================
async function configurarReserva(livroId) {
    const btn = document.getElementById("reservarBTN");
    if (!btn) return;

    const novoBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(novoBtn, btn);

    try {
        const resp = await fetch(`${API_URL}/reservas`);
        const reservas = await resp.json();

        const reservaLivro = reservas.find(
            r => Number(r.id_livro) === Number(livroId)
        );

        if (reservaLivro) {
            if (Number(reservaLivro.id_usuario) === Number(usuarioId)) {
                novoBtn.textContent = "Reservado";
            } else {
                novoBtn.textContent = "Indisponível";
            }
            novoBtn.disabled = true;
            novoBtn.style.backgroundColor = "#ccc";
            novoBtn.style.cursor = "not-allowed";
            return;
        }

        // Caso não esteja reservado
        novoBtn.textContent = "Reservar Livro";
        novoBtn.disabled = false;
        novoBtn.style.backgroundColor = "";
        novoBtn.style.cursor = "pointer";

    } catch (err) {
        console.error(err);
    }

    novoBtn.addEventListener("click", async () => {
        novoBtn.disabled = true;
        novoBtn.style.backgroundColor = "#ccc";
        novoBtn.style.cursor = "not-allowed";

        try {
            // 📅 data atual + 7 dias
            const hoje = new Date();
            hoje.setDate(hoje.getDate() + 7);

            const ano = hoje.getFullYear();
            const mes = String(hoje.getMonth() + 1).padStart(2, "0");
            const dia = String(hoje.getDate()).padStart(2, "0");

            const dataDevolucao = `${ano}-${mes}-${dia}`; // YYYY-MM-DD

            await fetch(`${API_URL}/reservas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usuario_id: usuarioId,
                    livro_id: livroId,
                    data_devolucao: dataDevolucao
                })
            });

            novoBtn.textContent = "Reservado ✅";

        } catch (err) {
            console.error(err);
            alert(err.message || "Erro ao reservar");
            novoBtn.disabled = false;
            novoBtn.style.backgroundColor = "";
            novoBtn.style.cursor = "pointer";
        }
    });
}

// ============================
// EVENTOS
// ============================
function adicionarEventos() {
    const btnVoltar = document.getElementById("voltar_inicio");
    if (btnVoltar) btnVoltar.addEventListener("click", () => window.history.back());
}

// ============================
// INICIALIZAÇÃO
// ============================
const urlParams = new URLSearchParams(window.location.search);
const livroId = urlParams.get("id") || 1;
document.addEventListener("DOMContentLoaded", () => carregarDetalhesLivro(livroId));

window.irParaDetalhes = function (id) {
    if (!id) return console.warn("irParaDetalhes: id vazio");
    window.location.href = `detalhes.html?id=${id}`;
};
