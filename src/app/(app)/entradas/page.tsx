import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Entradas de mercadoria" };

export default function EntradasPage() {
  return <ModulePlaceholder title="Entradas de mercadoria" note="Fase 4: entradas por nota fiscal." />;
}
