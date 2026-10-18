import {
  ArrowDownToLine,
  ArrowLeftRight,
  BarChart3,
  Boxes,
  Building2,
  Contact,
  Receipt,
  ScanBarcode,
  Settings,
  Tags,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Só aparece (e só abre) para `is_staff`. */
  staffOnly?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    label: "Operação",
    items: [
      { href: "/pdv", label: "PDV", icon: ScanBarcode },
      { href: "/vendas", label: "Vendas", icon: Receipt },
    ],
  },
  {
    label: "Estoque",
    items: [
      { href: "/produtos", label: "Produtos", icon: Boxes },
      { href: "/entradas", label: "Entradas", icon: ArrowDownToLine },
      { href: "/movimentacoes", label: "Movimentações", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Cadastros",
    items: [
      { href: "/categorias", label: "Categorias", icon: Tags },
      { href: "/fornecedores", label: "Fornecedores", icon: Truck },
      { href: "/clientes", label: "Clientes", icon: Contact },
    ],
  },
  {
    label: "Gestão",
    items: [
      { href: "/dashboard", label: "Relatórios", icon: BarChart3 },
      { href: "/configuracoes", label: "Configurações", icon: Settings, staffOnly: true },
    ],
  },
];

export const BrandIcon = Building2;
