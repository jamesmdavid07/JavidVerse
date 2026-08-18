// GET /api/devotionals/[slug] — get a single published devotional by slug.
import { NextRequest, NextResponse } from "next/server";
import { getDevotionalBySlug } from "@/lib/devotionals";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const devotional = await getDevotionalBySlug(slug);
  if (!devotional) {
    return NextResponse.json({ error: "Devotional not found" }, { status: 404 });
  }
  return NextResponse.json(devotional);
}
