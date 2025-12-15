function adicionarEventos() {
  const btnVoltar = document.getElementById("voltar_inicio");
  const ListarLivros = document.getElementById("listar_livro")
  const AddLivro = document.getElementById("add_livro");
  const EditLivro = document.getElementById("editar_livro")
  const ListarUsers = document.getElementById("listarUsers")
  const AddUsers = document.getElementById("Cadastrar")
  const EditUsers = document.getElementById("editarUsers");



  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
      window.history.back();
    });
  }
  if (ListarLivros) {
    ListarLivros.addEventListener("click", () => {
      window.location.href = "../FrontDoADM/listarLivros.html";
    })
  }
  if (AddLivro) {
    AddLivro.addEventListener("click", () => {
      window.location.href = "../FrontDoADM/AddLivros.html";
    })
  }
  if (EditLivro) {
    EditLivro.addEventListener("click", () => {
      window.location.href = "../FrontDoADM/EditLivros.html";
    })
  }
  if (ListarUsers) {
    ListarUsers.addEventListener("click", () => {
      window.location.href = "../FrontDoADM/listarUsers.html";
    })
  }
  if (AddUsers) {
    AddUsers.addEventListener("click", () => {
      window.location.href = "../FrontDoADM/addUser.html";
    })
  }
  if (EditUsers) {
    EditUsers.addEventListener("click", () => {
      window.location.href = "../FrontDoADM/EditUsers.html";
    })
  }
}

adicionarEventos();