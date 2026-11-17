import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  signSessionToken,
  verifyCodeChallengeToken,
  verifyMagicLinkToken,
} from "@/lib/email-auth";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      token?: string;
      challengeToken?: string;
      code?: string;
    };
    const token = body.token?.trim() ?? "";
    const challengeToken = body.challengeToken?.trim() ?? "";
    const code = body.code?.trim() ?? "";

    const verified = token
      ? await verifyMagicLinkToken(token)
      : challengeToken && code
        ? await verifyCodeChallengeToken(challengeToken, code)
        : null;

    if (!verified) {
      return NextResponse.json(
        { error: "This sign-in code or link has expired or is invalid." },
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
