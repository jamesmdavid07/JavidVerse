import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { commentExists, toggleCommentReaction } from "@/lib/comments";

const VISITOR_COOKIE = "javidverse_reaction_token";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const commentId = Number(id);

  if (!Number.isInteger(commentId) || commentId < 1) {
    return NextResponse.json({ error: "Invalid comment." }, { status: 400 });
  }

  if (!(await commentExists(commentId))) {
    return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  }

  const currentToken = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorToken = currentToken || randomUUID();
  const result = await toggleCommentReaction(commentId, visitorToken);
  const response = NextResponse.json(result);

  if (!currentToken) {
    response.cookies.set(VISITOR_COOKIE, visitorToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return response;
}
