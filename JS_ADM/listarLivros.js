const API = "http://localhost:3000/livros"

function formatarDataBR(data) {
    if (!data) return "";
    const d = new Date(data);
    if (isNaN(d.getTime())) return data; // caso não seja data válida
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}-${mes}-${ano}`; // dd-mm-yyyy
}


async function carregarTabela() {

    try {
        const resposta = await fetch(API);
        const alunos = await resposta.json();
        const tbody = document.getElementById("tbody")

        tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>"

        // setTimeout(() => {
        tbody.innerHTML = "";
        tbody.innerHTML = alunos.map(a =>
            `<tr>
                    <td>${a.id}</td>
                    <td>${a.titulo}</td>
                    <td>${a.autor}</td>
                    <td>${a.categoria}</td>
                    <td>${a.editora}</td>
                    <td>${a.ano_publicacao}</td>
                    <td>${a.isbn}</td>
                    <td>${a.idioma}</td>
                    <td>${a.formato}</td>
                    <td>${a.caminho_capa}</td>
                    <td>${a.sinopse}</td>
                    <td>${a.ativo}</td>
                    <td>${formatarDataBR(a.criado_em)}</td>
                    <td>${formatarDataBR(a.atualizado_em)}</td>
                    <td>
                    <a href="../FrontDoADM/EditLivros.html?id=${a.id}"><button>Editar</button></a>
                    <button onclick="excluir(${a.id})">Excluir</button> 
                    </td>
                </tr>`
        ).join("");
        // }, 2000) // 5 segundos
    } catch (error) {
        console.error(error.message);
    }
}
window.carregarTabela = carregarTabela;
carregarTabela();


async function excluir(id) {
    if (!confirm("Tem certeza que deseja excluir este livro?")) {
        return;
    }
    console.log("Excluindo livro", id);
    try {
        const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (resposta.status === 200) {
            console.log("Livro excluído com sucesso");
            carregarTabela();
        } else {
            console.log("Erro ao excluir livro");
        }
    } catch (error) {
        console.error(error.message);
    }
}
window.excluir = excluir;

