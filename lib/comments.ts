// Comment data access layer — reads and writes MySQL database.
import getPool from "./db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Comment {
  id: number;
  devotionalId: number;
  parentId: number | null;
  name: string;
  comment: string;
  createdAt: string;
}

export interface CommentWithDevotional extends Comment {
  devotionalTitle: string;
  devotionalSlug: string;
}

interface CommentWithDevotionalRow extends RowDataPacket {
  id: number;
  devotional_id: number;
  parent_id: number | null;
  name: string;
  comment: string;
  created_at: string;
  devotional_title: string;
  devotional_slug: string;
}

function rowToComment(row: RowDataPacket): Comment {
  return {
    id: row.id,
    devotionalId: row.devotional_id,
    parentId: row.parent_id ?? null,
    name: row.name,
    comment: row.comment,
    createdAt: row.created_at,
  };
}

// Get all comments for a devotional (with replies nested in memory).
export async function getCommentsByDevotionalId(
  devotionalId: number
): Promise<Comment[]> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM comments WHERE devotional_id = ? ORDER BY created_at DESC",
    [devotionalId]
  );
  return rows.map(rowToComment);
}

// Get all comments with devotional info (for admin dashboard).
export async function getAllComments(): Promise<CommentWithDevotional[]> {
  const pool = getPool();
  const [rows] = await pool.query<CommentWithDevotionalRow[]>(
    `SELECT c.*, d.title AS devotional_title, d.slug AS devotional_slug
     FROM comments c
     JOIN devotionals d ON c.devotional_id = d.id
     ORDER BY c.created_at DESC`
  );
  return rows.map((row) => ({
    id: row.id,
    devotionalId: row.devotional_id,
    parentId: row.parent_id ?? null,
    name: row.name,
    comment: row.comment,
    createdAt: row.created_at,
    devotionalTitle: row.devotional_title,
    devotionalSlug: row.devotional_slug,
  }));
}

// Create a new comment.
export async function createComment(
  devotionalId: number,
  parentId: number | null,
  name: string,
  comment: string
): Promise<Comment> {
  const pool = getPool();
  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO comments (devotional_id, parent_id, name, comment) VALUES (?, ?, ?, ?)",
    [devotionalId, parentId, name, comment]
  );
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM comments WHERE id = ?",
    [result.insertId]
  );
  return rowToComment(rows[0]);
}

// Delete a comment by ID (cascades to replies via FK).
export async function deleteComment(id: number): Promise<boolean> {
  const pool = getPool();
  const [result] = await pool.execute<ResultSetHeader>(
    "DELETE FROM comments WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
