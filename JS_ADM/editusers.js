const params = new URLSearchParams(window.location.search);
const idUser = params.get("id");
let usuarioSelecionado = null;

console.log("ID do usuario para editar:", idUser);

const API = "http://localhost:3000/usuarios";

async function carregarUsuariosDisponiveis() {
  try {
    const res = await fetch(`${API}`);
    const usuarios = await res.json();
    console.log("Usuarios recebidos:", usuarios);

    const select = document.getElementById("select-user");
    select.innerHTML = `<option value="">Selecione um usuário</option>`;

    usuarios.forEach(usuario => {
      const option = document.createElement("option");
      option.value = usuario.id;
      option.textContent = `${usuario.id} - ${usuario.nome}`;
      select.appendChild(option);
    });

    // Se veio id pela URL, marca o select e carrega
    if (idUser) {
      select.value = idUser;
      carregarUsuario(idUser);
    }
  } catch (err) {
    console.error("Erro ao carregar lista de usuários:", err);
  }
}

async function carregarUsuario(id) {
  try {
    const resposta = await fetch(`${API}/${id}`);
    if (!resposta.ok) throw new Error("Usuário não encontrado");
    const usuario = await resposta.json();

    usuarioSelecionado = usuario;

    document.getElementById("nome").value = usuario.nome ?? "";
    document.getElementById("email").value = usuario.email ?? "";
    document.getElementById("senha").value = usuario.senha ?? "";
    document.getElementById("perfil").value = usuario.perfil ?? "";

    // Converte data do banco (yyyy-mm-dd) para dd-mm-yyyy
    if (usuario.data_nascimento) {
      const partes = usuario.data_nascimento.split("-");
      document.getElementById("data_nascimento").value = `${partes[2]}-${partes[1]}-${partes[0]}`;
    } else {
      document.getElementById("data_nascimento").value = "";
    }

  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    alert("Erro ao carregar usuário. Veja console.");
  }
}

document.getElementById("select-user").addEventListener("change", (e) => {
  if (!e.target.value) return;
  carregarUsuario(e.target.value);
});

document.getElementById("form-atualizar").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!usuarioSelecionado) {
    alert("Selecione um usuário primeiro");
    return;
  }

  // Converte a data de dd-mm-yyyy para yyyy-mm-dd
  const dataInput = document.getElementById("data_nascimento").value;
  let dataFormatada = null;
  if (dataInput) {
    const partes = dataInput.split("-");
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      dataFormatada = `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
  }

  const usuarioAtualizado = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    data_nascimento: dataFormatada,
    perfil: document.getElementById("perfil").value,
  };

  try {
    const resposta = await fetch(`${API}/${usuarioSelecionado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioAtualizado)
    });

    if (resposta.ok) {
      alert("Usuário atualizado com sucesso!");
      window.location.href = "../FrontDoADM/listarUsers.html";
    } else {
      const texto = await resposta.text();
      console.error("Erro no PUT:", resposta.status, texto);
      alert("Erro ao atualizar usuário. Veja console.");
    }
  } catch (err) {
    console.error("Erro na requisição PUT:", err);
    alert("Erro ao atualizar usuário. Veja console.");
  }
});

// Inicia carregamento da lista
carregarUsuariosDisponiveis();
