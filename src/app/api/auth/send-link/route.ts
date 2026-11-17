import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildMagicLinkEmailHtml,
  signMagicLinkToken,
} from "@/lib/email-auth";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    const token = await signMagicLinkToken(email);
    const origin = req.nextUrl.origin;
    const verifyUrl = `${origin}/auth/verify?token=${encodeURIComponent(token)}`;

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      // Dev-friendly fallback when RESEND_API_KEY is not configured yet
      return NextResponse.json({
        ok: true,
        devMode: true,
        devVerifyUrl: verifyUrl,
      });
    }

    const resend = new Resend(apiKey);
    const from = process.env.EMAIL_FROM || "ArcBids <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: "Sign in to ArcBids",
      html: buildMagicLinkEmailHtml(verifyUrl, email),
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send sign-in email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to process sign-in request." },
      { status: 500 }
    );
  }
}
