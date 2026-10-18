"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { cn } from "@/utils/cn";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** "center" para diálogos; "right" para o painel lateral de formulários. */
  placement?: "center" | "right";
  className?: string;
}

/**
 * Baseado no <dialog> nativo: foco preso, Esc fecha e o foco volta ao elemento
 * que abriu — o que o PDV precisa para operar só no teclado.
 */
export function Dialog({ open, onClose, title, description, children, footer, placement = "center", className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={titleId}
      className={cn(
        "m-0 max-h-none max-w-none border-line bg-canvas p-0 text-ink backdrop:bg-neutral-900/30",
        placement === "center" &&
          "top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md border",
        placement === "right" && "top-0 right-0 left-auto h-full w-full max-w-lg border-l",
        className,
      )}
    >
      {open && (
        <div className="flex h-full max-h-[inherit] flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-line px-4 py-3">
            <div>
              <h2 id={titleId} className="text-sm font-semibold">
                {title}
              </h2>
              {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
            </div>
            <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-md p-1 text-muted hover:bg-subtle">
              <X className="size-4" aria-hidden />
            </button>
          </header>
          <div className="min-h-0 flex-1 overflow-auto px-4 py-3">{children}</div>
          {footer && <footer className="flex justify-end gap-2 border-t border-line px-4 py-3">{footer}</footer>}
        </div>
      )}
    </dialog>
  );
}

export function Drawer(props: Omit<DialogProps, "placement">) {
  return <Dialog {...props} placement="right" />;
}
