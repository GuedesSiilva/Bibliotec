
const imagemURL = "./IMGS/harry-potter.jpg";

// ===== DADOS DO LIVRO =====
const livro = {
	titulo: "Harry Potter e a Pedra Filosofal",
	autor: "J.K. Rowling",
	publicacao: "26 de junho de 1997",
	sinopse: "Harry Potter, um garoto órfão que vive com seus tios cruéis, descobre no seu 11º aniversário que é um bruxo. Ele é convidado a estudar na Escola de Magia e Bruxaria de Hogwarts, onde faz amigos leais e enfrenta desafios mágicos. Ao longo do ano, Harry desvenda o mistério da Pedra Filosofal e enfrenta o retorno do maligno Lord Voldemort.",
	genero: "Fantasia",
	editora: "Rocco",
	idioma: "Português",
	formato: "Fisico",
	disponibilidade: "OK"
};

// ===== CAPA DO LIVRO =====
const divCapa = document.getElementById("CobrirDetalhes");
if (divCapa) {
	const img = document.createElement('img');
	img.src = imagemURL;
	img.alt = 'Capa do Livro';
	img.className = 'book-cover-img';
	divCapa.appendChild(img);
}

// ===== TÍTULO =====
const TituloDetalhes = document.getElementById("detalhes_Titulo");
if (TituloDetalhes) {
	TituloDetalhes.textContent = livro.titulo;
}

// ===== AUTOR =====
const AutorDetalhes = document.getElementById("detalhes_Autor");
if (AutorDetalhes) {
	if (!AutorDetalhes.textContent.includes(livro.autor)) {
		AutorDetalhes.textContent = AutorDetalhes.textContent.trim() + ' ' + livro.autor;
	}
}

// ===== PUBLICAÇÃO =====
const PublicacaoDetalhes = document.querySelector(".publicacao");
if (PublicacaoDetalhes) {
	if (!PublicacaoDetalhes.textContent.includes(livro.publicacao)) {
		PublicacaoDetalhes.textContent = PublicacaoDetalhes.textContent.trim() + ' ' + livro.publicacao;
	}
}

// ===== SINOPSE =====
const SinopseDetalhes = document.querySelector(".detalhes_sinopse");
if (SinopseDetalhes) {
	if (!SinopseDetalhes.textContent.includes('Harry Potter,')) {
		SinopseDetalhes.textContent = SinopseDetalhes.textContent.trim() + ' ' + livro.sinopse;
	}
}

// ===== GÊNERO =====
const GeneroDetalhes = document.getElementById("detalhes_Genero");
if (GeneroDetalhes) {
	if (!GeneroDetalhes.textContent.includes(livro.genero)) {
		GeneroDetalhes.textContent = GeneroDetalhes.textContent.trim() + ' ' + livro.genero;
	}
}

// ===== EDITORA =====
const EditoraDetalhes = document.getElementById("detalhes_Editora");
if (EditoraDetalhes) {
	if (!EditoraDetalhes.textContent.includes(livro.editora)) {
		EditoraDetalhes.textContent = EditoraDetalhes.textContent.trim() + ' ' + livro.editora;
	}
}

// ===== IDIOMA =====
const IdiomaDetalhes = document.getElementById("detalhes_Idioma");
if (IdiomaDetalhes) {
	if (!IdiomaDetalhes.textContent.includes(livro.idioma)) {
		IdiomaDetalhes.textContent = IdiomaDetalhes.textContent.trim() + ' ' + livro.idioma;
	}
}

// ===== FORMATO =====
const FormatoDetalhes = document.getElementById("detalhes_Formato");
if (FormatoDetalhes) {
	if (!FormatoDetalhes.textContent.includes(livro.formato)) {
		FormatoDetalhes.textContent = FormatoDetalhes.textContent.trim() + ' ' + livro.formato;
	}
}

// ===== DISPONIBILIDADE =====
const AtivoDetalhes = document.getElementById("detalhes_Ativo");
if (AtivoDetalhes) {
	if (!AtivoDetalhes.textContent.includes(livro.disponibilidade)) {
		AtivoDetalhes.textContent = AtivoDetalhes.textContent.trim() + ' ' + livro.disponibilidade;
	}
}
// ===== BOTÃO DE RESERVA =====
const botaoReserva = document.getElementById("reservarBTN");
if (botaoReserva) {
	botaoReserva.addEventListener("click", function() {
		alert("Livro '" + livro.titulo + "' reservado com sucesso!");
	});
}

// ===== BOTÃO VOLTAR =====
const botaoVoltar = document.getElementById("voltar_inicio");
if (botaoVoltar) {
	botaoVoltar.addEventListener("click", function() {
		window.history.back();
	});
}
