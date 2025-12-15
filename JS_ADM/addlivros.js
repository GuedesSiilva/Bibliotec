const inputCapa = document.getElementById("capa");
const preview = document.getElementById("previewCapa");

inputCapa.addEventListener("change", () => {
  const file = inputCapa.files[0];

  if (!file) {
    preview.style.display = "none";
    return;
  }

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
});


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

document.getElementById("formCadastro").addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData(e.target);

  await fetch("http://localhost:3000/livros", {
    method: "POST",
    body: formData
  });

  alert("Livro cadastrado");
});
