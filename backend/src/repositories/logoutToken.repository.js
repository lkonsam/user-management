import db from "../config/db.js";

export const addRevokedToken = async (token, expiresAt) => {
  const [result] = await db.query(
    `INSERT INTO logout_tokens (token, expires_at) VALUES (?, ?)`,
    [token, expiresAt]
  );

  return result.insertId;
};

export const isTokenRevoked = async (token) => {
  const [rows] = await db.query(
    `SELECT id FROM logout_tokens WHERE token = ? AND expires_at > NOW()`,
    [token]
  );

  return rows.length > 0;
};

export const purgeExpiredTokens = async () => {
  await db.query(`DELETE FROM logout_tokens WHERE expires_at <= NOW()`);
};

export default {
  addRevokedToken,
  isTokenRevoked,
  purgeExpiredTokens,
};
