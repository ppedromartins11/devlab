CREATE DATABASE IF NOT EXISTS devlab_pizzaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE devlab_pizzaria;

CREATE TABLE IF NOT EXISTS pizzas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente VARCHAR(100) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS itens_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  pizza_id INT NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (pizza_id) REFERENCES pizzas(id)
) ENGINE=InnoDB;

INSERT INTO pizzas (nome, preco, ativo) VALUES
('Mussarela', 39.90, 1), ('Calabresa', 42.90, 1), ('Frango', 44.90, 1);
