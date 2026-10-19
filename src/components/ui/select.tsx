import { forwardRef } from "react";
import type { SelectProps } from "@/interfaces";
import { classNames } from "@/utils/class-names";
import { FORM_CONTROL_CLASSES } from "./form-control-classes";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, ...props }, ref) {
  return <select ref={ref} className={classNames(FORM_CONTROL_CLASSES, "pr-7", className)} {...props} />;
});
