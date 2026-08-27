// Comment data access layer — reads and writes MySQL database,
// with a git-backed JSON mirror so comments are never lost if the DB dies.
import fs from "fs";
import path from "path";
import getPool from "./db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

const BACKUP_PATH = path.join(process.cwd(), "data", "comments-backup.json");

interface BackupComment {
  id: number;
  devotionalId: number;
  parentId: number | null;
  name: string;
  comment: string;
  createdAt: string;
  reactionCount: number;
}

function readBackup(): BackupComment[] {
  try {
    const raw = fs.readFileSync(BACKUP_PATH, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeBackup(items: BackupComment[]): void {
  try {
    fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true });
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(items, null, 2) + "\n", "utf8");
  } catch {
    /* backup is best-effort only */
  }
}

function mirrorComment(comment: Comment): void {
  const items = readBackup();
  const existing = items.findIndex((c) => c.id === comment.id);
  const record: BackupComment = {
    id: comment.id,
    devotionalId: comment.devotionalId,
    parentId: comment.parentId,
    name: comment.name,
    comment: comment.comment,
    createdAt: comment.createdAt,
    reactionCount: comment.reactionCount,
  };
  if (existing >= 0) items[existing] = record;
  else items.push(record);
  writeBackup(items);
}

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
  try {
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
    const comments = rows.map(rowToComment);
    for (const c of comments) mirrorComment(c);
    return comments;
  } catch {
    // DB unreachable — serve from the git-backed backup so nothing is lost.
    return readBackup()
      .filter((c) => c.devotionalId === devotionalId)
      .map((c) => ({ ...c }));
  }
}

// Get all comments with devotional info (for admin dashboard).
export async function getAllComments(): Promise<CommentWithDevotional[]> {
  try {
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
    const result = rows.map((row) => ({
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
    for (const c of result) {
      mirrorComment({
        id: c.id,
        devotionalId: c.devotionalId,
        parentId: c.parentId,
        name: c.name,
        comment: c.comment,
        createdAt: c.createdAt,
        reactionCount: c.reactionCount,
      });
    }
    return result;
  } catch {
    // DB unreachable — serve from the git-backed backup.
    return readBackup().map((c) => ({
      ...c,
      devotionalTitle: "",
      devotionalSlug: "",
    }));
  }
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
  const created: Comment = rowToComment(rows[0]);
  // Mirror to git-backed backup for durability.
  try {
    const items = readBackup();
    items.push({
      id: created.id,
      devotionalId: created.devotionalId,
      parentId: created.parentId,
      name: created.name,
      comment: created.comment,
      createdAt: created.createdAt,
      reactionCount: created.reactionCount,
    });
    writeBackup(items);
  } catch {
    /* best-effort */
  }
  return created;
}

export async function toggleCommentReaction(
  commentId: number,
  visitorToken: string
): Promise<{ reacted: boolean; reactionCount: number }> {
  try {
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
  } catch {
    // DB unreachable — keep the backup unchanged so the comment isn't lost.
    const items = readBackup();
    const idx = items.findIndex((c) => c.id === commentId);
    if (idx < 0) {
      return { reacted: false, reactionCount: 0 };
    }
    return { reacted: false, reactionCount: items[idx].reactionCount };
  }
}

export async function commentExists(commentId: number): Promise<boolean> {
  try {
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM comments WHERE id = ?",
      [commentId]
    );
    return rows.length > 0;
  } catch {
    return readBackup().some((c) => c.id === commentId);
  }
}

// Delete a comment by ID (cascades to replies via FK).
export async function deleteComment(id: number): Promise<boolean> {
  try {
    const pool = getPool();
    const [result] = await pool.execute<ResultSetHeader>(
      "DELETE FROM comments WHERE id = ?",
      [id]
    );
    const deleted = result.affectedRows > 0;
    if (deleted) {
      writeBackup(readBackup().filter((c) => c.id !== id));
    }
    return deleted;
  } catch {
    const items = readBackup();
    const before = items.length;
    writeBackup(items.filter((c) => c.id !== id));
    return items.length !== before;
  }
}
