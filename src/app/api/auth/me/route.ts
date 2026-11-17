import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ email: null }, { status: 200 });
  }
  const session = await verifySessionToken(token);
  return NextResponse.json({ email: session?.email ?? null }, { status: 200 });
}
