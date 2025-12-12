 import { id } from './telalogin.js';
 localStorage.setItem("usuarioId", id);
let editando = false;
 const btnEditar = document.getElementById("editarPerfilBtn");
   const spanNome = document.getElementById("nomeUsuario")
  const spanEmail = document.getElementById("emailUsuario")
  const spanSenha = document.getElementById("senhaUsuario")
  const spanTelefone = document.getElementById("telefoneUsuario")

async function carregarPerfil() {
  try{
  const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
  const dados = await resposta.json();
    spanNome.textContent = dados.nome;
    spanEmail.textContent = dados.email;
    spanSenha.textContent = dados.senha;
    spanTelefone.textContent = dados.telefone;
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
    spanTelefone.innerHTML = `<input type="tel" id="inputTelefone" value="${spanTelefone.textContent}">`;
}

async function salvarPerfil() {
    const novoNome = document.getElementById("inputNome").value;
    const novoEmail = document.getElementById("inputEmail").value;
    const novaSenha = document.getElementById("inputSenha").value;
    const novoTelefone = document.getElementById("inputTelefone").value;
    const body = {
        nome: novoNome,
        email: novoEmail,
        senha: novaSenha,
        telefone: novoTelefone
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