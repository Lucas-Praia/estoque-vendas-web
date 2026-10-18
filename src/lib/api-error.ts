/**
 * Erros da API em um formato só, para mostrar ao usuário exatamente o que o back mandou:
 * - regra de negócio: `{ "detail": "..." }`
 * - validação: `{ "campo": ["..."], "items": [{ "nb_quantity": ["..."] }] }`
 */
export type FieldErrors = Record<string, string[]>;

export class ApiError extends Error {
  readonly status: number;
  /** Mensagens de campo, com o caminho achatado (ex.: `items.0.nb_quantity`). */
  readonly fieldErrors: FieldErrors;
  /** Tudo que deve aparecer num aviso geral (detail + non_field_errors + campos sem input na tela). */
  readonly messages: string[];

  constructor(status: number, messages: string[], fieldErrors: FieldErrors = {}) {
    super(messages[0] ?? "Erro inesperado.");
    this.name = "ApiError";
    this.status = status;
    this.messages = messages;
    this.fieldErrors = fieldErrors;
  }
}

const GENERIC_BY_STATUS: Record<number, string> = {
  401: "Sua sessão expirou. Entre novamente.",
  403: "Você não tem permissão para esta ação.",
  404: "Registro não encontrado.",
  413: "Arquivo grande demais.",
};

const NON_FIELD_KEYS = new Set(["detail", "non_field_errors"]);
const FIELDS_HINT = "Verifique os campos destacados.";

function flatten(value: unknown, path: string, out: FieldErrors) {
  if (typeof value === "string") {
    (out[path] ??= []).push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item, i) =>
      typeof item === "string" ? flatten(item, path, out) : flatten(item, `${path}.${i}`, out),
    );
  } else if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      flatten(nested, path ? `${path}.${key}` : key, out);
    }
  }
}

export function toApiError(status: number, body: unknown): ApiError {
  const fieldErrors: FieldErrors = {};
  const messages: string[] = [];

  if (body && typeof body === "object" && !Array.isArray(body)) {
    for (const [key, value] of Object.entries(body)) {
      if (NON_FIELD_KEYS.has(key)) {
        const general: FieldErrors = {};
        flatten(value, key, general);
        messages.push(...(general[key] ?? []));
      } else {
        flatten(value, key, fieldErrors);
      }
    }
  } else if (Array.isArray(body)) {
    const general: FieldErrors = {};
    flatten(body, "_", general);
    messages.push(...Object.values(general).flat());
  }

  if (messages.length === 0 && Object.keys(fieldErrors).length === 0) {
    messages.push(GENERIC_BY_STATUS[status] ?? `Erro inesperado (HTTP ${status}).`);
  }
  if (messages.length === 0) {
    messages.push(FIELDS_HINT);
  }
  return new ApiError(status, messages, fieldErrors);
}

export const NETWORK_ERROR = new ApiError(0, [
  "Não foi possível conectar ao servidor. Verifique a rede e tente de novo.",
]);

/** Todas as mensagens (gerais e de campo) em uma lista, para toasts e estados de erro. */
export function errorMessages(error: unknown): string[] {
  if (!(error instanceof ApiError)) return ["Erro inesperado."];
  const fields = Object.entries(error.fieldErrors).map(([field, msgs]) => `${field}: ${msgs.join(" ")}`);
  return fields.length ? [...new Set([...error.messages.filter((m) => m !== FIELDS_HINT), ...fields])] : error.messages;
}

type FetchResult<T> =
  | { data: T; error?: never; response: Response }
  | { data?: never; error: unknown; response: Response };

/**
 * Converte o resultado do openapi-fetch em dado ou exceção, para o TanStack Query
 * tratar `error` de forma uniforme.
 */
export async function unwrap<T>(request: Promise<FetchResult<T>>): Promise<T> {
  let result: FetchResult<T>;
  try {
    result = await request;
  } catch {
    throw NETWORK_ERROR;
  }
  if (result.error !== undefined || !result.response.ok) {
    throw toApiError(result.response.status, result.error);
  }
  return result.data as T;
}
