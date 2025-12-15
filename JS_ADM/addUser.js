document.getElementById("formCadastroUser").addEventListener("submit", async e => {
    e.preventDefault();
  
    const dataNascimento = document.getElementById("data_nascimento").value || null;
  
    const resposta = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        data_nascimento: dataNascimento,
        perfil: document.getElementById("perfil").value
      })
    });
  
    console.log("Data enviada:", dataNascimento);
    console.log("REQ.BODY:", req.body);
    if (resposta.ok) {
      alert("Usuário cadastrado");
      document.getElementById("formCadastroUser").reset();
    } else {
      const erro = await resposta.json();
      alert("Erro ao cadastrar: " + erro.erro);
    }
  });