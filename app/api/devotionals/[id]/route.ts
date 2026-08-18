// GET /api/devotionals/[id] — get a devotional by ID (admin).
// PUT /api/devotionals/[id] — update a devotional (admin).
import { NextRequest, NextResponse } from "next/server";
import { getDevotionalById, updateDevotional } from "@/lib/devotionals";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const devotional = await getDevotionalById(Number(id));
  if (!devotional) {
    return NextResponse.json({ error: "Devotional not found" }, { status: 404 });
  }
  return NextResponse.json(devotional);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updated = await updateDevotional(Number(id), body);
  if (!updated) {
    return NextResponse.json({ error: "Devotional not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
