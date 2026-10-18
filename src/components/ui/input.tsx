import { forwardRef, useId } from "react";
import { cn } from "@/utils/cn";

const control =
  "h-8 w-full rounded-md border border-line bg-canvas px-2 text-sm text-ink placeholder:text-neutral-400 " +
  "disabled:bg-subtle disabled:text-muted aria-[invalid=true]:border-red-500";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Fonte mono com números tabulares, para códigos, quantidades e valores. */
  numeric?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { numeric, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(control, numeric && "font-mono tabular-nums text-right", className)}
      {...props}
    />
  );
});

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, ...props }, ref) {
    return <select ref={ref} className={cn(control, "pr-7", className)} {...props} />;
  },
);

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  /** Recebe o id e os atributos de acessibilidade para ligar label, erro e controle. */
  children: (props: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => React.ReactNode;
}

/** Label + controle + mensagem de erro (como veio da API ou do Zod). */
export function Field({ label, error, hint, className, children }: FieldProps) {
  const id = useId();
  const messageId = `${id}-msg`;
  const message = error ?? hint;
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-xs font-medium text-muted">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": message ? messageId : undefined,
      })}
      {message && (
        <p id={messageId} className={cn("text-xs", error ? "text-red-700" : "text-muted")}>
          {message}
        </p>
      )}
    </div>
  );
}
