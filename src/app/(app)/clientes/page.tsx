import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Clientes" };

export default function ClientesPage() {
  return <ModulePlaceholder title="Clientes" note="Fase 2: cadastro de clientes." />;
}
