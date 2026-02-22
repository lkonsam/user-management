import Joi from "joi";

/**
 * User table schema (for reference / migrations)
 *
 * CREATE TABLE users (
 *   id INT PRIMARY KEY AUTO_INCREMENT,
 *   name VARCHAR(100) NOT NULL,
 *   email VARCHAR(150) NOT NULL UNIQUE,
 *   password_hash VARCHAR(255) NOT NULL,
 *   role_id INT NOT NULL,
 *   status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 * );
 */

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("ADMIN", "USER").required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  role: Joi.string().valid("ADMIN", "USER").optional(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").optional(),
}).or("name", "role", "status");

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid("ACTIVE", "INACTIVE").required(),
});

export default {
  createUserSchema,
  updateUserSchema,
  updateStatusSchema,
};
