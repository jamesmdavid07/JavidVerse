// Temporary diagnostic endpoint — tests DB connection and returns status.
import { NextResponse } from "next/server";
import getPool from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.execute("SELECT id, slug, title FROM devotionals LIMIT 5");
    return NextResponse.json({
      status: "connected",
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      devotionals: rows,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      status: "error",
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      error: message,
    });
  }
}
