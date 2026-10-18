import { describe, expect, it } from "vitest";
import { NEUTRAL_PRIMARY, contrastRatio, foregroundFor, normalizeColor } from "./brand";

describe("cor da marca", () => {
  it("escolhe texto com contraste AA sobre a cor primária", () => {
    for (const color of ["#1E40AF", "#FACC15", "#065F46", "#F97316", "#FFFFFF", "#000000"]) {
      expect(contrastRatio(color, foregroundFor(color))).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("cai no tema neutro com cor ausente ou inválida", () => {
    expect(normalizeColor(undefined)).toBe(NEUTRAL_PRIMARY);
    expect(normalizeColor("red")).toBe(NEUTRAL_PRIMARY);
    expect(normalizeColor("#1e40af")).toBe("#1E40AF");
  });
});
