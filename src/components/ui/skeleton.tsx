import { cn } from "@/lib/cn";

/** Barra linear de 2px no topo da região; indica carregamento sem deslocar o layout. */
export function LinearProgress({ active = true, className }: { active?: boolean; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-label="Carregando"
      aria-hidden={!active}
      className={cn("relative h-0.5 w-full overflow-hidden", active ? "bg-primary/10" : "bg-transparent", className)}
    >
      {active && <div className="absolute inset-y-0 left-0 w-2/5 animate-progress bg-primary" />}
    </div>
  );
}

/** Esqueleto de linhas de tabela, com a mesma altura das linhas reais. */
export function SkeletonRows({ rows = 8, columns }: { rows?: number; columns: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, r) => (
        <tr key={r} aria-hidden>
          {Array.from({ length: columns }, (_, c) => (
            <td key={c} className="border-b border-line px-2 py-1.5">
              <div className="h-3 rounded-sm bg-neutral-100" style={{ width: `${40 + ((r * 7 + c * 13) % 50)}%` }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function SkeletonLine({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-3 rounded-sm bg-neutral-100", className)} />;
}
