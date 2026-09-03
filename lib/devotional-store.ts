// Devotional content store — JSON file as the durable source of truth (committed to git),
// mirrored to MySQL for the live site. This guarantees content is never lost even if the
// hosting account / database is deleted, because the JSON lives in the repo.

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import getPool from "./db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export type DevotionalStatus = "scheduled" | "published";

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
  status: DevotionalStatus;
  createdAt?: string;
  updatedAt?: string;
}

// Path to the source-of-truth file (relative to repo root).
const STORE_PATH = path.join(
  process.cwd(),
  "data",
  "devotionals",
  "devotionals.json"
);

function readStore(): Devotional[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    const data = JSON.parse(raw);
    const arr: Devotional[] = Array.isArray(data) ? data : [];
    // Assign deterministic ids (1-based by date order) so ids stay stable
    // and match MySQL auto-increment order for comment linking.
    return [...arr]
      .sort((a, b) => (a.publicationDate || "").localeCompare(b.publicationDate || ""))
      .map((item, i) => ({ ...item, id: item.id && item.id > 0 ? item.id : i + 1 }));
  } catch {
    return [];
  }
}

function writeStore(items: Devotional[]): void {
  const dir = path.dirname(STORE_PATH);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2) + "\n", "utf8");
  // Auto-save new content to git (sync, dev-only) so new devotionals are never
  // lost even if the database/hosting is deleted.
  autoCommit();
}

// Commit + push the content source-of-truth files to git after each write.
// Runs synchronously so it always completes before the request is torn down.
// Only enabled outside production (local dev, where the repo has push access);
// on a host server the repo is read-only and this is skipped.
let autoCommitRunning = false;
function autoCommit(): void {
  if (process.env.NODE_ENV === "production") return;
  if (autoCommitRunning) return;
  autoCommitRunning = true;
  try {
    const root = process.cwd();
    // Ensure both backup files exist so git add never fails (fresh clones have no comments yet)
    try {
      const devPath = path.join(root, "data", "devotionals", "devotionals.json");
      const cmtPath = path.join(root, "data", "comments-backup.json");
      if (!fs.existsSync(devPath)) {
        fs.mkdirSync(path.dirname(devPath), { recursive: true });
        fs.writeFileSync(devPath, "[]\n", "utf8");
      }
      if (!fs.existsSync(cmtPath)) {
        fs.mkdirSync(path.dirname(cmtPath), { recursive: true });
        fs.writeFileSync(cmtPath, "[]\n", "utf8");
      }
    } catch {}
    execSync("git add data/devotionals/devotionals.json data/comments-backup.json", {
      cwd: root,
      timeout: 15_000,
      stdio: "ignore",
    });
    // git diff --cached --quiet exits 0 when there is nothing to commit.
    let hasChanges = false;
    try {
      execSync("git diff --cached --quiet", { cwd: root, stdio: "ignore" });
    } catch {
      hasChanges = true;
    }
    if (!hasChanges) return;
    execSync(
      'git commit -m "chore: auto-backup devotional content [skip ci]"',
      { cwd: root, stdio: "ignore" }
    );
    execSync("git push origin HEAD", {
      cwd: root,
      timeout: 30_000,
      stdio: "ignore",
    });
  } catch {
    // best-effort only — never break the write
  } finally {
    autoCommitRunning = false;
  }
}

function getPhilippineDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function isVisible(status: string, publicationDate: string): boolean {
  if (status === "published") return true;
  if (status === "scheduled") return publicationDate <= getPhilippineDate();
  return false;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Unique slug generation across the store.
function ensureUniqueSlug(items: Devotional[], base: string): string {
  const used = new Set(items.map((d) => d.slug));
  if (!used.has(base)) return base;
  let counter = 2;
  while (used.has(`${base}-${counter}`)) counter++;
  return `${base}-${counter}`;
}

// Normalize a raw object into a Devotional (id defaults to 0 for new records).
function normalize(item: Partial<Devotional>): Devotional {
  return {
    id: item.id ?? 0,
    slug: item.slug ?? "",
    title: item.title ?? "",
    author: item.author || "Written by James David",
    publicationDate: item.publicationDate ?? "",
    mainBibleRef: item.mainBibleRef ?? "",
    bibleTranslation: item.bibleTranslation || "NIV",
    fullVerse: item.fullVerse || "",
    content: item.content ?? "",
    reflection: item.reflection || "",
    prayer: item.prayer || "",
    readMoreRefs: Array.isArray(item.readMoreRefs) ? item.readMoreRefs : [],
    status: item.status === "scheduled" ? "scheduled" : "published",
  };
}

// ─── Mirror to MySQL ───────────────────────────────────────────────
// Best-effort: never throw if the DB is unreachable (the JSON store is authoritative).

async function upsertMySql(d: Devotional): Promise<void> {
  try {
    const pool = getPool();
    const [existing] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM devotionals WHERE slug = ?",
      [d.slug]
    );
    if (existing.length === 0) {
      await pool.execute<ResultSetHeader>(
        `INSERT INTO devotionals (slug, title, author, publication_date, main_bible_ref, bible_translation, full_verse, content, reflection, prayer, read_more_refs, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          d.slug,
          d.title,
          d.author,
          d.publicationDate,
          d.mainBibleRef,
          d.bibleTranslation,
          d.fullVerse,
          d.content,
          d.reflection,
          d.prayer,
          JSON.stringify(d.readMoreRefs),
          d.status,
        ]
      );
    } else {
      await pool.execute<ResultSetHeader>(
        `UPDATE devotionals SET title = ?, author = ?, publication_date = ?, main_bible_ref = ?, bible_translation = ?, full_verse = ?, content = ?, reflection = ?, prayer = ?, read_more_refs = ?, status = ? WHERE id = ?`,
        [
          d.title,
          d.author,
          d.publicationDate,
          d.mainBibleRef,
          d.bibleTranslation,
          d.fullVerse,
          d.content,
          d.reflection,
          d.prayer,
          JSON.stringify(d.readMoreRefs),
          d.status,
          existing[0].id,
        ]
      );
    }
  } catch (err) {
    console.error("MySQL sync skipped (DB unreachable?)", err instanceof Error ? err.message : err);
  }
}

async function deleteMySql(slug: string): Promise<void> {
  try {
    const pool = getPool();
    await pool.execute("DELETE FROM devotionals WHERE slug = ?", [slug]);
  } catch (err) {
    console.error("MySQL delete skipped (DB unreachable?)", err instanceof Error ? err.message : err);
  }
}

// Read all devotionals from MySQL (operational store) as full Devotional objects.
// Returns null if the DB is unreachable, so callers can fall back to the JSON store.
// Uses a short cooldown after a failure to avoid slow timeouts on every request.
const DB_RETRY_MS = 30_000;
let dbDownUntil = 0;

async function readAllFromMySql(): Promise<Devotional[] | null> {
  if (Date.now() < dbDownUntil) return null; // cooldown: skip DB, use JSON fallback
  try {
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM devotionals ORDER BY publication_date ASC"
    );
    if (!Array.isArray(rows)) return null;
    dbDownUntil = 0; // DB reachable again — clear cooldown
    return rows.map((row) =>
      normalize({
        id: Number(row.id),
        slug: row.slug,
        title: row.title,
        author: row.author,
        publicationDate: row.publication_date,
        mainBibleRef: row.main_bible_ref,
        bibleTranslation: row.bible_translation,
        fullVerse: row.full_verse,
        content: row.content,
        reflection: row.reflection,
        prayer: row.prayer,
        readMoreRefs: (() => {
          try {
            const parsed = row.read_more_refs ? JSON.parse(row.read_more_refs) : [];
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })(),
        status: row.status,
      })
    );
  } catch (err) {
    console.error("MySQL read failed (falling back to JSON store)", err instanceof Error ? err.message : err);
    dbDownUntil = Date.now() + DB_RETRY_MS; // enter cooldown
    return null;
  }
}

// ─── Public API (mirrors lib/devotionals.ts) ─────────────────────

// Prefer the MySQL operational store; fall back to the git-backed JSON store.
async function readAll(): Promise<Devotional[]> {
  const fromDb = await readAllFromMySql();
  if (fromDb && fromDb.length > 0) return fromDb;
  return readStore();
}

export async function getAllDevotionals(): Promise<DevotionalIndexEntry[]> {
  const items = (await readAll()).map((d) => ({
    id: d.id,
    slug: d.slug,
    title: d.title,
    author: d.author,
    publicationDate: d.publicationDate,
    status: (d.status === "published" ||
      (d.status === "scheduled" && d.publicationDate <= getPhilippineDate())
      ? "published" : "scheduled") as DevotionalStatus,
  }));
  return items.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
}

export interface DevotionalIndexEntry {
  id: number;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  status: DevotionalStatus;
}

export async function getPublishedDevotionals(): Promise<DevotionalIndexEntry[]> {
  const all = await getAllDevotionals();
  return all.filter((e) => isVisible(e.status, e.publicationDate));
}

export async function getDevotionalBySlug(slug: string): Promise<Devotional | null> {
  const all = await readAll();
  const d = all.find((x) => x.slug === slug);
  if (!d) return null;
  if (!isVisible(d.status, d.publicationDate)) return null;
  return { ...d, id: Number(d.id) };
}

export async function getDevotionalBySlugForAdmin(slug: string): Promise<Devotional | null> {
  const all = await readAll();
  const d = all.find((x) => x.slug === slug);
  return d ? { ...d, id: Number(d.id) } : null;
}

export async function getDevotionalById(id: number): Promise<Devotional | null> {
  const all = await readAll();
  const d = all.find((x) => Number(x.id) === id);
  return d ? { ...d, id: Number(d.id) } : null;
}

export async function getDevotionalByExactDate(
  year: number,
  month: number,
  day: number
): Promise<Devotional | null> {
  const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const all = await readAll();
  const d = all.find((x) => x.publicationDate === dateStr);
  if (!d) return null;
  return isVisible(d.status, d.publicationDate) ? { ...d, id: Number(d.id) } : null;
}

export async function getLatestDevotional(): Promise<Devotional | null> {
  const candidates = (await readAll())
    .filter(
      (d) =>
        d.status === "published" ||
        (d.status === "scheduled" && d.publicationDate <= getPhilippineDate())
    )
    .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
  for (const d of candidates) {
    if (isVisible(d.status, d.publicationDate)) return { ...d, id: Number(d.id) };
  }
  return null;
}

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

export async function createDevotional(
  data: Omit<Devotional, "id" | "slug" | "createdAt" | "updatedAt">
): Promise<Devotional> {
  const items = readStore();
  const base = slugify(data.title) || "devotional";
  const slug = ensureUniqueSlug(items, base);
  const devotional = normalize({ ...data, slug });
  const id = items.length ? Math.max(...items.map((d) => d.id || 0)) + 1 : 1;
  const withId = { ...devotional, id };
  items.push(withId);
  writeStore(items);
  await upsertMySql(withId);
  const created = readStore().find((x) => x.slug === slug);
  return created ?? withId;
}

export async function updateDevotional(
  id: number,
  data: Partial<Omit<Devotional, "id" | "createdAt" | "updatedAt">>
): Promise<Devotional | null> {
  const items = readStore();
  const idx = items.findIndex((x) => x.id === id);
  if (idx < 0) return null;

  const updated: Devotional = {
    ...items[idx],
    ...data,
    id,
    slug: data.slug || items[idx].slug,
  };
  items[idx] = updated;
  writeStore(items);
  await upsertMySql(updated);
  return getDevotionalById(id);
}

export async function deleteDevotional(id: number): Promise<boolean> {
  const items = readStore();
  const idx = items.findIndex((x) => x.id === id);
  if (idx < 0) return false;
  const [removed] = items.splice(idx, 1);
  writeStore(items);
  await deleteMySql(removed.slug);
  return true;
}

export async function setDevotionalStatus(
  id: number,
  status: DevotionalStatus
): Promise<Devotional | null> {
  return updateDevotional(id, { status });
}

// Ensure a devotional's content exists in the JSON store (used to bootstrap MySQL from JSON).
export function seedStoreFromJson(): Devotional[] {
  return readStore();
}
