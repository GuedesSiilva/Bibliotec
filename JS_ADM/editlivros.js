const URlparametro = new URLSearchParams(window.location.search);
const idLivro = URlparametro.get("id");

console.log("ID do livro para editar:", idLivro);

const inputID = document.getElementById("id");
inputID.value =  idLivro

const API = "http://localhost:3000/livros"

async function carregarLivro() {
    if (!idLivro) {
        alert("Nenhum livro selecionado para edição!");
        return;
    }
    try {
         const resposta = await fetch(`${API}/${idLivro}`);
    const livro = await resposta.json();
    console.log(livro);
    

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
carregarLivro();