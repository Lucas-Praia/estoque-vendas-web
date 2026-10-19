export function getJwtExp(token: string): number | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const exp: unknown = JSON.parse(json).exp;
    return typeof exp === "number" ? exp : null;
  } catch {
    return null;
  }
}

export function isJwtFresh(token: string | undefined, skewSeconds = 30): token is string {
  if (!token) return false;
  const exp = getJwtExp(token);
  return exp !== null && exp - skewSeconds > Date.now() / 1000;
}
