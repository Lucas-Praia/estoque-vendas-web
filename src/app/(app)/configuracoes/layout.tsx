import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth/current-user";
import type { ChildrenProps } from "@/interfaces";

export default async function AdminLayout({ children }: ChildrenProps) {
  const { me } = await getCurrentUser();
  if (!me?.is_staff) redirect("/pdv");
  return children;
}
