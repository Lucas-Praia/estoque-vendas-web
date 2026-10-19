import "server-only";

import createClient from "openapi-fetch";
import type { Company, NextFetchInit } from "@/interfaces";
import type { paths } from "@/interfaces/generated/api-schema";
import { API_ORIGIN } from "./env";

async function nextCompatibleFetch(input: Request): Promise<Response> {
  const hasBody = input.method !== "GET" && input.method !== "HEAD";
  const init: NextFetchInit = {
    method: input.method,
    headers: input.headers,
    body: hasBody ? await input.arrayBuffer() : undefined,
    cache: input.cache,
    redirect: input.redirect,
    next: (input as Request & Pick<NextFetchInit, "next">).next,
  };
  return fetch(input.url, init);
}

function createServerClient(headers?: HeadersInit, cache?: RequestCache) {
  return createClient<paths>({ baseUrl: API_ORIGIN, fetch: nextCompatibleFetch, headers, cache });
}

export function serverApi(accessToken?: string) {
  return createServerClient(accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined, "no-store");
}

export async function fetchCompany(): Promise<Company | null> {
  try {
    const { data } = await createServerClient().GET("/api/company/", {
      next: { revalidate: 60, tags: ["company"] },
    });
    return data ?? null;
  } catch {
    return null;
  }
}
