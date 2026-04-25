import { CalendarDays, Truck, CheckCircle2, CircleDashed } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrders, getSession } from "@/lib/server/backend";
import { formatGhanaCedis } from "@/lib/money";

const statusIcon = {
  Pending: CircleDashed,
  Preparing: Truck,
  Delivered: CheckCircle2,
  Cancelled: CalendarDays,
} as const;

export default async function OrdersPage() {
  const [session, orders] = await Promise.all([getSession(), getOrders()]);
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
      title="Order history"
      description="A clean history surface for users, vendors, and admins to review recent activity."
      nav={[
        { label: "Browse", href: "/menu" },
        { label: "Orders", href: "/orders", active: true },
        { label: "Cart", href: "/cart" },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-white/10 bg-white/5 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl text-white">Order status overview</CardTitle>
            <CardDescription className="text-white/60">A small set of counts keeps the current queue legible.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Preparing", value: orders.filter((order) => order.status === "Preparing").length },
              { label: "Delivered", value: orders.filter((order) => order.status === "Delivered").length },
              { label: "Pending", value: orders.filter((order) => order.status === "Pending").length },
              { label: "Cancelled", value: orders.filter((order) => order.status === "Cancelled").length },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="text-2xl font-semibold text-white">{item.value}</div>
                <div className="text-xs text-white/55">{item.label}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent orders</CardTitle>
            <CardDescription className="text-white/60">Readable at a glance, with the important columns first.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white/50">Order</TableHead>
                  <TableHead className="text-white/50">Status</TableHead>
                  <TableHead className="text-white/50">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const Icon = statusIcon[order.status];
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="text-white">{order.id}</TableCell>
                      <TableCell className="text-white/70">
                        <Badge variant="outline" className="border-white/10 bg-white/5 text-white/70">
                          <Icon className="mr-1.5 h-3.5 w-3.5" />
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white/70">{formatGhanaCedis(order.total)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
