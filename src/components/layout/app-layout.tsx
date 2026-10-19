"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/auth/session";
import type { ChildrenProps } from "@/interfaces";
import { MobileHeader } from "./mobile-header";
import { Sidebar } from "./sidebar/sidebar";

export function AppLayout({ children }: ChildrenProps) {
  const { company } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="flex h-full">
      <Sidebar open={menuOpen} onClose={closeMenu} />
      {menuOpen && <div aria-hidden className="fixed inset-0 z-30 bg-neutral-900/30 lg:hidden" onClick={closeMenu} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader company={company} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto">{children}</main>
      </div>
    </div>
  );
}
