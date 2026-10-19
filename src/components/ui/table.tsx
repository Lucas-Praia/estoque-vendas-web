import type {
  TableContainerProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TdProps,
  ThProps,
} from "@/interfaces";
import { classNames } from "@/utils/class-names";

export function TableContainer({ className, ...props }: TableContainerProps) {
  return <div className={classNames("relative min-h-0 overflow-auto", className)} {...props} />;
}

export function Table({ className, ...props }: TableProps) {
  return <table className={classNames("w-full border-separate border-spacing-0 text-sm", className)} {...props} />;
}

export function THead({ className, ...props }: TableSectionProps) {
  return <thead className={classNames("sticky top-0 z-10 bg-subtle", className)} {...props} />;
}

export function TBody(props: TableSectionProps) {
  return <tbody {...props} />;
}

export function Tr({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={classNames("hover:bg-subtle aria-selected:bg-primary/5 [&>td]:border-b [&>td]:border-line", className)}
      {...props}
    />
  );
}

export function Th({ numeric, className, ...props }: ThProps) {
  return (
    <th
      scope="col"
      className={classNames(
        "h-8 border-b border-line px-2 text-left text-2xs font-semibold tracking-wide whitespace-nowrap text-muted uppercase",
        numeric && "text-right",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ numeric, className, ...props }: TdProps) {
  return (
    <td
      className={classNames("px-2 py-1.5 align-middle", numeric && "text-right font-mono tabular-nums", className)}
      {...props}
    />
  );
}
