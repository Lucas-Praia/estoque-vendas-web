import type { CSSProperties } from "react";
import type { Company } from "@/interfaces";

export const NEUTRAL_PRIMARY = "#1F2937";

const HEX = /^#[0-9a-f]{6}$/i;
const TEXT_DARK = "#111827";
const TEXT_LIGHT = "#FFFFFF";

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function foregroundFor(background: string) {
  return contrastRatio(background, TEXT_LIGHT) >= contrastRatio(background, TEXT_DARK)
    ? TEXT_LIGHT
    : TEXT_DARK;
}

export function normalizeColor(color: string | null | undefined) {
  return color && HEX.test(color) ? color.toUpperCase() : NEUTRAL_PRIMARY;
}

export function companyThemeStyle(company: Pick<Company, "tx_primary_color"> | null): CSSProperties {
  const primary = normalizeColor(company?.tx_primary_color);
  return {
    "--color-primary": primary,
    "--color-primary-fg": foregroundFor(primary),
  } as CSSProperties;
}
