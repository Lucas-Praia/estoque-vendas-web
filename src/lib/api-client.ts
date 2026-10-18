import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/types/api";

/**
 * Cliente tipado para o navegador. Os tokens ficam em cookie httpOnly, então o
 * navegador não fala direto com o Django: tudo passa pelo Route Handler
 * `/api/proxy`, que injeta o Bearer e renova o access quando preciso.
 *
 *   api.GET("/api/product/")  →  /api/proxy/api/product/  →  {API}/api/product/
 */
export const PROXY_BASE = "/api/proxy";

/** O proxy já tentou o refresh; se ainda veio 401, a sessão acabou. */
const sessionExpired: Middleware = {
  onResponse({ response }) {
    if (response.status === 401 && typeof window !== "undefined") {
      const next = window.location.pathname + window.location.search;
      // Recarga completa de propósito: descarta o cache do TanStack Query da sessão anterior.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`/login?next=${encodeURIComponent(next)}`);
    }
    return response;
  },
};

export const api = createClient<paths>({ baseUrl: PROXY_BASE });
api.use(sessionExpired);

/**
 * URLs de mídia (ex.: `im_logo`) vêm absolutas com o host que o Django enxergou,
 * que pode ser interno ao container. Servimos pelo proxy usando só o caminho.
 */
export function mediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const { pathname } = new URL(url, "http://placeholder");
    return `${PROXY_BASE}${pathname}`;
  } catch {
    return null;
  }
}
