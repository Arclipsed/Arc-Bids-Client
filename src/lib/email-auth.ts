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

export function buildMagicLinkEmailText(
  verifyUrl: string,
  email: string,
  code: string
): string {
  return [
    `Your ArcBids verification code is: ${code}`,
    "",
    `Enter this 6-digit code in your browser to sign in as ${email}. It expires in 15 minutes.`,
    "",
    `Or sign in directly with this link:`,
    verifyUrl,
    "",
    `If you didn't request this email, you can safely ignore it.`,
  ].join("\n");
}

export function buildMagicLinkEmailHtml(
  verifyUrl: string,
  email: string,
  code: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <title>${code} is your ArcBids sign-in code</title>
</head>
<body style="margin:0;padding:0;background-color:#05070c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f4f4f5;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    Your ArcBids verification code is ${code}. Expires in 15 minutes.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#05070c;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:460px;background-color:#090d14;border:1px solid #1e293b;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.55);">
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#0f766e 0%,#3ff2e0 50%,#0f766e 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:22px 28px;border-bottom:1px solid #141b26;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;height:32px;border-radius:10px;background-color:#0e1420;border:1px solid rgba(63,242,224,0.35);text-align:center;vertical-align:middle;font-weight:700;font-size:14px;color:#3ff2e0;">
                          A
                        </td>
                        <td style="padding-left:10px;font-size:16px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">
                          ArcBids
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:4px 10px;border-radius:9999px;background-color:rgba(63,242,224,0.08);border:1px solid rgba(63,242,224,0.22);font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#3ff2e0;">
                      Sign-In Code
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 28px 28px 28px;">
              <h1 style="margin:0 0 8px 0;font-size:21px;line-height:1.25;font-weight:700;letter-spacing:-0.015em;color:#ffffff;">
                Sign in to your account
              </h1>
              <p style="margin:0 0 24px 0;font-size:14px;line-height:1.6;color:#9ca3af;">
                Use the verification code below to sign in as <span style="color:#f4f4f5;font-weight:600;text-decoration:none;">${email}</span>. Valid for 15 minutes.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 10px 0;">
                <tr>
                  <td align="center" style="padding:22px 24px;background-color:#0d131f;border:1px solid rgba(63,242,224,0.28);border-radius:18px;">
                    <code style="display:inline-block;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:34px;line-height:1;font-weight:700;letter-spacing:0.2em;color:#e4fffb;-webkit-user-select:all;user-select:all;cursor:text;">${code}</code>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px 0;text-align:center;font-size:12px;color:#71717a;">
                Tap or double-click the code to select all 6 digits.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 22px 0;">
                <tr>
                  <td style="border-top:1px solid #141b26;height:1px;font-size:0;line-height:0;">&nbsp;</td>
                  <td style="padding:0 12px;font-size:11px;font-weight:500;letter-spacing:0.04em;text-transform:uppercase;color:#71717a;white-space:nowrap;">or continue with one click</td>
                  <td style="border-top:1px solid #141b26;height:1px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius:9999px;background-color:#e4fffb;">
                    <a href="${verifyUrl}" target="_blank" style="display:block;padding:13px 24px;font-size:14px;font-weight:700;color:#04070b;text-decoration:none;border-radius:9999px;text-align:center;">
                      Sign in to ArcBids &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0 0;font-size:12px;line-height:1.6;color:#71717a;text-align:center;">
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
