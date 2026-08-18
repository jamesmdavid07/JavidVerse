// GET /api/admin/comments — list all comments (for admin dashboard).
import { NextResponse } from "next/server";
import { getAllComments } from "@/lib/comments";

export async function GET() {
  try {
    const comments = await getAllComments();
    return NextResponse.json(comments);
  } catch {
    return NextResponse.json(
      { error: "Failed to load comments." },
      { status: 500 }
    );
  }
}
