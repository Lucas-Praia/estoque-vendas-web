import { redirect } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { ErrorState } from "@/components/ui/error-state";
import { getCurrentUser } from "@/auth/current-user";
import { SessionProvider } from "@/auth/session";
import { NETWORK_ERROR } from "@/lib/api-error";
import { fetchCompany } from "@/lib/api-server";

export default async function AuthenticatedLayout({ children }: LayoutProps<"/">) {
  const [result, company] = await Promise.all([getCurrentUser(), fetchCompany()]);

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
      <AppLayout>{children}</AppLayout>
    </SessionProvider>
  );
}
