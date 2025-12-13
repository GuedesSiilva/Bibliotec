const URlparametro = new URLSearchParams(window.location.search);
const idUser = URlparametro.get("id");

console.log("ID do livro para editar:", idUser);

const inputID = document.getElementById("id");
inputID.value =  idUser

const API = "http://localhost:3000/usuarios"

async function carregarUsuario() {
    if (!idUser) {
        alert("Nenhum usuario selecionado para edição!");
        return;
    }
    try {
         const resposta = await fetch(`${API}/${idUser}`);
    const User = await resposta.json();
    console.log(User);
    

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("cep").value = aluno.cep ?? "";
    document.getElementById("uf").value = aluno.uf ?? "";
    document.getElementById("rua").value = aluno.rua ?? "";
    document.getElementById("numero").value = aluno.numero ?? null;
    document.getElementById("complemento").value = aluno.complemento ?? "";
    } catch (error) {
        console.error("Erro ao carregar aluno:", error);
    }
   
}

document.getElementById("form-atualizar").addEventListener("submit", async function(e) {
    e.preventDefault();

    const alunoAtualizado = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        cep: document.getElementById("cep").value,
        uf: document.getElementById("uf").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value ? parseInt(document.getElementById("numero").value) : null,
        complemento: document.getElementById("complemento").value
    };

    const resposta = await fetch(`${API}/${idAluno}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alunoAtualizado)
    });

    if (resposta.ok) {
        alert("Aluno atualizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("Erro ao atualizar aluno!");
    }
});
carregarUsuario();