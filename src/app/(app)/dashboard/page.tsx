import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = { title: "Relatórios" };

export default function DashboardPage() {
  return <ModulePlaceholder title="Relatórios" note="Os endpoints de relatórios ainda serão criados no back-end." />;
}
