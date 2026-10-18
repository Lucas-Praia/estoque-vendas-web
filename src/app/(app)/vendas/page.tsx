import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Vendas" };

export default function VendasPage() {
  return <ModulePlaceholder title="Vendas" note="Fase 4: lista, detalhe e cancelamento de vendas." />;
}
