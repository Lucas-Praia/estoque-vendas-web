import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Fornecedores" };

export default function FornecedoresPage() {
  return <ModulePlaceholder title="Fornecedores" note="Fase 2: cadastro de fornecedores." />;
}
