import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BrandMark } from "@/components/layout/brand-mark";
import { LoginForm } from "@/features/auth/components/login-form";
import { fetchCompany, fetchMe } from "@/lib/api-server";
import { safeNextPath } from "@/lib/safe-next";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextPath = safeNextPath(typeof next === "string" ? next : null);

  // Já logado de verdade (o back confirmou)? Vai direto. Cookie inválido cai no formulário.
  const [{ me }, company] = await Promise.all([fetchMe(), fetchCompany()]);
  if (me) redirect(nextPath);

  return (
    <main className="grid min-h-full place-items-center bg-subtle px-4">
      <div className="w-full max-w-sm border border-line bg-canvas">
        {company && (
          <div className="flex min-h-20 items-center border-b border-line px-6 py-4">
            <BrandMark company={company} size="lg" />
          </div>
        )}
        <div className="px-6 py-5">
          <h1 className="mb-4 text-sm font-semibold">Entrar no sistema</h1>
          <LoginForm next={nextPath} />
        </div>
        {company?.tx_cnpj && (
          <p className="border-t border-line px-6 py-2 font-mono text-2xs text-muted">CNPJ {company.tx_cnpj}</p>
        )}
      </div>
    </main>
  );
}
