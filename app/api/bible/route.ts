// GET /api/bible?ref=Psalm+34:18 — proxy to Midvash Bible API (NIV).
import { NextRequest, NextResponse } from "next/server";

const BOOK_MAP: Record<string, string> = {
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

function parseReference(ref: string): { book: string; chapter: string; verse: string } | null {
  // Match: "1 Corinthians 13:4-7", "Psalm 34:18", "John 3:16"
  const match = ref.trim().match(/^(.+?)\s+(\d+):(\d+(?:\s*[-–]\s*\d+)?)$/);
  if (!match) return null;
  const [, bookRaw, chapter, verse] = match;
  const bookKey = bookRaw.toLowerCase().trim();
  const book = BOOK_MAP[bookKey];
  if (!book) return null;
  return { book, chapter, verse: verse.replace(/\s/g, "") };
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

  try {
    const url = `https://api.midvash.com/v1/niv/${parsed.book}/${parsed.chapter}/${parsed.verse}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Verse not found" }, { status: 404 });
    }
    const json = await res.json();
    return NextResponse.json({
      text: json.data.text,
      reference: json.meta.reference,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch verse" }, { status: 502 });
  }
}
