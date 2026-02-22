import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runMigrations = async () => {
  const migrationsDir = path.resolve(__dirname, "../../migrations");
  const files = await fs.readdir(migrationsDir);

  // Only .sql files, sorted
  const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort();

  for (const file of sqlFiles) {
    const full = path.join(migrationsDir, file);
    const content = await fs.readFile(full, "utf-8");

    // Split into statements by semicolon, execute each (skip empty)
    const statements = content
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await db.query(stmt);
    }
    console.log(`Applied migration: ${file}`);
  }
};

if (process.argv[1].endsWith("runMigrations.js")) {
  runMigrations()
    .then(() => {
      console.log("All migrations applied");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}

export default runMigrations;
