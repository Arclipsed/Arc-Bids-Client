import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      company?: string;
      topic?: string;
      message?: string;
      website?: string; // honeypot
    };

    if (body.website?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const company = body.company?.trim() ?? "";
    const topic = body.topic?.trim() || "General Inquiry";
    const message = body.message?.trim() ?? "";

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please enter a message (at least 10 characters)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ ok: true, devMode: true });
    }

    const resend = new Resend(apiKey);
    const from = process.env.EMAIL_FROM || "ArcBids <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO_EMAIL || "support@arcbids.com";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "—");
    const safeTopic = escapeHtml(topic);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:24px;background-color:#05070c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background-color:#090d14;border:1px solid #1e293b;border-radius:20px;overflow:hidden;">
    <tr>
      <td style="padding:20px 24px;border-bottom:1px solid #151c28;font-size:16px;font-weight:700;color:#ffffff;">
        ArcBids · New Contact Message
      </td>
    </tr>
    <tr>
      <td style="padding:24px;font-size:14px;line-height:1.6;color:#d4d4d8;">
        <p style="margin:0 0 8px 0;"><strong style="color:#ffffff;">Topic:</strong> ${safeTopic}</p>
        <p style="margin:0 0 8px 0;"><strong style="color:#ffffff;">Name:</strong> ${safeName}</p>
        <p style="margin:0 0 8px 0;"><strong style="color:#ffffff;">Email:</strong> ${safeEmail}</p>
        <p style="margin:0 0 18px 0;"><strong style="color:#ffffff;">Company:</strong> ${safeCompany}</p>
        <div style="padding:16px;background-color:#0e1420;border:1px solid rgba(63,242,224,0.25);border-radius:14px;color:#f4f4f5;">
          ${safeMessage}
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[ArcBids Contact] ${topic} — ${name}`,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
      html,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send contact message." },
      { status: 500 }
    );
  }
}
