import "server-only";

import { serverApi } from "@/lib/api-server";
import type { Me } from "@/types";
import { getAccessToken } from "./tokens";

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
