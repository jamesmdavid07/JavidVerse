// GET /api/admin/me — check if session is valid.
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin-session")?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true, role: session.role });
}
