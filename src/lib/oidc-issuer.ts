import {
  SignJWT,
  calculateJwkThumbprint,
  importJWK,
  type JWK,
} from "jose";

function getPrivateJwk(): JWK | null {
  const raw = process.env.OIDC_PRIVATE_KEY_JWK?.trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as JWK;
  } catch {
    return null;
  }
}

export function isOidcIssuerConfigured(): boolean {
  return getPrivateJwk() !== null;
}

export async function getPublicJwks(): Promise<{ keys: JWK[] }> {
  const priv = getPrivateJwk();
  if (!priv) {
    return { keys: [] };
  }

  const publicJwk: JWK = {
    kty: priv.kty,
    n: priv.n,
    e: priv.e,
    alg: "RS256",
    use: "sig",
  };
  publicJwk.kid = priv.kid || (await calculateJwkThumbprint(publicJwk));

  return { keys: [publicJwk] };
}

export async function signSpacetimeIdToken(
  email: string,
  issuer: string
): Promise<string | null> {
  const priv = getPrivateJwk();
  if (!priv) return null;

  const { keys } = await getPublicJwks();
  const kid = keys[0]?.kid;
  const key = await importJWK(priv, "RS256");
  const normalizedEmail = email.trim().toLowerCase();

  return new SignJWT({
    email: normalizedEmail,
    email_verified: true,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT", ...(kid ? { kid } : {}) })
    .setIssuer(issuer)
    .setSubject(normalizedEmail)
    .setAudience("arcbids")
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(key);
}
