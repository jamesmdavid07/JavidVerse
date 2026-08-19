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
  reactionCount: number;
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
  reaction_count: number;
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
    reactionCount: Number(row.reaction_count ?? 0),
  };
}

// Get all comments for a devotional (with replies nested in memory).
export async function getCommentsByDevotionalId(
  devotionalId: number
): Promise<Comment[]> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT c.*, COUNT(cr.id) AS reaction_count
     FROM comments c
     LEFT JOIN comment_reactions cr ON cr.comment_id = c.id
     WHERE c.devotional_id = ?
     GROUP BY c.id
     ORDER BY c.created_at DESC`,
    [devotionalId]
  );
  return rows.map(rowToComment);
}

// Get all comments with devotional info (for admin dashboard).
export async function getAllComments(): Promise<CommentWithDevotional[]> {
  const pool = getPool();
  const [rows] = await pool.query<CommentWithDevotionalRow[]>(
    `SELECT c.*, COUNT(cr.id) AS reaction_count,
            d.title AS devotional_title, d.slug AS devotional_slug
     FROM comments c
     LEFT JOIN comment_reactions cr ON cr.comment_id = c.id
     JOIN devotionals d ON c.devotional_id = d.id
     GROUP BY c.id, d.title, d.slug
     ORDER BY c.created_at DESC`
  );
  return rows.map((row) => ({
    id: row.id,
    devotionalId: row.devotional_id,
    parentId: row.parent_id ?? null,
    name: row.name,
    comment: row.comment,
    createdAt: row.created_at,
    reactionCount: Number(row.reaction_count ?? 0),
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
    `SELECT c.*, COUNT(cr.id) AS reaction_count
     FROM comments c
     LEFT JOIN comment_reactions cr ON cr.comment_id = c.id
     WHERE c.id = ?
     GROUP BY c.id`,
    [result.insertId]
  );
  return rowToComment(rows[0]);
}

export async function toggleCommentReaction(
  commentId: number,
  visitorToken: string
): Promise<{ reacted: boolean; reactionCount: number }> {
  const pool = getPool();
  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM comment_reactions WHERE comment_id = ? AND visitor_token = ?",
    [commentId, visitorToken]
  );

  if (existing.length > 0) {
    await pool.execute("DELETE FROM comment_reactions WHERE id = ?", [existing[0].id]);
  } else {
    await pool.execute(
      "INSERT INTO comment_reactions (comment_id, visitor_token) VALUES (?, ?)",
      [commentId, visitorToken]
    );
  }

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS reaction_count FROM comment_reactions WHERE comment_id = ?",
    [commentId]
  );
  return {
    reacted: existing.length === 0,
    reactionCount: Number(rows[0]?.reaction_count ?? 0),
  };
}

export async function commentExists(commentId: number): Promise<boolean> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM comments WHERE id = ?",
    [commentId]
  );
  return rows.length > 0;
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
