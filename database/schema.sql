CREATE DATABASE IF NOT EXISTS pos_ai
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE pos_ai;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  sku VARCHAR(60) NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY products_sku_unique (sku)
);

INSERT INTO products (name, sku, price, stock)
VALUES
  ('House Blend Coffee', 'COF-001', 12.99, 42),
  ('Ceramic Mug', 'MUG-014', 8.50, 18),
  ('Receipt Paper Roll', 'SUP-220', 3.25, 7)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  price = VALUES(price),
  stock = VALUES(stock);
