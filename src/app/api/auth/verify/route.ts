import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  signSessionToken,
  verifyMagicLinkToken,
} from "@/lib/email-auth";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { token?: string };
    const token = body.token?.trim() ?? "";
    if (!token) {
      return NextResponse.json({ error: "Missing token." }, { status: 400 });
    }

    const verified = await verifyMagicLinkToken(token);
    if (!verified) {
      return NextResponse.json(
        { error: "This sign-in link has expired or is invalid." },
        { status: 401 }
      );
    }

    const sessionToken = await signSessionToken(verified.email);
    const res = NextResponse.json({ ok: true, email: verified.email });

    res.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Verification failed." },
      { status: 500 }
    );
  }
}
