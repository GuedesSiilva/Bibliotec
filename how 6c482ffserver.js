[33mcommit 6c482ff33c08a0c608415a0558db9b17abd11992[m[33m ([m[1;31morigin/Victor[m[33m)[m
Author: victorbispoo <dlsejogosdaoras@gmail.com>
Date:   Mon Dec 15 19:01:50 2025 -0300

    tela de cadastro de usuários concluida

[1mdiff --git a/Css/cssAdm/addusers.css b/Css/cssAdm/addusers.css[m
[1mnew file mode 100644[m
[1mindex 0000000..f0ed354[m
[1m--- /dev/null[m
[1m+++ b/Css/cssAdm/addusers.css[m
[36m@@ -0,0 +1,55 @@[m
[32m+[m[32mhtml,body{[m
[32m+[m[32m    font-family: Montserrat, sans-serif;[m
[32m+[m[32m}[m
[32m+[m[32m#containerCadastro {[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    flex-direction: column;[m
[32m+[m[32m    align-items: center;[m
[32m+[m[32m    justify-content: center;[m
[32m+[m[32m    min-height: 500px;[m
[32m+[m[32m}[m
[32m+[m[32mfooter{[m
[32m+[m[32m    position: absolute;[m
[32m+[m[32m    bottom: 0;[m
[32m+[m[32m    width: 100%;[m
[32m+[m[32m}[m
[32m+[m[32mform#formCadastro {[m
[32m+[m[32m    display: flex;[m[41m   [m
[32m+[m[32m    flex-direction: column;[m
[32m+[m[32m    gap: 12px;[m
[32m+[m[32m}[m
[32m+[m[32minput,select {[m
[32m+[m[32m    padding: 10px;[m
[32m+[m[32m    border: 1px solid #ccc;[m
[32m+[m[32m    border-radius: 20px;[m
[32m+[m[32m    font-size: 16px;[m
[32m+[m[32m}[m
[32m+[m[32mbutton#btnCadastrar {[m
[32m+[m[32m    padding: 10px 20px;[m
[32m+[m[32m    background-color: #26333d;[m
[32m+[m[32m    color: white;[m
[32m+[m[32m    border: none;[m
[32m+[m[32m    border-radius: 20px;[m
[32m+[m[32m    font-size: 18px;[m
[32m+[m[32m    cursor: pointer;[m
[32m+[m[32m    transition: background-color 0.3s ease;[m
[32m+[m[32m}[m
[32m+[m[32mbutton#btnCadastrar:hover {[m
[32m+[m[32m    background-color: #3a4a54;[m
[32m+[m[32m    transform: scale(1.02);[m
[32m+[m[32m    box-shadow: 0 8px 20px rgba(0,0,0,0.35);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#btns {[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    justify-content: center;[m
[32m+[m[32m    padding: 20px;[m
[32m+[m[32m}[m
[32m+[m[32mh3 {[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    justify-content: center;[m
[32m+[m[32m    padding-top: 10px;[m
[32m+[m[32m    padding-bottom: 20px;[m
[32m+[m[32m    font-size: 25px;[m
[32m+[m[32m    color: #26333d;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/Css/meuPerfil.css b/Css/meuPerfil.css[m
[1mindex eff4f4d..d22abca 100644[m
[1m--- a/Css/meuPerfil.css[m
[1m+++ b/Css/meuPerfil.css[m
[36m@@ -69,6 +69,11 @@[m [mjustify-content: center;[m
   cursor: pointer;[m
   transition: all 0.3s ease;[m
 }[m
[32m+[m[32mspan{[m
[32m+[m[32m  font-size: 18px;[m
[32m+[m[32m  font-weight: 500;[m
[32m+[m[32m  color: #fff;[m
[32m+[m[32m}[m
 #sairPerfilBtn:hover {[m
   background: red;[m
   color: #fff;[m
[1mdiff --git a/FrontDoADM/addUsers.html b/FrontDoADM/addUsers.html[m
[1mnew file mode 100644[m
[1mindex 0000000..ea411bd[m
[1m--- /dev/null[m
[1m+++ b/FrontDoADM/addUsers.html[m
[36m@@ -0,0 +1,43 @@[m
[32m+[m[32m<!DOCTYPE html>[m
[32m+[m[32m<html lang="pt-BR">[m
[32m+[m
[32m+[m[32m<head>[m
[32m+[m[32m    <meta charset="UTF-8" />[m
[32m+[m[32m    <meta name="viewport" content="width=device-width, initial-scale=1.0" />[m
[32m+[m[32m    <icon rel="icon" href="../IMGS/Group.svg" type="image/x-icon">[m
[32m+[m[32m        <title>Cadastro de Usuários</title>[m
[32m+[m[32m        <link rel="stylesheet" href="../Css/header.css" />[m
[32m+[m[32m        <link rel="stylesheet" href="../Css/detalhes.css">[m
[32m+[m[32m        <link rel="stylesheet" href="../Css/footer.css" />[m
[32m+[m[32m        <link rel="stylesheet" href="../Css/cssAdm/addusers.css" />[m
[32m+[m[32m</head>[m
[32m+[m
[32m+[m[32m<body>[m
[32m+[m
[32m+[m[32m    <div id="header-placeholder"></div>[m
[32m+[m
[32m+[m[32m    <div id="containerCadastro">[m
[32m+[m[32m        <h3>Adicione um usuário na Bibliotec</h3>[m
[32m+[m[32m        <form id="formCadastroUser" method="post" enctype="multipart/form-data">[m
[32m+[m[32m            <input type="text" name="nome" id="nome" placeholder="Nome" required />[m
[32m+[m[32m            <input type="text" name="email" id="email" placeholder="Email" required />[m
[32m+[m[32m            <input type="text" name="senha" id="senha" placeholder="Senha" required />[m
[32m+[m[32m            <input type="date" name="data_nascimento" id="data_nascimento" placeholder="Data de Nascimento" />[m
[32m+[m[32m            <select name="perfil" id="perfil" required>[m
[32m+[m[32m                <option value="">Selecione o tipo de perfil</option>[m
[32m+[m[32m                <option value="admin">Admin</option>[m
[32m+[m[32m                <option value="aluno">Aluno</option>[m
[32m+[m[32m            </select>[m
[32m+[m[32m            <div id="btns">[m
[32m+[m[32m                <button type="submit" id="btnCadastrar">Cadastrar</button>[m
[32m+[m[32m            </div>[m
[32m+[m[32m        </form>[m
[32m+[m[32m    </div>[m
[32m+[m
[32m+[m[32m    <div id="footer-placeholder"></div>[m
[32m+[m[32m    <script type="module" src="../JS/header.js"></script>[m
[32m+[m[32m    <script type="module" src="../JS_ADM/addUser.js"></script>[m
[32m+[m[32m    <script type="module" src="../JS/footer.js"></script>[m
[32m+[m[32m</body>[m
[32m+[m
[32m+[m[32m</html>[m
\ No newline at end of file[m
[1mdiff --git a/FrontEnd/meuPerfil.html b/FrontEnd/meuPerfil.html[m
[1mindex a4c4ad8..c26ce87 100644[m
[1m--- a/FrontEnd/meuPerfil.html[m
[1m+++ b/FrontEnd/meuPerfil.html[m
[36m@@ -32,7 +32,7 @@[m
       <h2 id="nomeUsuario"></h2>[m
       <h3>Email: <span id="emailUsuario"></span></h3>[m
       <h3>Senha: <span id="senhaUsuario"></span></h3>[m
[31m-      <button id="editarPerfilBtn">Editar Perfil</button>[m
[32m+[m[32m  <button id="editarPerfilBtn">Editar Perfil</button>[m
       <button id="sairPerfilBtn">Sair da conta</button>[m
       </div>[m
   </div>[m
[1mdiff --git a/JS/meuPerfil.js b/JS/meuPerfil.js[m
[1mindex 2e3ebdf..82ca08a 100644[m
[1m--- a/JS/meuPerfil.js[m
[1m+++ b/JS/meuPerfil.js[m
[36m@@ -61,7 +61,7 @@[m [mfunction entrarModoEdicao() {[m
    spanNome.innerHTML = `<input type="text" id="inputNome" value="${spanNome.textContent}">`;[m
    spanEmail.innerHTML = `<input type="email" id="inputEmail" value="${spanEmail.textContent}">`;[m
    spanSenha.innerHTML = `<input type="text" id="inputSenha" value="${spanSenha.textContent}">`;[m
[31m-}[m
[32m+[m[32m }[m
 [m
 async function salvarPerfil() {[m
    const novoNome = document.getElementById("inputNome").value;[m
[1mdiff --git a/JS_ADM/addUser.js b/JS_ADM/addUser.js[m
[1mnew file mode 100644[m
[1mindex 0000000..7a05bf1[m
[1m--- /dev/null[m
[1m+++ b/JS_ADM/addUser.js[m
[36m@@ -0,0 +1,28 @@[m
[32m+[m[32mdocument.getElementById("formCadastroUser").addEventListener("submit", async e => {[m
[32m+[m[32m    e.preventDefault();[m
[32m+[m[41m  [m
[32m+[m[32m    const dataNascimento = document.getElementById("data_nascimento").value || null;[m
[32m+[m[41m  [m
[32m+[m[32m    const resposta = await fetch("http://localhost:3000/usuarios", {[m
[32m+[m[32m      method: "POST",[m
[32m+[m[32m      headers: { "Content-Type": "application/json" },[m
[32m+[m[32m      body: JSON.stringify({[m
[32m+[m[32m        nome: document.getElementById("nome").value,[m
[32m+[m[32m        email: document.getElementById("email").value,[m
[32m+[m[32m        senha: document.getElementById("senha").value,[m
[32m+[m[32m        data_nascimento: dataNascimento,[m
[32m+[m[32m        perfil: document.getElementById("perfil").value[m
[32m+[m[32m      })[m
[32m+[m[32m    });[m
[32m+[m[41m  [m
[32m+[m[32m    console.log("Data enviada:", dataNascimento);[m
[32m+[m[32m    console.log("REQ.BODY:", req.body);[m
[32m+[m[32m    if (resposta.ok) {[m
[32m+[m[32m      alert("Usuário c