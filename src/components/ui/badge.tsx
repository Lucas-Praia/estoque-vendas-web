import { cn } from "@/utils/cn";

type Tone = "neutral" | "success" | "warning" | "danger" | "primary";

const tones: Record<Tone, string> = {
  neutral: "border-line text-muted",
  success: "border-green-200 text-green-800",
  warning: "border-amber-300 text-amber-800",
  danger: "border-red-200 text-red-700",
  primary: "border-primary/30 text-primary",
};

/** Status discreto: só borda e texto, nunca bloco colorido. */
export function Badge({ tone = "neutral", className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 text-2xs font-medium uppercase tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
