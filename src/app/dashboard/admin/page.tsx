import { ShieldCheck, Users, UtensilsCrossed, PackageSearch } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoUsers } from "@/lib/mock";
import { roleConfig } from "@/lib/constants";
import { getFoods, getOrders, getSession, getUsers } from "@/lib/server/backend";
import { redirect } from "next/navigation";
import { formatGhanaCedis } from "@/lib/money";

export default async function AdminDashboardPage() {
  const [session, users, foods, orders] = await Promise.all([getSession(), getUsers(), getFoods(), getOrders()]);

  if (!session) {
    return null;
  }

  if (session.role !== "admin") {
    redirect(roleConfig[session.role].path);
  }

  const nav = [
    { label: "Overview", href: "/dashboard/admin", active: true },
    { label: "Users", href: "/dashboard/admin" },
    { label: "Foods", href: "/menu" },
    { label: "Orders", href: "/orders" },
  ];

  return (
    <DashboardShell
      role="admin"
      session={session}
      title="Keep the marketplace healthy."
      description="Monitor users, vendors, food catalog quality, and order health from one command surface."
      nav={nav}
      stats={[
        { label: "Total users", value: String(users.length || demoUsers.length) },
        { label: "Live foods", value: String(foods.length) },
        { label: "Open orders", value: String(orders.filter((order) => order.status !== "Delivered").length) },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-white/10 bg-white/5 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl text-white">Platform health</CardTitle>
            <CardDescription className="text-white/60">A compact view of the highest-signal campus metrics.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Approved vendors", value: "42", icon: UtensilsCrossed },
              { label: "Active users", value: "8,214", icon: Users },
              { label: "Escalations", value: "3", icon: ShieldCheck },
              { label: "Catalog items", value: String(foods.length), icon: PackageSearch },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <Icon className="h-4 w-4 text-cyan-300" />
                  <div className="mt-3 text-2xl font-semibold text-white">{item.value}</div>
                  <div className="text-xs text-white/55">{item.label}</div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl text-white">Users and roles</CardTitle>
            <CardDescription className="text-white/60">A clear table for review and access checks.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white/50">Name</TableHead>
                  <TableHead className="text-white/50">Role</TableHead>
                  <TableHead className="text-white/50">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-white">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-white/50">{user.email}</div>
                    </TableCell>
                    <TableCell className="text-white/70">{user.role}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/10 bg-white/5 text-white/70">
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

        <Card className="border-white/10 bg-white/5 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl text-white">Orders and catalog</CardTitle>
            <CardDescription className="text-white/60">A compact overview of food items and order totals.</CardDescription>
          </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white/50">Order</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
                <TableHead className="text-white/50">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-white">{order.id}</TableCell>
                  <TableCell className="text-white/70">{order.status}</TableCell>
                  <TableCell className="text-white/70">{formatGhanaCedis(order.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="space-y-3">
            {foods.slice(0, 4).map((food) => (
              <div key={food.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{food.name}</p>
                    <p className="text-xs text-white/50">{food.vendorName}</p>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-400/10 text-emerald-200">
                    {formatGhanaCedis(food.price)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
