"use client";

import { createContext, useContext } from "react";
import type { Session, SessionProviderProps } from "@/interfaces";

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ value, children }: SessionProviderProps) {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession precisa estar dentro do layout autenticado.");
  return ctx;
}
