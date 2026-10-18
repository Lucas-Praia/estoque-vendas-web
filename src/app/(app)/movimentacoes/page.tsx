import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Movimentações" };

export default function MovimentacoesPage() {
  return <ModulePlaceholder title="Movimentações" note="Fase 4: histórico e ajuste de inventário." />;
}
