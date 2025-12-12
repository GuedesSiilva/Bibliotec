const API_URL = "http://localhost:3000";
var formLogin = document.getElementById('formLogin');
var chk = document.getElementById('btnMostrarSenha');
var senha = document.getElementById('password');
var username = document.getElementById('username');
var lblEsqueciSenha = document.getElementById('lblEsqueciSenha');
export var id = null;

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

        if (!username || !senha) return;

        const usernameValue = username.value;
        const senhaValue = senha.value;
        const usuarioEncontrado = listaUsuarios.find(perfil =>
            (perfil.nome === usernameValue || perfil.email === usernameValue) && perfil.senha === senhaValue
        );

        if (usuarioEncontrado) {
            console.log('Usuário encontrado:', usuarioEncontrado);
            id = usuarioEncontrado.id;
            localStorage.setItem('userId', String(id));
            console.log('ID salvo no localStorage:', id);
            window.location.href = '/FrontEnd/telainicial';
        }

    }
    );
});