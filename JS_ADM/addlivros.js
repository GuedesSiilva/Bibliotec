document.addEventListener("DOMContentLoaded", carregarCategorias);

async function carregarCategorias() {
  try {
    const res = await fetch("http://localhost:3000/categorias");
    const categorias = await res.json();

    const select = document.getElementById("categoria");

    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id; 
      option.textContent = cat.categoria;
      select.appendChild(option);
    });

  } catch (err) {
    console.error("Erro ao carregar categorias:", err);
  }
}
