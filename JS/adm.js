function adicionarEventos() {
  const btnVoltar = document.getElementById("voltar_inicio");

  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
      window.history.back();
    });
  }
}

adicionarEventos();