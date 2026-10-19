import type { SkeletonLineProps, SkeletonRowsProps } from "@/interfaces";
import { classNames } from "@/utils/class-names";

export function SkeletonRows({ rows = 8, columns }: SkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, r) => (
        <tr key={r} aria-hidden>
          {Array.from({ length: columns }, (_, c) => (
            <td key={c} className="border-b border-line px-2 py-1.5">
              <div className="h-3 rounded-sm bg-neutral-100" style={{ width: `${40 + ((r * 7 + c * 13) % 50)}%` }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function SkeletonLine({ className }: SkeletonLineProps) {
  return <div aria-hidden className={classNames("h-3 rounded-sm bg-neutral-100", className)} />;
}
