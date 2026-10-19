import type { CompanyLogoProps, CompanyLogoSize } from "@/interfaces";
import { mediaUrl } from "@/lib/api-client";
import { classNames } from "@/utils/class-names";

const logoSizes: Record<CompanyLogoSize, string> = {
  sm: "h-8 max-w-36",
  md: "h-auto w-full max-h-32",
  lg: "h-14 max-w-64",
};

const nameSizes: Record<CompanyLogoSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function CompanyLogo({ company, size = "sm", className }: CompanyLogoProps) {
  const logo = mediaUrl(company?.im_logo);
  const name = company?.tx_name ?? "";

  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo} alt={name} className={classNames("w-auto object-contain", logoSizes[size], className)} />
    );
  }
  return (
    <span className={classNames("block truncate font-semibold tracking-tight", nameSizes[size], className)}>{name}</span>
  );
}
