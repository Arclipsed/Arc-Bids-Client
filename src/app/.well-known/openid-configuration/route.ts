import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const origin =
    process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "") ||
    req.nextUrl.origin;

  return NextResponse.json(
    {
      issuer: origin,
      jwks_uri: `${origin}/.well-known/jwks.json`,
      id_token_signing_alg_values_supported: ["RS256"],
      subject_types_supported: ["public"],
      response_types_supported: ["id_token"],
      claims_supported: ["sub", "email", "email_verified"],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
