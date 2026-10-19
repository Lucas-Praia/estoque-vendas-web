"use client";

import { useSession } from "@/auth/session";
import type { SidebarProps } from "@/interfaces";
import { classNames } from "@/utils/class-names";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";
import { SidebarUser } from "./sidebar-user";

export function Sidebar({ open, onClose }: SidebarProps) {
  const { me, company } = useSession();

  return (
    <aside
      id="app-sidebar"
      className={classNames(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-subtle transition-transform",
        "lg:static lg:w-56 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <SidebarHeader company={company} onClose={onClose} />
      <SidebarNav isStaff={me.is_staff} onNavigate={onClose} />
      <SidebarUser user={me} />
    </aside>
  );
}
