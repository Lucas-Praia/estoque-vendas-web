import type { Readable, Writable } from "openapi-typescript-helpers";
import type { components } from "./api";

/**
 * Atalhos para os schemas gerados em `api.d.ts` (não escreva interfaces à mão).
 * `Model` = como a API devolve; `Input` = o que a API aceita no corpo.
 */
type Schemas = components["schemas"];

export type Model<K extends keyof Schemas> = Readable<Schemas[K]>;
export type Input<K extends keyof Schemas> = Writable<Schemas[K]>;

export type Me = Model<"Me">;
export type Company = Model<"Company">;
export type Unit = Schemas["TxUnitEnum"];
export type PaymentMethod = Schemas["TxMethodEnum"];
