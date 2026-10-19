import type { PageHeaderProps } from "@/interfaces";

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex min-h-12 items-center justify-between gap-4 border-b border-line px-4 py-2">
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold">{title}</h1>
        {description && <p className="truncate text-xs text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
