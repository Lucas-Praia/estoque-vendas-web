import { useId } from "react";
import type { FieldProps } from "@/interfaces";
import { classNames } from "@/utils/class-names";

export function Field({ label, error, hint, className, children }: FieldProps) {
  const id = useId();
  const messageId = `${id}-msg`;
  const message = error ?? hint;
  return (
    <div className={classNames("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-xs font-medium text-muted">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": message ? messageId : undefined,
      })}
      {message && (
        <p id={messageId} className={classNames("text-xs", error ? "text-red-700" : "text-muted")}>
          {message}
        </p>
      )}
    </div>
  );
}
