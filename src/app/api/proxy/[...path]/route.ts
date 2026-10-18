import { type NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  clearAuthCookies,
  refreshTokens,
  setAuthCookies,
} from "@/auth/tokens";
import { API_ORIGIN } from "@/lib/env";
import { isJwtFresh } from "@/auth/jwt";

/**
 * BFF: o navegador chama /api/proxy/<caminho no Django>. Aqui o access token
 * (cookie httpOnly) vira header Authorization; com 401, renova uma vez e repete.
 */
const PREFIX = "/api/proxy";

/** Só repassa a API e a mídia; nunca as rotas de token (o navegador não deve ver tokens). */
function isAllowed(path: string) {
  if (path.startsWith("/api/auth/token")) return false;
  return path.startsWith("/api/") || path.startsWith("/media/");
}

const FORWARD_REQUEST_HEADERS = ["accept", "accept-language", "content-type"];
const FORWARD_RESPONSE_HEADERS = ["content-type", "content-disposition", "cache-control", "etag", "last-modified"];

async function handle(req: NextRequest) {
  const path = req.nextUrl.pathname.slice(PREFIX.length) || "/";
  if (!isAllowed(path)) {
    return NextResponse.json({ detail: "Rota não permitida." }, { status: 404 });
  }

  const isPublicMedia = path.startsWith("/media/");
  const target = `${API_ORIGIN}${path}${req.nextUrl.search}`;
  const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.arrayBuffer();

  const refresh = req.cookies.get(REFRESH_COOKIE)?.value;
  let access = req.cookies.get(ACCESS_COOKIE)?.value;
  let renewed: { access: string; refresh?: string } | null = null;

  const renew = async () => {
    renewed = refresh ? await refreshTokens(refresh) : null;
    access = renewed?.access;
    return renewed !== null;
  };

  if (!isPublicMedia && !isJwtFresh(access) && refresh) await renew();

  const send = () => {
    const headers = new Headers();
    for (const name of FORWARD_REQUEST_HEADERS) {
      const value = req.headers.get(name);
      if (value) headers.set(name, value);
    }
    if (access && !isPublicMedia) headers.set("authorization", `Bearer ${access}`);
    return fetch(target, { method: req.method, headers, body, cache: "no-store", redirect: "manual" });
  };

  let upstream: Response;
  try {
    upstream = await send();
    if (upstream.status === 401 && !isPublicMedia && !renewed && (await renew())) {
      upstream = await send();
    }
  } catch {
    return NextResponse.json(
      { detail: "Não foi possível conectar ao servidor. Verifique a rede e tente de novo." },
      { status: 502 },
    );
  }

  const headers = new Headers();
  for (const name of FORWARD_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  const res = new NextResponse(upstream.status === 204 ? null : upstream.body, {
    status: upstream.status,
    headers,
  });

  if (upstream.status === 401 && !isPublicMedia) clearAuthCookies(res.cookies);
  else if (renewed) setAuthCookies(res.cookies, renewed);
  return res;
}

export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE };
