const API = "http://localhost:3000/usuarios";

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
        const tbody = document.getElementById("tbody");

        tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>";

        tbody.innerHTML = alunos.map(a =>
            `<tr>
                <td>${a.id}</td>
                <td>${a.nome}</td>
                <td>${a.email}</td>
                <td>${a.senha}</td>
                <td>${formatarDataBR(a.data_nascimento)}</td>
                <td>${a.perfil}</td>
                <td>
                    <a href="../FrontDoADm/EditUsers.html?id=${a.id}"><button class="btn-editar">Editar</button></a>
                    <button onclick="excluir(${a.id})" class="btn-excluir">Excluir</button> 
                </td>
            </tr>`
        ).join("");

    } catch (error) {
        console.error(error.message);
    }
}

window.carregarTabela = carregarTabela;
carregarTabela();

async function excluir(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
        const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (resposta.status === 200) {
            console.log("Usuário excluído com sucesso");
            carregarTabela();
        } else {
            console.log("Erro ao excluir usuário");
        }
    } catch (error) {
        console.error(error.message);
    }
}
window.excluir = excluir;
