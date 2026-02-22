import bcrypt from "bcryptjs";
import db from "../../config/db.js";
import runMigrations from "./runMigrations.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const ensureRolesAndAdmin = async () => {
  // Run migrations first
  await runMigrations();

  // Ensure roles exist
  const [existingRoles] = await db.query(`SELECT id, name FROM roles`);
  const roleNames = existingRoles.map((r) => r.name);

  if (!roleNames.includes("ADMIN") || !roleNames.includes("USER")) {
    // Insert ADMIN first so it gets id 1
    await db.query(`INSERT IGNORE INTO roles (name) VALUES (?), (?)`, ["ADMIN", "USER"]);
    console.log("Seeded roles: ADMIN, USER");
  }

  // Get ADMIN role id
  const [rows] = await db.query(`SELECT id FROM roles WHERE name = ?`, ["ADMIN"]);
  const adminRoleId = rows[0].id;

  // Check if admin user exists
  const [users] = await db.query(`SELECT id FROM users WHERE email = ?`, [ADMIN_EMAIL]);
  if (users.length === 0) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await db.query(
      `INSERT INTO users (name, email, password_hash, role_id, status) VALUES (?, ?, ?, ?, 'ACTIVE')`,
      [ADMIN_NAME, ADMIN_EMAIL, passwordHash, adminRoleId]
    );
    console.log(`Created admin user: ${ADMIN_EMAIL} (role id ${adminRoleId})`);
  } else {
    console.log("Admin user already exists, skipping creation");
  }
};

if (require.main === module) {
  ensureRolesAndAdmin()
    .then(() => {
      console.log("Seeding complete");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });
}

export default ensureRolesAndAdmin;
