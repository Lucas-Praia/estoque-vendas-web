import { Menu } from "lucide-react";
import type { MobileHeaderProps } from "@/interfaces";
import { CompanyLogo } from "./company-logo";

export function MobileHeader({ company, menuOpen, onOpenMenu }: MobileHeaderProps) {
  return (
    <header className="relative flex h-14 shrink-0 items-center justify-center border-b border-line px-3 lg:hidden">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
        aria-controls="app-sidebar"
        className="absolute left-3 rounded-md p-1.5 text-ink hover:bg-subtle"
      >
        <Menu aria-hidden className="size-5" />
      </button>
      <CompanyLogo company={company} size="sm" />
    </header>
  );
}
