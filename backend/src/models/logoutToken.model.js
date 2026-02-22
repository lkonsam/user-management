import Joi from "joi";

/**
 * Logout tokens table (revoked tokens)
 *
 * CREATE TABLE logout_tokens (
 *   id INT PRIMARY KEY AUTO_INCREMENT,
 *   token VARCHAR(512) NOT NULL,
 *   expires_at DATETIME NOT NULL,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 */

export const logoutTokenSchema = Joi.object({
  token: Joi.string().required(),
  expires_at: Joi.date().required(),
});

export default { logoutTokenSchema };
