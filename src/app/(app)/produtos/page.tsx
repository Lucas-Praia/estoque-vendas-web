import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Produtos" };

export default function ProdutosPage() {
  return <ModulePlaceholder title="Produtos" note="Fase 2: tabela de produtos e cadastro." />;
}
