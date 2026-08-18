// GET /api/devotionals — list devotionals, fetch by date, or create new.
import { NextRequest, NextResponse } from "next/server";
import {
  getPublishedDevotionals,
  getAllDevotionals,
  getDevotionalByExactDate,
  createDevotional,
} from "@/lib/devotionals";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  const allParam = searchParams.get("all");

  // Fetch devotional for a specific YYYY-MM-DD date.
  if (dateParam) {
    const match = dateParam.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD." }, { status: 400 });
    }

    const [, year, month, day] = match;
    const devotional = await getDevotionalByExactDate(
      Number(year),
      Number(month),
      Number(day)
    );
    if (!devotional) {
      return NextResponse.json(null);
    }
    return NextResponse.json(devotional);
  }

  // ?all=true returns every devotional (for admin dashboard).
  if (allParam === "true") {
    const all = await getAllDevotionals();
    return NextResponse.json(all);
  }

  // Default: list all published devotionals.
  const devotionals = await getPublishedDevotionals();
  return NextResponse.json(devotionals);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || !body.publicationDate || !body.mainBibleRef || !body.content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const devotional = await createDevotional({
    title: body.title,
    author: body.author || "Written by James M. David",
    publicationDate: body.publicationDate,
    mainBibleRef: body.mainBibleRef,
    bibleTranslation: body.bibleTranslation || "NIV",
    fullVerse: body.fullVerse || "",
    content: body.content,
    readMoreRefs: body.readMoreRefs || [],
    status: body.status || "draft",
  });

  return NextResponse.json(devotional, { status: 201 });
}
