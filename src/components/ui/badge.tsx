import type { BadgeProps, BadgeTone } from "@/interfaces";
import { classNames } from "@/utils/class-names";

const tones: Record<BadgeTone, string> = {
  neutral: "border-line text-muted",
  success: "border-green-200 text-green-800",
  warning: "border-amber-300 text-amber-800",
  danger: "border-red-200 text-red-700",
  primary: "border-primary/30 text-primary",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-sm border px-1.5 text-2xs font-medium uppercase tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
