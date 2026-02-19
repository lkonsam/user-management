import db from "../config/db.js";
import bcrypt from "bcryptjs";

/**
 * ADMIN: Get all users
 */
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT u.id, u.name, u.email, r.name AS role, u.status, u.created_at
       FROM users u
       JOIN roles r ON u.role_id = r.id
       ORDER BY u.id DESC`
    );

    return res.json({ users });
  } catch (error) {
    console.error("Get Users Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * ADMIN: Create a user
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const [existing] = await db.query(`SELECT id FROM users WHERE email=?`, [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // get role_id
    const [roleRow] = await db.query(`SELECT id FROM roles WHERE name=?`, [
      role,
    ]);

    if (roleRow.length === 0) {
      return res.status(400).json({ message: "Role not found in DB" });
    }

    const roleId = roleRow[0].id;

    // hash password securely
    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users(name, email, password_hash, role_id, status)
       VALUES(?,?,?,?, 'ACTIVE')`,
      [name, email, passwordHash, roleId]
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertId,
        name,
        email,
        role,
        status: "ACTIVE",
      },
    });
  } catch (error) {
    console.error("Create User Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * ADMIN: Update user (name, role)
 */
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, role, status } = req.body;

    if (!name && !role && !status) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    let roleId = null;

    if (role) {
      if (!["ADMIN", "USER"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const [roleRow] = await db.query(`SELECT id FROM roles WHERE name=?`, [
        role,
      ]);

      roleId = roleRow[0].id;
    }

    // Build dynamic update
    const fields = [];
    const values = [];

    if (name) {
      fields.push("name=?");
      values.push(name);
    }

    if (roleId) {
      fields.push("role_id=?");
      values.push(roleId);
    }

    if (status) {
      if (!["ACTIVE", "INACTIVE"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      fields.push("status=?");
      values.push(status);
    }

    values.push(userId);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id=?`;

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*
* UPDATE USER STATUS (ACTIVE/INACTIVE) - ADMIN ONLY
*/
export const updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    const [result] = await db.query(
      `UPDATE users SET status=? WHERE id=?`,
      [status, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: `User status updated to ${status}`,
    });
  } catch (error) {
    console.error("Update User Status Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



/**
 * USER: Get profile (self)
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT u.id, u.name, u.email, r.name AS role, u.status, u.created_at
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ profile: rows[0] });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * USER: Update profile (self)
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const [result] = await db.query(
      `UPDATE users SET name=? WHERE id=?`,
      [name, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
