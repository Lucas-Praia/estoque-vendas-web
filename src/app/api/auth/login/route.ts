import { NextResponse } from "next/server";
import { setAuthCookies } from "@/auth/tokens";
import { serverApi } from "@/lib/api-server";
import { loginSchema } from "@/auth/schemas";

/** Troca usuário/senha por tokens no Django e os guarda em cookies httpOnly. */
export async function POST(req: Request) {
  const parsed = loginSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ detail: "Informe usuário e senha." }, { status: 400 });
  }

  try {
    const { data, error, response } = await serverApi().POST("/api/auth/token/", {
      body: parsed.data,
    });
    if (!data) {
      // Repassa a mensagem do back como veio (ex.: credenciais inválidas).
      return NextResponse.json(error ?? {}, { status: response.status });
    }
    const res = NextResponse.json({ ok: true });
    setAuthCookies(res.cookies, data);
    return res;
  } catch {
    return NextResponse.json(
      { detail: "Não foi possível conectar ao servidor. Verifique a rede e tente de novo." },
      { status: 502 },
    );
  }
}
