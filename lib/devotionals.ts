// Devotional data access layer — reads and writes MySQL database.
import getPool from "./db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Devotional {
  id: number;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  mainBibleRef: string;
  bibleTranslation: string;
  fullVerse: string;
  content: string;
  reflection: string;
  prayer: string;
  readMoreRefs: string[];
  status: "draft" | "published" | "scheduled";
  createdAt: string;
  updatedAt: string;
}

export interface DevotionalIndexEntry {
  id: number;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  status: "draft" | "published" | "scheduled";
}

// Map a MySQL row to our Devotional interface.
function rowToDevotional(row: RowDataPacket): Devotional {
  const refs = typeof row.read_more_refs === "string"
    ? JSON.parse(row.read_more_refs)
    : row.read_more_refs ?? [];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    author: row.author,
    publicationDate: row.publication_date,
    mainBibleRef: row.main_bible_ref,
    bibleTranslation: row.bible_translation,
    fullVerse: row.full_verse ?? "",
    content: row.content,
    reflection: row.reflection ?? "",
    prayer: row.prayer ?? "",
    readMoreRefs: Array.isArray(refs) ? refs : [],
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Map a MySQL row to our DevotionalIndexEntry interface.
function rowToIndexEntry(row: RowDataPacket): DevotionalIndexEntry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    author: row.author,
    publicationDate: row.publication_date,
    status: row.status,
  };
}

// Return today's calendar date in the timezone used for devotional publishing.
function getPhilippineDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Check if a devotional is currently visible (published or scheduled in the past).
function isVisible(status: string, publicationDate: string): boolean {
  if (status === "published") return true;
  if (status === "scheduled") {
    return publicationDate <= getPhilippineDate();
  }
  return false;
}

// ─── Public API ────────────────────────────────────────────────

// Get all devotionals (for admin).
export async function getAllDevotionals(): Promise<DevotionalIndexEntry[]> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, slug, title, author, publication_date, status FROM devotionals ORDER BY publication_date DESC"
  );
  return rows.map(rowToIndexEntry);
}

// Get all visible (published + past-scheduled) devotionals.
export async function getPublishedDevotionals(): Promise<DevotionalIndexEntry[]> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, slug, title, author, publication_date, status FROM devotionals ORDER BY publication_date DESC"
  );
  return rows
    .map(rowToIndexEntry)
    .filter((e) => isVisible(e.status, e.publicationDate));
}

// Get a single devotional by slug (full data).
export async function getDevotionalBySlug(slug: string): Promise<Devotional | null> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM devotionals WHERE slug = ?",
    [slug]
  );
  if (rows.length === 0) return null;
  const d = rowToDevotional(rows[0]);
  if (!isVisible(d.status, d.publicationDate)) return null;
  return d;
}

// Get a devotional by slug for admin operations, including drafts and future schedules.
export async function getDevotionalBySlugForAdmin(slug: string): Promise<Devotional | null> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM devotionals WHERE slug = ?",
    [slug]
  );
  if (rows.length === 0) return null;
  return rowToDevotional(rows[0]);
}

// Get a single devotional by ID (for admin).
export async function getDevotionalById(id: number): Promise<Devotional | null> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM devotionals WHERE id = ?",
    [id]
  );
  if (rows.length === 0) return null;
  return rowToDevotional(rows[0]);
}

// Get a devotional by exact date (year, month, day).
export async function getDevotionalByExactDate(
  year: number,
  month: number,
  day: number
): Promise<Devotional | null> {
  const pool = getPool();
  const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM devotionals WHERE publication_date = ? AND status IN ('published', 'scheduled')",
    [dateStr]
  );
  if (rows.length === 0) return null;
  const devotional = rowToDevotional(rows[0]);
  return isVisible(devotional.status, devotional.publicationDate) ? devotional : null;
}

// Get the latest published devotional.
export async function getLatestDevotional(): Promise<Devotional | null> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM devotionals WHERE status IN ('published', 'scheduled') ORDER BY publication_date DESC"
  );
  for (const row of rows) {
    const devotional = rowToDevotional(row);
    if (isVisible(devotional.status, devotional.publicationDate)) return devotional;
  }
  return null;
}

// Get previous and next devotionals relative to a slug.
export async function getAdjacentDevotionals(
  slug: string
): Promise<{ prev: DevotionalIndexEntry | null; next: DevotionalIndexEntry | null }> {
  const published = await getPublishedDevotionals();
  const idx = published.findIndex((e) => e.slug === slug);
  return {
    prev: idx > 0 ? published[idx - 1] : null,
    next: idx < published.length - 1 ? published[idx + 1] : null,
  };
}

// Create a new devotional.
export async function createDevotional(
  data: Omit<Devotional, "id" | "slug" | "createdAt" | "updatedAt">
): Promise<Devotional> {
  const pool = getPool();

  // Generate slug from title, ensure uniqueness.
  let slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  let counter = 2;
  while (true) {
    const [existing] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM devotionals WHERE slug = ?",
      [slug]
    );
    if (existing.length === 0) break;
    slug = `${data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${counter}`;
    counter++;
  }

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO devotionals (slug, title, author, publication_date, main_bible_ref, bible_translation, full_verse, content, reflection, prayer, read_more_refs, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      slug,
      data.title,
      data.author,
      data.publicationDate,
      data.mainBibleRef,
      data.bibleTranslation,
      data.fullVerse,
      data.content,
      data.reflection,
      data.prayer,
      JSON.stringify(data.readMoreRefs),
      data.status,
    ]
  );

  return getDevotionalById(result.insertId) as Promise<Devotional>;
}

// Update an existing devotional.
export async function updateDevotional(
  id: number,
  data: Partial<Omit<Devotional, "id" | "createdAt" | "updatedAt">>
): Promise<Devotional | null> {
  const pool = getPool();
  const existing = await getDevotionalById(id);
  if (!existing) return null;

  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (data.title !== undefined) { fields.push("title = ?"); values.push(data.title); }
  if (data.author !== undefined) { fields.push("author = ?"); values.push(data.author); }
  if (data.publicationDate !== undefined) { fields.push("publication_date = ?"); values.push(data.publicationDate); }
  if (data.mainBibleRef !== undefined) { fields.push("main_bible_ref = ?"); values.push(data.mainBibleRef); }
  if (data.bibleTranslation !== undefined) { fields.push("bible_translation = ?"); values.push(data.bibleTranslation); }
  if (data.fullVerse !== undefined) { fields.push("full_verse = ?"); values.push(data.fullVerse); }
  if (data.content !== undefined) { fields.push("content = ?"); values.push(data.content); }
  if (data.reflection !== undefined) { fields.push("reflection = ?"); values.push(data.reflection); }
  if (data.prayer !== undefined) { fields.push("prayer = ?"); values.push(data.prayer); }
  if (data.readMoreRefs !== undefined) { fields.push("read_more_refs = ?"); values.push(JSON.stringify(data.readMoreRefs)); }
  if (data.status !== undefined) { fields.push("status = ?"); values.push(data.status); }
  if (fields.length === 0) return existing;

  values.push(id);
  await pool.execute(`UPDATE devotionals SET ${fields.join(", ")} WHERE id = ?`, values);

  return getDevotionalById(id);
}

// Delete a devotional.
export async function deleteDevotional(id: number): Promise<boolean> {
  const pool = getPool();
  const [result] = await pool.execute<ResultSetHeader>(
    "DELETE FROM devotionals WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

// Publish or unpublish a devotional.
export async function setDevotionalStatus(
  id: number,
  status: "draft" | "published" | "scheduled"
): Promise<Devotional | null> {
  return updateDevotional(id, { status });
}
