import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/auth/tokens";

/** Sem endpoint de logout no back (JWT sem blacklist): basta apagar os cookies. */
export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  clearAuthCookies(res.cookies);
  return res;
}
