export let livros = [];
export async function carregarLivros() {
  const resposta = await fetch("http://localhost:3000/livros");
  const data = await resposta.json();
  livros = data.map(l => ({
    id: l.id,
    nome: l.titulo,
    img: l.caminho_capa,
    autor: l.autor,
  }));}

export const categorias = [
  { id: 1, img: "../IMGS/categorias/fantasia.png", nome: "Fantasia" },
  { id: 2, img: "../IMGS/categorias/ficcao.png", nome: "Ficção" },
  { id: 3, img: "../IMGS/categorias/romance.png", nome: "Romance" },
  { id: 4, img: "../IMGS/categorias/tecnologia.png", nome: "Tecnologia" },
  { id: 5, img: "../IMGS/categorias/aventura.png", nome: "Aventura" },];