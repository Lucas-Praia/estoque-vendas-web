import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { ErrorState } from "@/components/ui/states";
import { fetchMe } from "@/auth/me";
import { SessionProvider } from "@/auth/session";
import { NETWORK_ERROR } from "@/lib/api-error";
import { fetchCompany } from "@/lib/api-server";

/** Área autenticada. O proxy.ts já renovou o access; aqui só validamos com /auth/me/. */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  const [result, company] = await Promise.all([fetchMe(), fetchCompany()]);

  if (!result.me) {
    if (result.status === 401 || result.status === 403) redirect("/login");
    return (
      <main className="grid h-full place-items-center">
        <ErrorState error={NETWORK_ERROR} />
      </main>
    );
  }

  return (
    <SessionProvider value={{ me: result.me, company }}>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </SessionProvider>
  );
}
