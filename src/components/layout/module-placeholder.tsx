import { PageHeader } from "@/components/ui/page-header";

/** Rota já navegável cuja tela chega numa fase posterior. */
export function ModulePlaceholder({ title, note }: { title: string; note: string }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="px-4 py-6 text-sm text-muted">{note}</div>
    </>
  );
}
