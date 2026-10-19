import { LogOut } from "lucide-react";
import type { SidebarUserProps } from "@/interfaces";

export function SidebarUser({ user }: SidebarUserProps) {
  const displayName = user.tx_full_name || user.username;
  const details = [user.tx_full_name ? user.username : null, user.is_staff ? "admin" : null].filter(Boolean).join(" · ");

  return (
    <div className="flex items-center gap-2 border-t border-line px-3 py-2">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{displayName}</p>
        {details && <p className="truncate font-mono text-2xs text-muted">{details}</p>}
      </div>
      <form action="/api/auth/logout" method="post">
        <button
          type="submit"
          aria-label="Sair"
          title="Sair"
          className="rounded-md p-1.5 text-muted hover:bg-neutral-200/50 hover:text-ink"
        >
          <LogOut aria-hidden className="size-4" />
        </button>
      </form>
    </div>
  );
}
