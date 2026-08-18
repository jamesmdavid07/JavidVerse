// Migration: add reflection and prayer columns to devotionals table.
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), ".env.local") });
import getPool from "../lib/db";

const DEFAULT_REFLECTION =
  "Today, whatever has changed in your life, bring it before God. You do not need perfect words. You do not need to have it all together. You just need to come. He is close. He is faithful. And He will carry you through.";

const DEFAULT_PRAYER =
  "Lord, help me bring every change, every fear, and every uncertainty to You today. I trust that You are close, faithful, and able to carry me through. In Jesus' name, Amen.";

async function migrate() {
  const pool = getPool();

  console.log("Adding reflection column...");
  await pool.execute(
    `ALTER TABLE devotionals ADD COLUMN reflection TEXT AFTER content`
  ).catch(() => console.log("  reflection column already exists"));

  console.log("Adding prayer column...");
  await pool.execute(
    `ALTER TABLE devotionals ADD COLUMN prayer TEXT AFTER reflection`
  ).catch(() => console.log("  prayer column already exists"));

  console.log("Seeding existing rows with default reflection/prayer...");
  await pool.execute(
    `UPDATE devotionals SET reflection = ?, prayer = ? WHERE reflection IS NULL`,
    [DEFAULT_REFLECTION, DEFAULT_PRAYER]
  );

  console.log("Migration complete.");
  await pool.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
