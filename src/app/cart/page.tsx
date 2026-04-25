import { CartView } from "@/components/cart/cart-view";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getSession } from "@/lib/server/backend";

export default async function CartPage() {
  const session = await getSession();
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
      title="Your cart"
      description="Adjust quantities, review the summary, and move into checkout when everything looks right."
      nav={[
        { label: "Browse", href: "/menu" },
        { label: "Cart", href: "/cart", active: true },
        { label: "Orders", href: "/orders" },
      ]}
    >
      <CartView />
    </DashboardShell>
  );
}
