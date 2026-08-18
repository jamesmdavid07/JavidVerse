// One-time migration: creates the comments table for devotional comments.
// Usage: npx tsx scripts/add-comments-table.ts
// Run from the JavidVerse directory with .env.local configured.

import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), ".env.local") });
import getPool from "../lib/db";

async function migrate() {
  console.log("Creating comments table...");

  const pool = getPool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      devotional_id INT NOT NULL,
      parent_id INT DEFAULT NULL,
      name VARCHAR(100) NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (devotional_id) REFERENCES devotionals(id) ON DELETE CASCADE,
      FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  console.log("Comments table created.");
  await pool.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
