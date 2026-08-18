// DELETE /api/admin/comments/[id] — delete a comment by ID.
import { NextRequest, NextResponse } from "next/server";
import { deleteComment } from "@/lib/comments";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const commentId = Number(id);

  if (Number.isNaN(commentId) || commentId <= 0) {
    return NextResponse.json(
      { error: "Invalid comment ID." },
      { status: 400 }
    );
  }

  try {
    const deleted = await deleteComment(commentId);
    if (!deleted) {
      return NextResponse.json(
        { error: "Comment not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete comment." },
      { status: 500 }
    );
  }
}
