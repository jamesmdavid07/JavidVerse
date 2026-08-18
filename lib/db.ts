// MySQL connection pool (lazy — created on first use so env vars are set).
import mysql from "mysql2/promise";

let _pool: mysql.Pool | null = null;

export default function getPool(): mysql.Pool {
  if (!_pool) {
    // Force IPv4 when host is localhost (::1 is IPv6 and MySQL may reject it).
    const host = process.env.DB_HOST || "localhost";
    const resolvedHost = host === "localhost" ? "127.0.0.1" : host;

    _pool = mysql.createPool({
      host: resolvedHost,
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: { rejectUnauthorized: false },
    });
  }
  return _pool;
}
