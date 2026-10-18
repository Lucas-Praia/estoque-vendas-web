import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE, clearAuthCookies, refreshTokens, setAuthCookies } from "@/lib/auth";
import { isJwtFresh } from "@/lib/jwt";

/**
 * Guarda das páginas. Server Components não podem gravar cookies, então a
 * renovação silenciosa do access acontece aqui, antes da renderização.
 */
export async function proxy(req: NextRequest) {
  const access = req.cookies.get(ACCESS_COOKIE)?.value;
  if (isJwtFresh(access)) return NextResponse.next();

  const refresh = req.cookies.get(REFRESH_COOKIE)?.value;
  const renewed = refresh ? await refreshTokens(refresh) : null;

  if (!renewed) {
    const login = new URL("/login", req.url);
    login.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    const res = NextResponse.redirect(login);
    clearAuthCookies(res.cookies);
    return res;
  }

  // O novo access vale já para esta renderização e para as próximas requisições.
  req.cookies.set(ACCESS_COOKIE, renewed.access);
  const res = NextResponse.next({ request: { headers: req.headers } });
  setAuthCookies(res.cookies, renewed);
  return res;
}

export const config = {
  matcher: ["/((?!api/|login|_next/|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
