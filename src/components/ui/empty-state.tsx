import { Inbox } from "lucide-react";
import type { EmptyStateProps } from "@/interfaces";

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
      <Inbox aria-hidden className="size-5 text-neutral-400" strokeWidth={1.5} />
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="max-w-sm text-xs text-muted">{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
