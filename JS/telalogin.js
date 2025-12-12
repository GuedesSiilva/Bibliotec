const API_URL = "http://localhost:3000";
var formLogin = document.getElementById('formLogin');
var chk = document.getElementById('btnMostrarSenha');
var senha = document.getElementById('password');
var username = document.getElementById('username');
var lblEsqueciSenha = document.getElementById('lblEsqueciSenha');
var id = null;
async function extrairListaUsuarios() {
    try {
        const resp = await fetch(`${API_URL}/usuarios`);
        if (!resp.ok) throw new Error(`Erro ao buscar usuários: ${resp.status}`);
        const listaUsuarios = await resp.json();
        console.log('Lista de usuários extraída:', listaUsuarios);
        return listaUsuarios;
    } catch (erro) {
        console.error('Erro ao extrair usuários:', erro.message);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', function () {
    chk.addEventListener('change', function () {
        if (senha) senha.type = chk.checked ? 'text' : 'password';
    });

    formLogin.addEventListener('submit', async function (e) {
        e.preventDefault();
        const listaUsuarios = await extrairListaUsuarios();
        if (username && senha && listaUsuarios.length > 0) {
            const usuarioEncontrado = listaUsuarios.some(perfil =>
                perfil.nome === username.value || perfil.email === username.value
            );
            const senhaCorreta = listaUsuarios.some(perfil =>
                perfil.senha === senha.value
            );
            if (usuarioEncontrado && senhaCorreta) {
                const id = listaUsuarios.find(perfil =>
                    (perfil.nome === username.value || perfil.email === username.value) && perfil.senha === senha.value
                ).id;
                window.location.href = '/FrontEnd/telaInicial.html';
                alert('ID do usuário:', id);
            } else {
                alert('Usuário ou senha inválidos!');
            }
        } else {
            alert('Por favor, preencha os campos obrigatórios.');
        }
    });
});