import { getAuthCookieName, requestFirstMatch } from "@/lib/server/backend";
import type { UserSession } from "@/lib/mock";

export interface AuthResult {
  token: string;
  user: UserSession;
}

function normalizeAuthResult(payload: unknown): AuthResult {
  if (!payload || typeof payload !== "object") {
    throw new Error("Unexpected auth response.");
  }

  const record = payload as Record<string, unknown>;
  const token =
    (typeof record.token === "string" && record.token) ||
    (typeof record.accessToken === "string" && record.accessToken) ||
    (typeof record.access_token === "string" && record.access_token) ||
    (record.data && typeof record.data === "object" && !Array.isArray(record.data)
      ? (record.data as Record<string, unknown>).token as string | undefined
      : undefined);

  const user =
    (record.user && typeof record.user === "object" ? (record.user as UserSession) : null) ||
    (record.data && typeof record.data === "object" && !Array.isArray(record.data)
      ? (((record.data as Record<string, unknown>).user as UserSession | undefined) ?? null)
      : null);

  if (!token) {
    throw new Error("Missing auth token in response.");
  }

  if (!user) {
    throw new Error("Missing user in auth response.");
  }

  return { token, user };
}

export async function loginWithPassword(email: string, password: string) {
  const payload = await requestFirstMatch<unknown>(["/auth/login", "/api/auth/login", "/login"], {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return normalizeAuthResult(payload);
}

export async function registerWithPassword(name: string, email: string, password: string) {
  const payload = await requestFirstMatch<unknown>(["/auth/register", "/api/auth/register", "/register"], {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return normalizeAuthResult(payload);
}

export async function loginWithGoogle(credential: string) {
  const payload = await requestFirstMatch<unknown>(["/auth/google", "/api/auth/google", "/auth/google-login"], {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
  return normalizeAuthResult(payload);
}

export function getAuthCookieOptions(token: string) {
  return {
    name: getAuthCookieName(),
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
