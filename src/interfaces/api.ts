import type { Readable, Writable } from "openapi-typescript-helpers";
import type { components } from "./generated/api-schema";

type Schemas = components["schemas"];

export type Model<K extends keyof Schemas> = Readable<Schemas[K]>;
export type Input<K extends keyof Schemas> = Writable<Schemas[K]>;

export type Me = Model<"Me">;
export type Company = Model<"Company">;
export type Unit = Schemas["TxUnitEnum"];
export type PaymentMethod = Schemas["TxMethodEnum"];

export type FieldErrors = Record<string, string[]>;

export interface NextFetchInit extends RequestInit {
  next?: NextFetchRequestConfig;
}

export type FetchResult<T> =
  | { data: T; error?: never; response: Response }
  | { data?: never; error: unknown; response: Response };
