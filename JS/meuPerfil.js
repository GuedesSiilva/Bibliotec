const id = localStorage.getItem("userId");

if (!id) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = '../FrontEnd/telalogin.html';
} let editando = false;
const fotodePerfil = document.getElementById("fotoPerfil");
const btnEditar = document.getElementById("editarPerfilBtn");
const spanNome = document.getElementById("nomeUsuario")
const spanEmail = document.getElementById("emailUsuario")
const spanSenha = document.getElementById("senhaUsuario")
const spanCancelar = document.getElementById("sairEditarBtn")

// Esconder botão de cancelar por padrão
if (spanCancelar) spanCancelar.style.display = 'none';

// Clique em cancelar (sair do modo edição sem salvar)
if (spanCancelar) spanCancelar.addEventListener('click', cancelEditar);

function cancelEditar() {
    editando = false;
    btnEditar.textContent = "Editar Perfil";
    btnEditar.style.backgroundColor = "";
    btnEditar.style.color = "";
    if (spanCancelar) spanCancelar.style.display = 'none';
    // Limpa qualquer alteração temporária como a imagem em base64
    fotoBase64 = null;
    // Recarrega os dados do perfil para desfazer alterações na UI
    carregarPerfil();
}

async function carregarPerfil() {
    try {
        const resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
            signal: AbortSignal.timeout(5000) // Timeout de 5 segundos
        });

        if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);

        const dados = await resposta.json();
        console.log("Dados do perfil carregados:", dados);

        spanNome.textContent = dados.nome;
        spanEmail.textContent = dados.email;
        spanSenha.textContent = dados.senha;
        fotodePerfil.src = dados.foto || '../ICONS/usuario.png';

    } catch (erro) {
        console.error("Erro ao carregar perfil:", erro);
        spanNome.textContent = "Servidor indisponível";
        spanEmail.textContent = "Verifique sua conexão";
        spanSenha.textContent = "---";
        fotodePerfil.src = '../ICONS/usuario.png';
        alert("⚠️ Servidor offline. Alguns dados podem não carregar.");
    }
}

btnVoltar.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '../FrontEnd/telaInicial.html';
    }
});

btnEditar.addEventListener("click", async () => {
    if (editando) {
        console.log("Entrou no modo Salvar.");
        await salvarPerfil();
    } else {
        console.log("Entrou no modo Editar.");
        entrarModoEdicao();
    }
});
function entrarModoEdicao() {
    editando = true;
    btnEditar.textContent = "Salvar Alterações";
    btnEditar.style.backgroundColor = "#28a745";
    btnEditar.style.color = "#fff";
    spanNome.innerHTML = `<input type="text" id="inputNome" value="${spanNome.textContent}">`;
    spanEmail.innerHTML = `<input type="email" id="inputEmail" value="${spanEmail.textContent}">`;
    spanSenha.innerHTML = `<input type="text" id="inputSenha" value="${spanSenha.textContent}">`;
    // Mostrar botão de cancelar enquanto estiver editando
    if (spanCancelar) spanCancelar.style.display = 'inline-block';
}

async function salvarPerfil() {
    const novoNome = document.getElementById("inputNome").value;
    const novoEmail = document.getElementById("inputEmail").value;
    const novaSenha = document.getElementById("inputSenha").value;
    const body = {
        nome: novoNome,
        email: novoEmail,
        senha: novaSenha,
        foto: fotoBase64,
    };
    try {
        const resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (resposta.ok) {
            alert("Perfil atualizado com sucesso!");
            editando = false;
            btnEditar.textContent = "Editar Perfil";
            btnEditar.style.backgroundColor = "";
            btnEditar.style.color = "";
            if (spanCancelar) spanCancelar.style.display = 'none';

            carregarPerfil();
        } else {
            alert("Erro ao atualizar.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro de conexão com o servidor.");
    }
}
carregarPerfil();

let fotoBase64 = null; // Mantém a variável de escopo global

const fotoPerfil = document.getElementById("fotoPerfil"); // Garante que você tenha o elemento
const inputFoto = document.getElementById("inputFoto"); // Garante que você tenha o elemento

inputFoto.addEventListener("change", () => {
    const arquivo = inputFoto.files[0];

    // Se nenhum arquivo foi selecionado ou se a ação foi cancelada
    if (!arquivo) {
        fotoBase64 = null; // Limpa o Base64 se o usuário cancelar
        return;
    }

    const reader = new FileReader();

    // Esta função será executada assim que a leitura do arquivo terminar
    reader.onload = () => {
        // 1. Armazena a string Base64 para ser enviada na requisição PUT/salvar
        fotoBase64 = reader.result;

        // 2. Define o preview da imagem usando a mesma string Base64
        fotoPerfil.src = fotoBase64;
    };

    // Inicia a leitura do arquivo como uma URL de dados (Base64)
    reader.readAsDataURL(arquivo);
});


fotoPerfil.addEventListener("click", () => {
    if (!editando) return;
    inputFoto.click();
});


document.getElementById("sairPerfilBtn").addEventListener("click", () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("perfil");
    localStorage.removeItem("userId");
    window.location.href = '../FrontEnd/telaLogin.html'; 
});
