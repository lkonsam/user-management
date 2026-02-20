import db from "../config/db.js";

/**
 * 📘 User Table Schema Definition (Reference Only)
 */
// export const UserSchema = {
//   tableName: "users",
//   fields: {
//     id: "INT PRIMARY KEY AUTO_INCREMENT",
//     name: "VARCHAR(100) NOT NULL",
//     email: "VARCHAR(150) NOT NULL UNIQUE",
//     password_hash: "VARCHAR(255) NOT NULL",
//     role_id: "INT NOT NULL",
//     status: "ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE'",
//     created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
//     updated_at:
//       "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
//   },
//   relationships: {
//     role: "FOREIGN KEY (role_id) REFERENCES roles(id)",
//   },
// };



/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, u.password_hash, u.status, r.name AS role
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.email = ?`,
    [email]
  );

  return rows[0] || null;
};

/**
 * Find user by ID
 */
export const findUserById = async (id) => {
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, r.name AS role, u.status, u.created_at
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.id = ?`,
    [id]
  );

  return rows[0] || null;
};

/**
 * Create user
 */
export const createUser = async (name, email, passwordHash, roleId) => {
  const [result] = await db.query(
    `INSERT INTO users (name, email, password_hash, role_id, status)
     VALUES (?, ?, ?, ?, 'ACTIVE')`,
    [name, email, passwordHash, roleId]
  );

  return result.insertId;
};

/**
 * Update user
 */
export const updateUser = async (id, fields, values) => {
  const query = `UPDATE users SET ${fields.join(", ")} WHERE id=?`;
  const [result] = await db.query(query, [...values, id]);

  return result;
};

/**
 * Update user status
 */
export const updateUserStatus = async (id, status) => {
  const [result] = await db.query(
    `UPDATE users SET status=? WHERE id=?`,
    [status, id]
  );

  return result;
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, r.name AS role, u.status, u.created_at
     FROM users u
     JOIN roles r ON u.role_id = r.id
     ORDER BY u.id DESC`
  );

  return rows;
};