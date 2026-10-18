import { cn } from "@/utils/cn";

export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-line bg-subtle px-1 font-mono text-2xs text-muted",
        className,
      )}
      {...props}
    />
  );
}
