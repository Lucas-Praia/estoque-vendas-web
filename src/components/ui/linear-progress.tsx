import type { LinearProgressProps } from "@/interfaces";
import { classNames } from "@/utils/class-names";

export function LinearProgress({ active = true, className }: LinearProgressProps) {
  return (
    <div
      role="progressbar"
      aria-label="Carregando"
      aria-hidden={!active}
      className={classNames("relative h-0.5 w-full overflow-hidden", active ? "bg-primary/10" : "bg-transparent", className)}
    >
      {active && <div className="absolute inset-y-0 left-0 w-2/5 animate-progress bg-primary" />}
    </div>
  );
}
