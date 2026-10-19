import "server-only";

import type { CurrentUserResult } from "@/interfaces";
import { serverApi } from "@/lib/api-server";
import { getAccessToken } from "./tokens";

export async function getCurrentUser(): Promise<CurrentUserResult> {
  const access = await getAccessToken();
  if (!access) return { me: null, status: 401 };
  try {
    const { data, response } = await serverApi(access).GET("/api/auth/me/");
    return data ? { me: data } : { me: null, status: response.status };
  } catch {
    return { me: null, status: 0 };
  }
}
