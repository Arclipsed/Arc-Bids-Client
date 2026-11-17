import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "arcbids_session";

function getSecretKey(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ||
    "arcbids_fallback_dev_secret_change_before_production";
  return new TextEncoder().encode(secret);
}

export async function signMagicLinkToken(email: string): Promise<string> {
  return new SignJWT({ email, purpose: "magic_link" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecretKey());
}

export async function verifyMagicLinkToken(
  token: string
): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      payload.purpose !== "magic_link" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }
    return { email: payload.email };
  } catch {
    return null;
  }
}

export async function signSessionToken(email: string): Promise<string> {
  return new SignJWT({ email, purpose: "session" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.purpose !== "session" || typeof payload.email !== "string") {
      return null;
    }
    return { email: payload.email };
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME };

export function buildMagicLinkEmailHtml(verifyUrl: string, email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign in to ArcBids</title>
</head>
<body style="margin:0;padding:0;background-color:#05070c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#05070c;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background-color:#090d14;border:1px solid rgba(255,255,255,0.1);border-radius:24px;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 24px 32px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width:36px;height:36px;border-radius:12px;background-color:#0e1420;border:1px solid rgba(63,242,224,0.35);text-align:center;vertical-align:middle;font-weight:700;font-size:15px;color:#e4fffb;">
                    A
                  </td>
                  <td style="padding-left:12px;font-size:18px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">
                    ArcBids
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#3ff2e0;">
                Instant Sign-In
              </p>
              <h1 style="margin:0 0 12px 0;font-size:24px;line-height:1.25;font-weight:700;color:#e4fffb;">
                Sign in to your wholesale desk
              </h1>
              <p style="margin:0 0 28px 0;font-size:14px;line-height:1.6;color:#a1a1aa;">
                Click the button below to securely sign in as <strong style="color:#ffffff;">${email}</strong>. This link expires in 15 minutes.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:9999px;background-color:#e4fffb;">
                    <a href="${verifyUrl}" target="_blank" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#04070b;text-decoration:none;border-radius:9999px;">
                      Sign in to ArcBids &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:28px 0 0 0;font-size:12px;line-height:1.6;color:#71717a;">
                If you didn&apos;t request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background-color:#070a10;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:#71717a;">
              ArcBids · Live B2B Wholesale Auctions · arcbids.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
