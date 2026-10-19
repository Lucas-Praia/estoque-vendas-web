import type { LucideIcon } from "lucide-react";
import type { Company, Me } from "./api";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  staffOnly?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export interface SidebarHeaderProps {
  company: Company | null;
  onClose: () => void;
}

export interface SidebarNavProps {
  isStaff: boolean;
  onNavigate: () => void;
}

export interface SidebarNavItemProps {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
}

export interface SidebarUserProps {
  user: Me;
}

export interface MobileHeaderProps {
  company: Company | null;
  menuOpen: boolean;
  onOpenMenu: () => void;
}

export type CompanyLogoSize = "sm" | "md" | "lg";

export interface CompanyLogoProps {
  company: Company | null;
  size?: CompanyLogoSize;
  className?: string;
}

export interface ModulePlaceholderProps {
  title: string;
  note: string;
}

export interface RouteErrorProps {
  error: Error;
  reset: () => void;
}
