import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/interfaces/generated/api-schema";

export const PROXY_BASE = "/api/proxy";

const sessionExpired: Middleware = {
  onResponse({ response }) {
    if (response.status === 401 && typeof window !== "undefined") {
      const next = window.location.pathname + window.location.search;
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`/login?next=${encodeURIComponent(next)}`);
    }
    return response;
  },
};

export const api = createClient<paths>({ baseUrl: PROXY_BASE });
api.use(sessionExpired);

export function mediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const { pathname } = new URL(url, "http://placeholder");
    return `${PROXY_BASE}${pathname}`;
  } catch {
    return null;
  }
}
