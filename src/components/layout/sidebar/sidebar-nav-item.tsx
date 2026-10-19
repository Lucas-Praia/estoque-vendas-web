import Link from "next/link";
import type { SidebarNavItemProps } from "@/interfaces";
import { classNames } from "@/utils/class-names";

export function SidebarNavItem({ item, active, onNavigate }: SidebarNavItemProps) {
  const { href, label, icon: Icon } = item;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={classNames(
        "flex h-9 items-center gap-2 rounded-md border-l-2 px-2 text-sm lg:h-7",
        active
          ? "border-primary bg-primary/10 font-medium text-ink"
          : "border-transparent text-muted hover:bg-neutral-200/50 hover:text-ink",
      )}
    >
      <Icon aria-hidden className={classNames("size-4", active && "text-primary")} strokeWidth={1.75} />
      {label}
    </Link>
  );
}
