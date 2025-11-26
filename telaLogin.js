
document.addEventListener('DOMContentLoaded', function(){
    var chk = document.getElementById('btnMostrarSenha');
    var senha = document.getElementById('password');
    chk.addEventListener('change', function(){
        if(senha) senha.type = chk.checked ? 'text' : 'password';
    });
});

var btnEsqueciSenha = document.getElementById('lblEsqueciSenha');
btnEsqueciSenha.addEventListener('click', function() 
{
    window.location.href = 'telaRecuperarSenha.html'; // Substitua pelo caminho correto da página
});