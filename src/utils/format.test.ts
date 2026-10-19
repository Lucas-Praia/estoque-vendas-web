import { describe, expect, it } from "vitest";
import { formatDate, formatDateTime, formatMoney, formatQuantity, isFractionalUnit } from "./format";

const nbsp = (s: string) => s.replace(/ /g, " ");

describe("formatMoney", () => {
  it("formata decimais vindos como string em BRL", () => {
    expect(nbsp(formatMoney("25.00"))).toBe("R$ 25,00");
    expect(nbsp(formatMoney("1234.5"))).toBe("R$ 1.234,50");
  });

  it("mostra traço para vazio ou inválido", () => {
    expect(formatMoney(null)).toBe("—");
    expect(formatMoney("")).toBe("—");
    expect(formatMoney("abc")).toBe("—");
  });
});

describe("formatQuantity", () => {
  it("usa 3 casas para KG e L", () => {
    expect(formatQuantity("0.350", "KG")).toBe("0,350");
    expect(formatQuantity("2", "L")).toBe("2,000");
  });

  it("usa inteiro para as demais unidades", () => {
    expect(formatQuantity("12.000", "UN")).toBe("12");
    expect(formatQuantity("1500", "CX")).toBe("1.500");
  });

  it("só KG e L são fracionáveis", () => {
    expect(["UN", "KG", "L", "CX", "FD", "PCT"].filter((u) => isFractionalUnit(u as never))).toEqual(["KG", "L"]);
  });
});

describe("datas em America/Manaus", () => {
  it("converte datetime UTC para o fuso de Manaus (UTC-4)", () => {
    expect(formatDateTime("2026-10-18T02:30:00Z")).toBe("17/10/2026, 22:30");
  });

  it("não desloca datas sem horário", () => {
    expect(formatDate("2026-10-18")).toBe("18/10/2026");
  });
});
