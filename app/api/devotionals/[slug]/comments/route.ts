// GET /api/devotionals/[slug]/comments — fetch comments for a devotional.
// POST /api/devotionals/[slug]/comments — create a new comment.
import { NextRequest, NextResponse } from "next/server";
import { getDevotionalBySlug } from "@/lib/devotional-store";
import {
  getCommentsByDevotionalId,
  createComment,
} from "@/lib/comments";

const MAX_NAME_LENGTH = 100;
const MAX_COMMENT_LENGTH = 2000;
const MAX_WORDS = 50;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX) return true;
  current.count += 1;
  return false;
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function cleanInput(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeComment(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function countWords(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}

function jsonResponse(message: string, status: number, success = false) {
  return NextResponse.json({ success, message }, { status });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let devotional;
  try {
    devotional = await getDevotionalBySlug(slug);
  } catch {
    return NextResponse.json({ error: "Failed to load comments." }, { status: 500 });
  }

  if (!devotional) {
    return NextResponse.json({ error: "Devotional not found." }, { status: 404 });
  }

  let comments;
  try {
    comments = await getCommentsByDevotionalId(devotional.id);
  } catch {
    return NextResponse.json({ error: "Failed to load comments." }, { status: 500 });
  }

  return NextResponse.json(comments);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return jsonResponse(
      "Too many comments. Please wait a few minutes and try again.",
      429
    );
  }

  let devotional;
  try {
    devotional = await getDevotionalBySlug(slug);
  } catch {
    return jsonResponse("Something went wrong. Please try again.", 500);
  }

  if (!devotional) {
    return jsonResponse("Devotional not found.", 404);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse("Invalid request. Please refresh and try again.", 400);
  }

  if (!payload || typeof payload !== "object") {
    return jsonResponse("Invalid request.", 400);
  }

  const data = payload as Record<string, unknown>;
  const rawName = getString(data.name);
  const rawComment = getString(data.comment);
  const rawParentId = data.parentId;
  const honeypot = cleanInput(getString(data.website), 200);

  if (honeypot) {
    return NextResponse.json({ success: true, message: "Comment posted." });
  }

  if (rawName.length > MAX_NAME_LENGTH) {
    return jsonResponse("Name is too long. Please keep it under 100 characters.", 400);
  }

  if (rawComment.length > MAX_COMMENT_LENGTH) {
    return jsonResponse("Comment is too long. Please keep it under 2000 characters.", 400);
  }

  const name = cleanInput(rawName, MAX_NAME_LENGTH);
  const comment = sanitizeComment(rawComment).slice(0, MAX_COMMENT_LENGTH);

  if (!name) {
    return jsonResponse("Please enter your name.", 400);
  }

  if (!comment) {
    return jsonResponse("Please enter a comment.", 400);
  }

  if (countWords(comment) > MAX_WORDS) {
    return jsonResponse("Comment must be 50 words or fewer.", 400);
  }

  let parentId: number | null = null;
  if (rawParentId !== null && rawParentId !== undefined) {
    const parsed = Number(rawParentId);
    if (!Number.isNaN(parsed) && parsed > 0) {
      parentId = parsed;
    }
  }

  let newComment;
  try {
    newComment = await createComment(devotional.id, parentId, name, comment);
  } catch {
    return jsonResponse("Failed to post comment. Please try again.", 500);
  }

  return NextResponse.json(newComment, { status: 201 });
}
