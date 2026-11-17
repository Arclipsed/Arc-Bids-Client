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

async function hashLoginCode(email: string, code: string): Promise<string> {
  const data = new TextEncoder().encode(`${email}:${code}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signCodeChallengeToken(
  email: string,
  code: string
): Promise<string> {
  const codeHash = await hashLoginCode(email, code);
  return new SignJWT({ email, codeHash, purpose: "login_code" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecretKey());
}

export async function verifyCodeChallengeToken(
  challengeToken: string,
  code: string
): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(challengeToken, getSecretKey());
    if (
      payload.purpose !== "login_code" ||
      typeof payload.email !== "string" ||
      typeof payload.codeHash !== "string"
    ) {
      return null;
    }
    const cleanCode = code.replace(/\s+/g, "");
    const expected = await hashLoginCode(payload.email, cleanCode);
    if (expected !== payload.codeHash) {
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

export function buildMagicLinkEmailHtml(
  verifyUrl: string,
  email: string,
  code: string
): string {
  const formattedCode = `${code.slice(0, 3)} ${code.slice(3)}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign in to ArcBids</title>
</head>
<body style="margin:0;padding:0;background-color:#05070c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#05070c;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background-color:#090d14;border:1px solid rgba(255,255,255,0.1);border-radius:24px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 20px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
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
            <td style="padding:28px;">
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#3ff2e0;">
                Sign-In Verification
              </p>
              <h1 style="margin:0 0 12px 0;font-size:22px;line-height:1.25;font-weight:700;color:#e4fffb;">
                Enter this code in your browser
              </h1>
              <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#a1a1aa;">
                Use the 6-digit code below to sign in as <strong style="color:#ffffff;">${email}</strong> (expires in 15 minutes):
              </p>
              <div style="margin:0 0 24px 0;padding:18px 24px;background-color:#0e1420;border:1px solid rgba(63,242,224,0.3);border-radius:16px;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:32px;font-weight:700;letter-spacing:0.2em;color:#e4fffb;">
                ${formattedCode}
              </div>
              <p style="margin:0 0 16px 0;font-size:13px;color:#a1a1aa;">
                Or click the button below to sign in directly:
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:9999px;background-color:#e4fffb;">
                    <a href="${verifyUrl}" target="_blank" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:700;color:#04070b;text-decoration:none;border-radius:9999px;">
                      Sign in to ArcBids &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0 0;font-size:12px;line-height:1.6;color:#71717a;">
                If you didn&apos;t request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
