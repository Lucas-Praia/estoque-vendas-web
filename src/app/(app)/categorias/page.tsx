import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Categorias" };

export default function CategoriasPage() {
  return <ModulePlaceholder title="Categorias" note="Fase 2: cadastro de categorias." />;
}
