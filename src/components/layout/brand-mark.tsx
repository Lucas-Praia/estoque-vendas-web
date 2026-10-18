import { mediaUrl } from "@/lib/api-client";
import { cn } from "@/utils/cn";
import type { Company } from "@/types";

/** Logo da empresa (via proxy) ou, sem logo, o nome vindo da API. */
export function BrandMark({ company, size = "sm", className }: { company: Company | null; size?: "sm" | "lg"; className?: string }) {
  const logo = mediaUrl(company?.im_logo);
  const name = company?.tx_name ?? "";

  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- mídia dinâmica servida pelo proxy, sem otimização
      <img
        src={logo}
        alt={name}
        className={cn("w-auto object-contain object-left", size === "lg" ? "h-12 max-w-60" : "h-7 max-w-40", className)}
      />
    );
  }
  return (
    <span className={cn("block truncate font-semibold tracking-tight", size === "lg" ? "text-lg" : "text-sm", className)}>
      {name}
    </span>
  );
}
