import { describe, expect, it } from "vitest";
import { errorMessages, toApiError } from "./api-error";

describe("toApiError", () => {
  it("usa o detail de regra de negócio como veio", () => {
    const err = toApiError(400, { detail: "Estoque insuficiente para ARROZ 5KG." });
    expect(err.messages).toEqual(["Estoque insuficiente para ARROZ 5KG."]);
  });

  it("achata erros de validação aninhados", () => {
    const err = toApiError(400, {
      tx_description: ["Este campo é obrigatório."],
      items: [{}, { nb_quantity: ["Quantidade fracionada só para KG ou L."] }],
    });
    expect(err.fieldErrors).toEqual({
      tx_description: ["Este campo é obrigatório."],
      "items.1.nb_quantity": ["Quantidade fracionada só para KG ou L."],
    });
    expect(errorMessages(err)).toContain("items.1.nb_quantity: Quantidade fracionada só para KG ou L.");
  });

  it("usa non_field_errors como mensagem geral", () => {
    expect(toApiError(400, { non_field_errors: ["Pagamento menor que o total."] }).messages).toEqual([
      "Pagamento menor que o total.",
    ]);
  });

  it("tem mensagem padrão quando o corpo não ajuda", () => {
    expect(toApiError(403, null).messages).toEqual(["Você não tem permissão para esta ação."]);
    expect(toApiError(500, "<html>").messages).toEqual(["Erro inesperado (HTTP 500)."]);
  });
});
