// GET /api/devotionals/[slug] — get a devotional by slug.
// PUT /api/devotionals/[slug] — update a devotional by slug.
import { NextRequest, NextResponse } from "next/server";
import {
  getDevotionalBySlugForAdmin,
  getDevotionalById,
  updateDevotional,
} from "@/lib/devotionals";

const VALID_STATUSES = new Set(["scheduled", "published"]);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Try slug first, then try as numeric ID.
  let devotional = await getDevotionalBySlugForAdmin(slug);
  if (!devotional && /^\d+$/.test(slug)) {
    devotional = await getDevotionalById(Number(slug));
  }

  if (!devotional) {
    return NextResponse.json({ error: "Devotional not found" }, { status: 404 });
  }
  return NextResponse.json(devotional);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();

  // Find the devotional by slug or numeric ID.
  let existing = await getDevotionalBySlugForAdmin(slug);
  if (!existing && /^\d+$/.test(slug)) {
    existing = await getDevotionalById(Number(slug));
  }

  if (!existing) {
    return NextResponse.json({ error: "Devotional not found" }, { status: 404 });
  }

  const update = { ...body };
  if (update.status !== undefined && !VALID_STATUSES.has(update.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // With only scheduled/published states, an unpublish needs a future date.
  if (update.unpublish) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    update.status = "scheduled";
    update.publicationDate = tomorrow.toLocaleDateString("en-CA", { timeZone: "Asia/Manila" });
    delete update.unpublish;
  }

  const updated = await updateDevotional(existing.id, update);
  if (!updated) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
  return NextResponse.json(updated);
}
