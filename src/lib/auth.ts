import "server-only";

import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { API_ORIGIN, COOKIE_SECURE } from "./env";
import { getJwtExp } from "./jwt";

export const ACCESS_COOKIE = "dist_access";
export const REFRESH_COOKIE = "dist_refresh";

/** Tempo de vida do refresh no back (SIMPLE_JWT.REFRESH_TOKEN_LIFETIME = 12 h). */
const REFRESH_MAX_AGE = 12 * 60 * 60;
const ACCESS_FALLBACK_MAX_AGE = 60 * 60;

type CookieJar = Pick<NextResponse["cookies"], "set" | "delete">;

function maxAgeFrom(token: string, fallback: number) {
  const exp = getJwtExp(token);
  return exp ? Math.max(0, Math.floor(exp - Date.now() / 1000)) : fallback;
}

const baseCookie = {
  httpOnly: true,
  secure: COOKIE_SECURE,
  sameSite: "lax",
  path: "/",
} as const;

export function setAuthCookies(jar: CookieJar, tokens: { access: string; refresh?: string }) {
  jar.set(ACCESS_COOKIE, tokens.access, {
    ...baseCookie,
    maxAge: maxAgeFrom(tokens.access, ACCESS_FALLBACK_MAX_AGE),
  });
  if (tokens.refresh) {
    jar.set(REFRESH_COOKIE, tokens.refresh, {
      ...baseCookie,
      maxAge: maxAgeFrom(tokens.refresh, REFRESH_MAX_AGE),
    });
  }
}

export function clearAuthCookies(jar: CookieJar) {
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
}

/**
 * Troca o refresh por um novo access. Devolve `null` se o refresh for recusado
 * (expirado, usuário desativado) — quem chama manda o usuário para o login.
 * O back pode devolver um novo refresh se ROTATE_REFRESH_TOKENS for ligado.
 */
export async function refreshTokens(
  refresh: string,
): Promise<{ access: string; refresh?: string } | null> {
  try {
    const res = await fetch(`${API_ORIGIN}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refresh }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { access?: unknown; refresh?: unknown };
    if (typeof body.access !== "string") return null;
    return {
      access: body.access,
      refresh: typeof body.refresh === "string" ? body.refresh : undefined,
    };
  } catch {
    return null;
  }
}

/** Access token da requisição atual (Server Components / Route Handlers). */
export async function getAccessToken() {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}
