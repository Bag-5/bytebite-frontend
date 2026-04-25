import { MenuBrowser } from "@/components/menu/menu-browser";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCategories, getFoods, getSession } from "@/lib/server/backend";
import { Salad } from "lucide-react";

export default async function MenuPage() {
  const [session, categories, foods] = await Promise.all([getSession(), getCategories(), getFoods()]);

  const shellSession =
    session || {
      id: "guest",
      name: "Guest visitor",
      email: "guest@bytebite.app",
      role: "user" as const,
    };

  return (
    <DashboardShell
      role={shellSession.role}
      session={shellSession}
      title="Browse the live menu."
      description="Use category filters, inspect item details, and add food to your cart without losing your place."
      nav={[
        { label: "Browse", href: "/menu", active: true },
        { label: "Cart", href: "/cart" },
        { label: "Orders", href: "/orders" },
      ]}
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-200">
            <Salad className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Campus menu</p>
            <p className="text-lg font-semibold text-white">Fresh, fast, and ready for ordering</p>
          </div>
        </div>
        <MenuBrowser categories={categories} foods={foods} />
      </div>
    </DashboardShell>
  );
}
