import type { NextResponse } from "next/server";
import type { z } from "zod";
import type { loginSchema } from "@/auth/schemas";
import type { Company, Me } from "./api";

export type LoginInput = z.infer<typeof loginSchema>;

export interface AuthTokens {
  access: string;
  refresh?: string;
}

export type CookieJar = Pick<NextResponse["cookies"], "set" | "delete">;

export type CurrentUserResult = { me: Me } | { me: null; status: number };

export interface Session {
  me: Me;
  company: Company | null;
}

export interface SessionProviderProps {
  value: Session;
  children: React.ReactNode;
}

export interface LoginFormProps {
  next: string;
}
