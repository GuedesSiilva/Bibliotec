var chk = document.getElementById('btnMostrarSenha');
var senha = document.getElementById('password');
var username = document.getElementById('username');
var lblEsqueciSenha = document.getElementById('EsqueciSenha');

lblEsqueciSenha.addEventListener('click', function() {
        username.removeAttribute('required');
        senha.removeAttribute('required');
        window.location.href = '/FrontEnd/EsqueciSenha.html';
    });

document.addEventListener('DOMContentLoaded', function(){
    chk.addEventListener('change', function(){
        if(senha) senha.type = chk.checked ? 'text' : 'password';
    });
    // Handler do formulário de login: redireciona para a tela inicial
    var formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            // aqui você pode validar as credenciais ou enviar via fetch
            // por enquanto apenas redireciona para a tela inicial
            window.location.href = '/FrontEnd/telainicial.html';
        });
    }
});