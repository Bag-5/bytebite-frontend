import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/server/backend";

export default async function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/sign-in?next=/dashboard");
  }

  return children;
}
