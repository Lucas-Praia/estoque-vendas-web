"use client";

import { createContext, useContext } from "react";
import type { Company, Me } from "@/types";

interface Session {
  me: Me;
  company: Company | null;
}

const SessionContext = createContext<Session | null>(null);

/** Usuário e empresa carregados no servidor pelo layout (app). */
export function SessionProvider({ value, children }: { value: Session; children: React.ReactNode }) {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession precisa estar dentro do layout autenticado.");
  return ctx;
}
