import type { KbdProps } from "@/interfaces";
import { classNames } from "@/utils/class-names";

export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={classNames(
        "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-line bg-subtle px-1 font-mono text-2xs text-muted",
        className,
      )}
      {...props}
    />
  );
}
