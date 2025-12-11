-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.0.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para dblivraria
CREATE DATABASE IF NOT EXISTS `dblivraria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `dblivraria`;

-- Copiando estrutura para tabela dblivraria.avaliacoes
CREATE TABLE IF NOT EXISTS `avaliacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `livro_id` int(11) NOT NULL,
  `nota` decimal(2,1) DEFAULT NULL CHECK (`nota` >= 0 and `nota` <= 5),
  `comentario` text DEFAULT NULL,
  `data_avaliacao` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `livro_id` (`livro_id`),
  CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `avaliacoes_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela dblivraria.avaliacoes: ~6 rows (aproximadamente)
INSERT INTO `avaliacoes` (`id`, `usuario_id`, `livro_id`, `nota`, `comentario`, `data_avaliacao`) VALUES
	(1, 1, 1, 5.0, 'História envolvente e personagens cativantes.', '2025-11-13 12:13:44'),
	(2, 2, 1, 4.5, 'Ótima leitura, final surpreendente.', '2025-11-13 12:13:44'),
	(3, 3, 2, 4.0, 'Excelente abordagem sobre tecnologia e negócios.', '2025-11-13 12:13:44'),
	(4, 1, 4, 5.0, 'Leitura obrigatória para todo desenvolvedor.', '2025-11-13 12:13:44'),
	(5, 2, 3, 3.5, 'Ideia interessante, mas um pouco confusa em alguns trechos.', '2025-11-13 12:13:44'),
	(6, 3, 5, 0.5, 'Horrivel.', '2025-11-13 12:13:44');

-- Copiando estrutura para tabela dblivraria.favoritos
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `livro_id` int(11) NOT NULL,
  `data_favoritado` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `livro_id` (`livro_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela dblivraria.favoritos: ~2 rows (aproximadamente)
INSERT INTO `favoritos` (`id`, `usuario_id`, `livro_id`, `data_favoritado`) VALUES
	(1, 4, 4, '2025-12-09 12:12:55'),
	(3, 5, 3, '2025-12-10 11:15:03');

-- Copiando estrutura para tabela dblivraria.livros
CREATE TABLE IF NOT EXISTS `livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `editora` varchar(100) DEFAULT NULL,
  `ano_publicacao` smallint(6) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `idioma` varchar(50) DEFAULT 'Português',
  `formato` enum('Físico','E-book','Audiobook') DEFAULT 'Físico',
  `caminho_capa` varchar(255) DEFAULT NULL,
  `sinopse` text DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela dblivraria.livros: ~5 rows (aproximadamente)
INSERT INTO `livros` (`id`, `titulo`, `autor`, `categoria`, `editora`, `ano_publicacao`, `isbn`, `idioma`, `formato`, `caminho_capa`, `sinopse`, `ativo`, `criado_em`, `atualizado_em`) VALUES
	(1, 'Filhas da Lua', 'Carolina França', 'Fantasia / Romance', 'Pandorga', 2018, '9788568263952', 'Português', 'Físico', '../IMGS/capas/filhasdalua.jpg', 'Trilogia sobre jovens com poderes lunares e uma antiga profecia.', 0, '2025-11-13 12:13:17', '2025-12-08 12:04:50'),
	(2, 'TI para Negócios', 'Edson Perin', 'Tecnologia / Gestão', 'M. Books', 2010, '9788578271541', 'Português', 'E-book', '../IMGS/capas/tiparanegocios.jpg', 'Mostra como a TI pode impulsionar resultados empresariais.', 1, '2025-11-13 12:13:17', '2025-12-08 12:05:25'),
	(3, 'Mestres do Tempo', 'R. V. Campbell', 'Ficção Científica', 'Arqueiro', 2017, '9788580417432', 'Português', 'Físico', '../IMGS/capas/mestresdotempo.jpg', 'Explora viagens no tempo e dilemas morais sobre alterar o passado.', 1, '2025-11-13 12:13:17', '2025-12-08 12:05:03'),
	(4, 'O Código Limpo', 'Robert C. Martin', 'Tecnologia / Programação', 'Alta Books', 2009, '9788576082675', 'Português', 'Físico', '../IMGS/capas/codigolimpo.jpg', 'Guia essencial sobre boas práticas e padrões de código limpo.', 1, '2025-11-13 12:13:17', '2025-12-08 12:05:33'),
	(5, 'Dom Casmurro', 'Machado de Assis', 'Romance Clássico', 'Principis', 1899, '9788580574463', 'Português', 'Físico', '../IMGS/capas/domcasmurro.jpg', 'Um dos maiores clássicos da literatura brasileira, explorando ciúme e ambiguidade.', 1, '2025-11-13 12:13:17', '2025-12-08 12:04:47');

-- Copiando estrutura para tabela dblivraria.reservas
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `livro_id` int(11) NOT NULL,
  `data_retirada` date NOT NULL,
  `data_devolucao` date NOT NULL,
  `confirmado_email` tinyint(1) DEFAULT 0,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `livro_id` (`livro_id`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela dblivraria.reservas: ~2 rows (aproximadamente)
INSERT INTO `reservas` (`id`, `usuario_id`, `livro_id`, `data_retirada`, `data_devolucao`, `confirmado_email`, `criado_em`) VALUES
	(1, 4, 4, '2025-12-09', '2026-01-05', 0, '2025-12-09 11:55:36'),
	(2, 4, 2, '2025-12-09', '2026-01-03', 0, '2025-12-09 13:32:55'),
	(3, 5, 5, '2025-12-09', '4025-12-09', 1, '2025-12-09 13:52:25');

-- Copiando estrutura para tabela dblivraria.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `curso` varchar(100) DEFAULT NULL,
  `perfil` enum('Aluno','Admin') DEFAULT 'Aluno',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela dblivraria.usuarios: ~5 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `data_nascimento`, `celular`, `curso`, `perfil`) VALUES
	(1, 'Vitor Lima', 'vitor.lima@email.com', '1234', NULL, NULL, NULL, 'Aluno'),
	(2, 'Pedro Campos', 'pedro.campos@email.com', 'abcd', NULL, NULL, NULL, 'Aluno'),
	(3, 'Wendel Duque', 'duque@email.com', 'senha123', NULL, NULL, NULL, 'Admin'),
	(4, 'Davi Guedes', 'davi.guedes@email.com', 'teste123', NULL, NULL, NULL, 'Admin'),
	(5, 'Victor Bispo', 'bispolaa@email.com', '2222', NULL, NULL, NULL, 'Admin');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
