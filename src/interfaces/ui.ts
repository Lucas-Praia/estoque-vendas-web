export interface ChildrenProps {
  children: React.ReactNode;
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  numeric?: boolean;
}

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export interface FieldControlProps {
  id: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

export interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: FieldControlProps) => React.ReactNode;
}

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "primary";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export type KbdProps = React.HTMLAttributes<HTMLElement>;

export type TableContainerProps = React.HTMLAttributes<HTMLDivElement>;
export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
export type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export interface TableCellProps {
  numeric?: boolean;
}

export type ThProps = React.ThHTMLAttributes<HTMLTableCellElement> & TableCellProps;
export type TdProps = React.TdHTMLAttributes<HTMLTableCellElement> & TableCellProps;

export type DialogPlacement = "center" | "right";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  placement?: DialogPlacement;
  className?: string;
}

export type DrawerProps = Omit<DialogProps, "placement">;

export type ToastTone = "success" | "error";

export interface ToastMessage {
  id: number;
  tone: ToastTone;
  message: string;
}

export interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
}

export interface LinearProgressProps {
  active?: boolean;
  className?: string;
}

export interface SkeletonRowsProps {
  rows?: number;
  columns: number;
}

export interface SkeletonLineProps {
  className?: string;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export interface ErrorStateProps {
  error: unknown;
  onRetry?: () => void;
}

export interface InlineAlertProps {
  messages: string[];
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}
