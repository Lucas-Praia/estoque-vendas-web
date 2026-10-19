import { PageHeader } from "@/components/ui/page-header";
import type { ModulePlaceholderProps } from "@/interfaces";

export function ModulePlaceholder({ title, note }: ModulePlaceholderProps) {
  return (
    <>
      <PageHeader title={title} />
      <div className="px-4 py-6 text-sm text-muted">{note}</div>
    </>
  );
}
