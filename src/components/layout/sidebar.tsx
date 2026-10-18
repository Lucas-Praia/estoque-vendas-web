"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/auth/session";
import { cn } from "@/utils/cn";
import { BrandMark } from "./brand-mark";
import { NAV } from "./nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const { me, company } = useSession();
  const groups = NAV.map((g) => ({ ...g, items: g.items.filter((i) => !i.staffOnly || me.is_staff) })).filter(
    (g) => g.items.length > 0,
  );

  return (
    <aside className="flex w-52 shrink-0 flex-col border-r border-line bg-subtle">
      <div className="flex h-12 items-center border-b border-line px-3">
        <Link href="/pdv" className="min-w-0 rounded-md">
          <BrandMark company={company} />
        </Link>
      </div>

      <nav aria-label="Módulos" className="flex-1 overflow-y-auto px-2 py-2">
        {groups.map((group) => (
          <div key={group.label} className="mb-3">
            <p className="px-2 pb-1 text-2xs font-semibold tracking-wide text-muted uppercase">{group.label}</p>
            <ul>
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-7 items-center gap-2 rounded-md border-l-2 px-2 text-sm",
                        active
                          ? "border-primary bg-primary/10 font-medium text-ink"
                          : "border-transparent text-muted hover:bg-neutral-200/50 hover:text-ink",
                      )}
                    >
                      <Icon aria-hidden className={cn("size-4", active && "text-primary")} strokeWidth={1.75} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2 border-t border-line px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium">{me.tx_full_name || me.username}</p>
          <p className="truncate font-mono text-2xs text-muted">
            {me.username}
            {me.is_staff && " · admin"}
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button type="submit" aria-label="Sair" title="Sair" className="rounded-md p-1.5 text-muted hover:bg-neutral-200/50 hover:text-ink">
            <LogOut aria-hidden className="size-4" />
          </button>
        </form>
      </div>
    </aside>
  );
}
