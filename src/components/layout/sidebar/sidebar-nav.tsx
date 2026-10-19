"use client";

import { usePathname } from "next/navigation";
import type { SidebarNavProps } from "@/interfaces";
import { NAV_GROUPS } from "./nav-items";
import { SidebarNavItem } from "./sidebar-nav-item";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({ isStaff, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const groups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.staffOnly || isStaff),
  })).filter((group) => group.items.length > 0);

  return (
    <nav aria-label="Módulos" className="flex-1 overflow-y-auto px-2 py-3">
      {groups.map((group) => (
        <div key={group.label} className="mb-3">
          <p className="px-2 pb-1 text-2xs font-semibold tracking-wide text-muted uppercase">{group.label}</p>
          <ul>
            {group.items.map((item) => (
              <li key={item.href}>
                <SidebarNavItem item={item} active={isActiveRoute(pathname, item.href)} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
