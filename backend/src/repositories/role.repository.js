import db from "../config/db.js";

/**
 * 📘 Role Table Schema Definition
 */
export const RoleSchema = {
  tableName: "roles",
  fields: {
    id: "INT PRIMARY KEY AUTO_INCREMENT",
    name: "VARCHAR(20) NOT NULL UNIQUE",
  },
};

export const findRoleByName = async (roleName) => {
  const [rows] = await db.query(
    `SELECT id FROM roles WHERE name=?`,
    [roleName]
  );

  return rows[0] || null;
};