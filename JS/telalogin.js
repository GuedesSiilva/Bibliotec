var chk = document.getElementById('btnMostrarSenha');
var senha = document.getElementById('password');
var username = document.getElementById('username');
var lblEsqueciSenha = document.getElementById('lblEsqueciSenha');

document.addEventListener('DOMContentLoaded', function(){
    chk.addEventListener('change', function(){
        if(senha) senha.type = chk.checked ? 'text' : 'password';
    });
    
    lblEsqueciSenha.addEventListener('click', function() {
        // Remove o atributo required dos campos
        username.removeAttribute('required');
        senha.removeAttribute('required');
        
        // Navega para a página de recuperação de senha
        window.location.href = 'telaRecuperarSenha.html';
    });
});