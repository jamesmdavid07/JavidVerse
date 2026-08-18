// GET /api/bible?ref=Psalm+34:18 — proxy to Bible APIs (NIV primary, KJV fallback).
import { NextRequest, NextResponse } from "next/server";

const MIDVASH_BOOK_MAP: Record<string, string> = {
  genesis: "genesis", exodus: "exodus", leviticus: "leviticus", numbers: "numbers",
  deuteronomy: "deuteronomy", joshua: "joshua", judges: "judges", ruth: "ruth",
  "1 samuel": "1samuel", "2 samuel": "2samuel",
  "1 kings": "1kings", "2 kings": "2kings",
  "1 chronicles": "1chronicles", "2 chronicles": "2chronicles",
  ezra: "ezra", nehemiah: "nehemiah", esther: "esther", job: "job",
  psalms: "psalms", psalm: "psalms", proverbs: "proverbs",
  ecclesiastes: "ecclesiastes", "song of Solomon": "songofsolomon",
  isaiah: "isaiah", jeremiah: "jeremiah", lamentations: "lamentations",
  ezekiel: "ezekiel", daniel: "daniel", hosea: "hosea", joel: "joel",
  amos: "amos", obadiah: "obadiah", jonah: "jonah", micah: "micah",
  nahum: "nahum", habakkuk: "habakkuk", zephaniah: "zephaniah",
  haggai: "haggai", zechariah: "zechariah", malachi: "malachi",
  matthew: "matthew", mark: "mark", luke: "luke", john: "john", acts: "acts",
  romans: "romans", "1 corinthians": "1corinthians", "2 corinthians": "2corinthians",
  galatians: "galatians", ephesians: "ephesians", philippians: "philippians",
  colossians: "colossians", "1 thessalonians": "1thessalonians",
  "2 thessalonians": "2thessalonians", "1 timothy": "1timothy",
  "2 timothy": "2timothy", titus: "titus", philemon: "philemon",
  hebrews: "hebrews", james: "james", "1 peter": "1peter", "2 peter": "2peter",
  "1 john": "1john", "2 john": "2john", "3 john": "3john", jude: "jude",
  revelation: "revelation",
};

// Map book names to bible-api.com format (lowercase, no spaces for multi-word books).
const BIBLE_API_BOOK_MAP: Record<string, string> = {
  genesis: "genesis", exodus: "exodus", leviticus: "leviticus", numbers: "numbers",
  deuteronomy: "deuteronomy", joshua: "joshua", judges: "judges", ruth: "ruth",
  "1 samuel": "1samuel", "2 samuel": "2samuel",
  "1 kings": "1kings", "2 kings": "2kings",
  "1 chronicles": "1chronicles", "2 chronicles": "2chronicles",
  ezra: "ezra", nehemiah: "nehemiah", esther: "esther", job: "job",
  psalms: "psalms", psalm: "psalms", proverbs: "proverbs",
  ecclesiastes: "ecclesiastes", "song of Solomon": "songofsolomon",
  isaiah: "isaiah", jeremiah: "jeremiah", lamentations: "lamentations",
  ezekiel: "ezekiel", daniel: "daniel", hosea: "hosea", joel: "joel",
  amos: "amos", obadiah: "obadiah", jonah: "jonah", micah: "micah",
  nahum: "nahum", habakkuk: "habakkuk", zephaniah: "zephaniah",
  haggai: "haggai", zechariah: "zechariah", malachi: "malachi",
  matthew: "matthew", mark: "mark", luke: "luke", john: "john", acts: "acts",
  romans: "romans", "1 corinthians": "1corinthians", "2 corinthians": "2corinthians",
  galatians: "galatians", ephesians: "ephesians", philippians: "philippians",
  colossians: "colossians", "1 thessalonians": "1thessalonians",
  "2 thessalonians": "2thessalonians", "1 timothy": "1timothy",
  "2 timothy": "2timothy", titus: "titus", philemon: "philemon",
  hebrews: "hebrews", james: "james", "1 peter": "1peter", "2 peter": "2peter",
  "1 john": "1john", "2 john": "2john", "3 john": "3john", jude: "jude",
  revelation: "revelation",
};

function parseReference(ref: string): { bookRaw: string; bookKey: string; chapter: string; verse: string } | null {
  const match = ref.trim().match(/^(.+?)\s+(\d+):(\d+(?:\s*[-–]\s*\d+)?)$/);
  if (!match) return null;
  const [, bookRaw, chapter, verse] = match;
  const bookKey = bookRaw.toLowerCase().trim();
  return { bookRaw, bookKey, chapter, verse: verse.replace(/\s/g, "") };
}

async function fetchFromMidvash(bookKey: string, chapter: string, verse: string, ref: string): Promise<{ text: string; reference: string; translation: string } | null> {
  const midvashBook = MIDVASH_BOOK_MAP[bookKey];
  if (!midvashBook) return null;

  try {
    const url = `https://api.midvash.com/v1/niv/${midvashBook}/${chapter}/${verse}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data?.text) return null;
    return {
      text: json.data.text.trim(),
      reference: json.meta?.reference || ref,
      translation: "NIV",
    };
  } catch {
    return null;
  }
}

async function fetchFromBibleApi(bookKey: string, chapter: string, verse: string, ref: string): Promise<{ text: string; reference: string; translation: string } | null> {
  const bibleApiBook = BIBLE_API_BOOK_MAP[bookKey];
  if (!bibleApiBook) return null;

  try {
    const url = `https://bible-api.com/${bibleApiBook}+${chapter}:${verse}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.text) return null;
    return {
      text: json.text.replace(/\n/g, " ").trim(),
      reference: json.reference || ref,
      translation: json.translation_name || "KJV",
    };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "Missing ?ref parameter" }, { status: 400 });
  }

  const parsed = parseReference(ref);
  if (!parsed) {
    return NextResponse.json({ error: `Could not parse reference: ${ref}` }, { status: 400 });
  }

  // Try Midvash (NIV) first, then bible-api.com (KJV) as fallback.
  const midvashResult = await fetchFromMidvash(parsed.bookKey, parsed.chapter, parsed.verse, ref);
  if (midvashResult) {
    return NextResponse.json(midvashResult);
  }

  const fallbackResult = await fetchFromBibleApi(parsed.bookKey, parsed.chapter, parsed.verse, ref);
  if (fallbackResult) {
    return NextResponse.json(fallbackResult);
  }

  return NextResponse.json({ error: "Verse not found" }, { status: 404 });
}
