// Devotional data access layer — reads and writes JSON files on disk.
import fs from "fs/promises";
import path from "path";
import { slugify } from "./slugify";

const DATA_DIR = path.join(process.cwd(), "data", "devotionals");
const INDEX_PATH = path.join(DATA_DIR, "index.json");

export interface Devotional {
  id: string;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  mainBibleRef: string;
  bibleTranslation: string;
  fullVerse: string;
  content: string;
  readMoreRefs: string[];
  status: "draft" | "published" | "scheduled";
  createdAt: string;
  updatedAt: string;
}

export interface DevotionalIndexEntry {
  id: string;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  status: "draft" | "published" | "scheduled";
}

// Ensure the data directory exists.
async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Read the index file.
async function readIndex(): Promise<DevotionalIndexEntry[]> {
  try {
    const raw = await fs.readFile(INDEX_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Write the index file.
async function writeIndex(entries: DevotionalIndexEntry[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(INDEX_PATH, JSON.stringify(entries, null, 2), "utf-8");
}

// Read a single devotional file.
async function readDevotionalFile(id: string): Promise<Devotional | null> {
  try {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Write a single devotional file.
async function writeDevotionalFile(devotional: Devotional): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${devotional.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(devotional, null, 2), "utf-8");
}

// Delete a single devotional file.
async function deleteDevotionalFile(id: string): Promise<void> {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  try {
    await fs.unlink(filePath);
  } catch {
    // File may not exist — ignore.
  }
}

// Ensure slug uniqueness by appending a number if needed.
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const index = await readIndex();
  let candidate = base;
  let counter = 2;
  while (index.some((e) => e.slug === candidate && e.id !== excludeId)) {
    candidate = `${base}-${counter}`;
    counter++;
  }
  return candidate;
}

// Generate a unique ID.
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Check if a devotional is currently visible (published or scheduled in the past).
function isVisible(status: string, publicationDate: string): boolean {
  if (status === "published") return true;
  if (status === "scheduled") {
    return new Date(publicationDate) <= new Date();
  }
  return false;
}

// ─── Public API ────────────────────────────────────────────────

// Get all devotionals (for admin).
export async function getAllDevotionals(): Promise<DevotionalIndexEntry[]> {
  const index = await readIndex();
  return index.sort(
    (a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  );
}

// Get all visible (published + past-scheduled) devotionals.
export async function getPublishedDevotionals(): Promise<DevotionalIndexEntry[]> {
  const index = await readIndex();
  return index
    .filter((e) => isVisible(e.status, e.publicationDate))
    .sort(
      (a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
    );
}

// Get a single devotional by slug (full data).
export async function getDevotionalBySlug(slug: string): Promise<Devotional | null> {
  const index = await readIndex();
  const entry = index.find((e) => e.slug === slug);
  if (!entry) return null;
  if (!isVisible(entry.status, entry.publicationDate)) return null;
  return readDevotionalFile(entry.id);
}

// Get a single devotional by ID (for admin).
export async function getDevotionalById(id: string): Promise<Devotional | null> {
  return readDevotionalFile(id);
}

// Get a devotional by exact date (year, month, day).
export async function getDevotionalByExactDate(
  year: number,
  month: number,
  day: number
): Promise<Devotional | null> {
  const published = await getPublishedDevotionals();
  const match = published.find((e) => {
    const d = new Date(e.publicationDate);
    return d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day;
  });
  if (!match) return null;
  return readDevotionalFile(match.id);
}

// Get the latest published devotional.
export async function getLatestDevotional(): Promise<Devotional | null> {
  const published = await getPublishedDevotionals();
  if (published.length === 0) return null;
  return readDevotionalFile(published[0].id);
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
  const id = generateId();
  const baseSlug = slugify(data.title);
  const slug = await uniqueSlug(baseSlug);
  const now = new Date().toISOString();

  const devotional: Devotional = {
    ...data,
    id,
    slug,
    createdAt: now,
    updatedAt: now,
  };

  await writeDevotionalFile(devotional);

  const index = await readIndex();
  index.push({
    id,
    slug,
    title: data.title,
    author: data.author,
    publicationDate: data.publicationDate,
    status: data.status,
  });
  await writeIndex(index);

  return devotional;
}

// Update an existing devotional.
export async function updateDevotional(
  id: string,
  data: Partial<Omit<Devotional, "id" | "createdAt" | "updatedAt">>
): Promise<Devotional | null> {
  const existing = await readDevotionalFile(id);
  if (!existing) return null;

  let slug = existing.slug;
  if (data.title && data.title !== existing.title) {
    slug = await uniqueSlug(slugify(data.title), id);
  }

  const updated: Devotional = {
    ...existing,
    ...data,
    slug,
    updatedAt: new Date().toISOString(),
  };

  await writeDevotionalFile(updated);

  const index = await readIndex();
  const idx = index.findIndex((e) => e.id === id);
  if (idx !== -1) {
    index[idx] = {
      id,
      slug: updated.slug,
      title: updated.title,
      author: updated.author,
      publicationDate: updated.publicationDate,
      status: updated.status,
    };
    await writeIndex(index);
  }

  return updated;
}

// Delete a devotional.
export async function deleteDevotional(id: string): Promise<boolean> {
  const existing = await readDevotionalFile(id);
  if (!existing) return false;

  await deleteDevotionalFile(id);

  const index = await readIndex();
  const filtered = index.filter((e) => e.id !== id);
  await writeIndex(filtered);

  return true;
}

// Publish or unpublish a devotional.
export async function setDevotionalStatus(
  id: string,
  status: "draft" | "published" | "scheduled"
): Promise<Devotional | null> {
  return updateDevotional(id, { status });
}
