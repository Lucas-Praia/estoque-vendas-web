import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Configurações" };

export default function ConfiguracoesPage() {
  return <ModulePlaceholder title="Configurações" note="Fase 5: dados da empresa, logo e cor principal." />;
}
