import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Nova venda" };

export default function PDVPage() {
  return <ModulePlaceholder title="Nova venda" note="Fase 3: PDV operável só pelo teclado." />;
}
