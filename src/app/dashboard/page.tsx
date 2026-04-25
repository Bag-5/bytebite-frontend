import { redirect } from "next/navigation";
import { getSession } from "@/lib/server/backend";
import { roleConfig } from "@/lib/constants";

export default async function DashboardIndexPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/sign-in?next=/dashboard");
  }

  const target = roleConfig[session.role]?.path ?? "/dashboard/user";
  redirect(target);
}
