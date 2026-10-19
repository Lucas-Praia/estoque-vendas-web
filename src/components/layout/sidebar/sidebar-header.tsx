import { X } from "lucide-react";
import Link from "next/link";
import type { SidebarHeaderProps } from "@/interfaces";
import { CompanyLogo } from "../company-logo";

export function SidebarHeader({ company, onClose }: SidebarHeaderProps) {
  return (
    <div className="relative flex shrink-0 items-center justify-center border-b border-line px-4 py-3">
      <Link href="/pdv" onClick={onClose} className="flex w-full min-w-0 justify-center rounded-md">
        <CompanyLogo company={company} size="md" className="text-center" />
      </Link>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar menu"
        className="absolute top-2 right-2 rounded-md p-1.5 text-muted hover:bg-neutral-200/50 lg:hidden"
      >
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}
