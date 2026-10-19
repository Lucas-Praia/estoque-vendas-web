import {
  ArrowDownToLine,
  ArrowLeftRight,
  BarChart3,
  Boxes,
  Contact,
  Receipt,
  ScanBarcode,
  Settings,
  Tags,
  Truck,
} from "lucide-react";
import type { NavGroup } from "@/interfaces";

export const NAV_GROUPS: NavGroup[] = [
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
