// One-time migration: creates the per-visitor comment reactions table.
// Usage: npx tsx scripts/add-comment-reactions-table.ts

import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), ".env.local") });
import getPool from "../lib/db";

async function migrate() {
  const pool = getPool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS comment_reactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      comment_id INT NOT NULL,
      visitor_token VARCHAR(64) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY unique_comment_visitor (comment_id, visitor_token),
      FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log("Comment reactions table created.");
  await pool.end();
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
