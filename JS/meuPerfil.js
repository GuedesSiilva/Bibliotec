 const id = 5;
 localStorage.setItem("usuarioId", id);
let editando = false;
 const fotodePerfil = document.getElementById("fotoPerfil");
 const btnEditar = document.getElementById("editarPerfilBtn");
  const spanNome = document.getElementById("nomeUsuario")
  const spanEmail = document.getElementById("emailUsuario")
  const spanSenha = document.getElementById("senhaUsuario")



async function carregarPerfil() {
  try{
  const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
  const dados = await resposta.json();
    spanNome.textContent = dados.nome;
    spanEmail.textContent = dados.email;
    spanSenha.textContent = dados.senha;
    document.getElementById("fotoPerfil").src = dados.foto || "../IMGS/capas/domcasmurro.jpg";
  } catch (erro) {
    console.error("Erro ao carregar perfil:", erro);
  }
}

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
}

async function salvarPerfil() {
    const novoNome = document.getElementById("inputNome").value;
    const novoEmail = document.getElementById("inputEmail").value;
    const novaSenha = document.getElementById("inputSenha").value;
        console.log("Valores a serem enviados:", {
        nome: novoNome,
        email: novoEmail,
        senha: novaSenha,
        foto: fotoBase64,
    });
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
    window.location.href = '../FrontEnd/telaLogin.html';
    localStorage.removeItem("usuarioId");
})