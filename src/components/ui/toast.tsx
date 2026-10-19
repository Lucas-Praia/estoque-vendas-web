"use client";

import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ChildrenProps, ToastApi, ToastMessage, ToastTone } from "@/interfaces";
import { classNames } from "@/utils/class-names";

const ToastContext = createContext<ToastApi | null>(null);
const DURATION_MS = 4000;

export function ToastProvider({ children }: ChildrenProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const push = useCallback(
    (tone: ToastTone, message: string) => {
      const id = ++nextId.current;
      setToasts((list) => [...list.slice(-3), { id, tone, message }]);
      setTimeout(() => dismiss(id), tone === "error" ? DURATION_MS * 2 : DURATION_MS);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({ success: (m) => push("success", m), error: (m) => push("error", m) }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-80 flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === "error" ? "alert" : "status"}
            className="pointer-events-auto flex items-start gap-2 rounded-md border border-line bg-canvas px-3 py-2 text-sm"
          >
            {t.tone === "success" ? (
              <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-green-700" />
            ) : (
              <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-red-600" />
            )}
            <p className={classNames("flex-1", t.tone === "error" && "text-red-800")}>{t.message}</p>
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Fechar aviso" className="text-muted">
              <X aria-hidden className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast precisa de <ToastProvider>.");
  return ctx;
}
