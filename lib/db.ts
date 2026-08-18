// MySQL connection pool (lazy — created on first use so env vars are set).
import mysql from "mysql2/promise";

let _pool: mysql.Pool | null = null;

export default function getPool(): mysql.Pool {
  if (!_pool) {
    _pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return _pool;
}
