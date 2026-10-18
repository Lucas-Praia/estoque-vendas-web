import { redirect } from "next/navigation";
import { fetchMe } from "@/auth/me";

/** Telas de administração: só `is_staff` (o back também recusa o PATCH /company/). */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { me } = await fetchMe();
  if (!me?.is_staff) redirect("/pdv");
  return children;
}
