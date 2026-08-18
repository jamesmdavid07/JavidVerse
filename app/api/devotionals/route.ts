// GET /api/devotionals — list published devotionals or fetch by exact date.
import { NextRequest, NextResponse } from "next/server";
import { getPublishedDevotionals, getDevotionalByExactDate } from "@/lib/devotionals";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

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

  // Default: list all published devotionals.
  const devotionals = await getPublishedDevotionals();
  return NextResponse.json(devotionals);
}
