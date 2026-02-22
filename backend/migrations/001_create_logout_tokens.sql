-- Migration: create logout_tokens table
-- Run this SQL against your database to add revoked token storage

CREATE TABLE IF NOT EXISTS logout_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  token VARCHAR(1024) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (expires_at)
);
