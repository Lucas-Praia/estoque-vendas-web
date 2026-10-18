import "server-only";

/**
 * Endereço do back-end, lido em tempo de execução no servidor.
 * `API_URL` permite apontar o container para `http://backend:8000/api` sem
 * rebuild; `NEXT_PUBLIC_API_URL` é o padrão do projeto.
 */
const apiUrl = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000/api"
).replace(/\/+$/, "");

/**
 * Os paths do schema OpenAPI já incluem o prefixo `/api` (ex.: `/api/product/`),
 * então o cliente tipado usa a origem do back, sem o `/api` final.
 */
export const API_ORIGIN = apiUrl.replace(/\/api$/, "");

/** Cookies `Secure` exigem HTTPS; instalações em rede local via HTTP desligam com `AUTH_COOKIE_SECURE=false`. */
export const COOKIE_SECURE =
  process.env.AUTH_COOKIE_SECURE !== undefined
    ? process.env.AUTH_COOKIE_SECURE === "true"
    : process.env.NODE_ENV === "production";
