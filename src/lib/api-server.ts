import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "@/types/api";
import type { Company, Me } from "@/types";
import { getAccessToken } from "./auth";
import { API_ORIGIN } from "./env";

/** Cliente tipado para Server Components / Route Handlers, falando direto com o Django. */
export function serverApi(accessToken?: string) {
  return createClient<paths>({
    baseUrl: API_ORIGIN,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    cache: "no-store",
  });
}

export type MeResult = { me: Me } | { me: null; status: number };

/** Usuário logado. `status` 401 = sessão inválida; 0 = back fora do ar. */
export async function fetchMe(): Promise<MeResult> {
  const access = await getAccessToken();
  if (!access) return { me: null, status: 401 };
  try {
    const { data, response } = await serverApi(access).GET("/api/auth/me/");
    return data ? { me: data } : { me: null, status: response.status };
  } catch {
    return { me: null, status: 0 };
  }
}

/**
 * Marca da instalação (público). Sem back disponível devolve `null` e a interface
 * usa o tema neutro — nunca um nome ou cor de empresa fixo no código.
 */
export async function fetchCompany(): Promise<Company | null> {
  try {
    const { data } = await createClient<paths>({ baseUrl: API_ORIGIN }).GET("/api/company/", {
      next: { revalidate: 60, tags: ["company"] },
    });
    return data ?? null;
  } catch {
    return null;
  }
}
