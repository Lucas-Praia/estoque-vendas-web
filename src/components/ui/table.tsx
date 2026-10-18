import { cn } from "@/utils/cn";

/**
 * Primitivas de tabela densa: cabeçalho fixo, linhas py-1.5, divisórias de 1px.
 * Use `numeric` em células de quantidade/valor: mono, tabular e alinhado à direita.
 */
export function TableContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative min-h-0 overflow-auto", className)} {...props} />;
}

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full border-separate border-spacing-0 text-sm", className)} {...props} />;
}

export function THead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("sticky top-0 z-10 bg-subtle", className)} {...props} />;
}

export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function Tr({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("hover:bg-subtle aria-selected:bg-primary/5 [&>td]:border-b [&>td]:border-line", className)}
      {...props}
    />
  );
}

interface CellProps {
  numeric?: boolean;
}

export function Th({ numeric, className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement> & CellProps) {
  return (
    <th
      scope="col"
      className={cn(
        "h-8 border-b border-line px-2 text-left text-2xs font-semibold tracking-wide whitespace-nowrap text-muted uppercase",
        numeric && "text-right",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ numeric, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement> & CellProps) {
  return (
    <td
      className={cn("px-2 py-1.5 align-middle", numeric && "text-right font-mono tabular-nums", className)}
      {...props}
    />
  );
}
