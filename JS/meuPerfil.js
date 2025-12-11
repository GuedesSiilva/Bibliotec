async function carregarPerfil() {
  const id = 5
  const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
  const dados = await resposta.json();

  document.getElementById("nomeUsuario").textContent = dados.nome
  document.getElementById("emailUsuario").textContent = `Email: ${dados.email}`
  document.getElementById("senhaUsuario").textContent = `Senha: ${dados.senha}`
  document.getElementById("celularUsuario").textContent = `Celular: ${dados.celular}`
}
carregarPerfil();

async function salvarPerfil() {
//   const id = localStorage.getItem("userId");
  const body = {
    nome: document.querySelector("nomeUsuario").value,
    email: document.querySelector("emailUsuario").value,
    senha: document.querySelector("senhaUsuario").value,
    celular: document.querySelector("celularUsuario").value,
  };

  await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  alert("Atualizado");
}
