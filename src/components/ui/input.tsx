import { forwardRef } from "react";
import type { InputProps } from "@/interfaces";
import { classNames } from "@/utils/class-names";
import { FORM_CONTROL_CLASSES } from "./form-control-classes";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ numeric, className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={classNames(FORM_CONTROL_CLASSES, numeric && "font-mono tabular-nums text-right", className)}
      {...props}
    />
  );
});
