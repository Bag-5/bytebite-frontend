import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CheckoutPanel } from "@/components/checkout/checkout-panel";
import { getSession } from "@/lib/server/backend";

export default async function CheckoutPage() {
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
      title="Checkout"
      description="Finalize your order with a clear delivery form and a compact review panel."
      nav={[
        { label: "Browse", href: "/menu" },
        { label: "Cart", href: "/cart" },
        { label: "Checkout", href: "/checkout", active: true },
      ]}
    >
      <CheckoutPanel />
    </DashboardShell>
  );
}
