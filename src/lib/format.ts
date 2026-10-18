import type { Unit } from "@/types";

/**
 * Formatação para exibição. Os decimais chegam da API como string ("25.00",
 * "0.350"); a conversão para número acontece só aqui, nunca em cálculos.
 */
export const TIME_ZONE = "America/Manaus";
export const LOCALE = "pt-BR";

const money = new Intl.NumberFormat(LOCALE, { style: "currency", currency: "BRL" });

const quantityFormatters = {
  fractional: new Intl.NumberFormat(LOCALE, { minimumFractionDigits: 3, maximumFractionDigits: 3 }),
  integer: new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 }),
};

const dateFormat = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFormat = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const EMPTY = "—";

/** Unidades que aceitam quantidade fracionada (regra do back). */
export const FRACTIONAL_UNITS: ReadonlySet<Unit> = new Set<Unit>(["KG", "L"]);

export function isFractionalUnit(unit: Unit | null | undefined) {
  return !!unit && FRACTIONAL_UNITS.has(unit);
}

function toNumber(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

export function formatMoney(value: string | number | null | undefined) {
  const n = toNumber(value);
  return n === null ? EMPTY : money.format(n);
}

/** KG e L com 3 casas (0,350); demais unidades inteiras. */
export function formatQuantity(value: string | number | null | undefined, unit?: Unit | null) {
  const n = toNumber(value);
  if (n === null) return EMPTY;
  return (isFractionalUnit(unit) ? quantityFormatters.fractional : quantityFormatters.integer).format(n);
}

function toDate(value: string | Date | null | undefined) {
  if (!value) return null;
  // "2026-10-18" (só data) seria lido como UTC e poderia voltar um dia em Manaus.
  const d = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T12:00:00`)
    : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(value: string | Date | null | undefined) {
  const d = toDate(value);
  return d ? dateFormat.format(d) : EMPTY;
}

export function formatDateTime(value: string | Date | null | undefined) {
  const d = toDate(value);
  return d ? dateTimeFormat.format(d) : EMPTY;
}
