import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/auth/login-form";
import { getCurrentUser } from "@/auth/current-user";
import { getSafeRedirectPath } from "@/auth/redirect-path";
import { CompanyLogo } from "@/components/layout/company-logo";
import { fetchCompany } from "@/lib/api-server";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextPath = getSafeRedirectPath(typeof next === "string" ? next : null);

  const [{ me }, company] = await Promise.all([getCurrentUser(), fetchCompany()]);
  if (me) redirect(nextPath);

  return (
    <main className="grid min-h-full place-items-center bg-subtle px-4">
      <div className="w-full max-w-sm border border-line bg-canvas">
        {company && (
          <div className="flex min-h-12 items-center justify-center border-b border-line px-6 py-4">
            <CompanyLogo company={company} size="lg" />
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
