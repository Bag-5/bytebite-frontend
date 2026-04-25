import Link from "next/link";
import { BarChart3, Plus, Receipt, Store, TrendingUp } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoFoodItems } from "@/lib/mock";
import { roleConfig } from "@/lib/constants";
import { getFoods, getSession } from "@/lib/server/backend";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { formatGhanaCedis } from "@/lib/money";

export default async function VendorDashboardPage() {
  const [session, foods] = await Promise.all([getSession(), getFoods()]);

  if (!session) {
    return null;
  }

  if (session.role !== "vendor") {
    redirect(roleConfig[session.role].path);
  }

  const nav = [
    { label: "Overview", href: "/dashboard/vendor", active: true },
    { label: "Menu management", href: "/dashboard/vendor" },
    { label: "Orders", href: "/orders" },
    { label: "Foods", href: "/menu" },
  ];

  return (
    <DashboardShell
      role="vendor"
      session={session}
      title="Keep your kitchen flowing smoothly."
      description="Track menu performance, update availability, and review how your items are converting into orders."
      nav={nav}
      stats={[
        { label: "Items live", value: String(foods.length || demoFoodItems.length) },
        { label: "Conversion rate", value: "31%" },
        { label: "Today&apos;s revenue", value: formatGhanaCedis(2480) },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-white/10 bg-white/5 shadow-glow">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl text-white">Menu inventory</CardTitle>
              <CardDescription className="text-white/60">Update items, prices, and availability without losing the larger picture.</CardDescription>
            </div>
            <Button size="sm" className="rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              New item
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {foods.slice(0, 4).map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <Badge variant="secondary" className="bg-emerald-400/10 text-emerald-200">
                      Live
                    </Badge>
                  </div>
                  <p className="text-sm text-white/60">{item.vendorName}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span>{formatGhanaCedis(item.price)}</span>
                  <span>{item.eta}</span>
                  <Button variant="outline" size="sm" className="rounded-full border-white/10 bg-white/5 text-white">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-white/10 bg-white/5 shadow-glow">
            <CardHeader>
              <CardTitle className="text-xl text-white">Performance</CardTitle>
              <CardDescription className="text-white/60">The numbers that matter when you&apos;re shipping meals all day.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Orders accepted", value: "126", icon: Receipt },
                { label: "Avg prep time", value: "11 min", icon: Store },
                { label: "Revenue growth", value: "+18%", icon: TrendingUp },
                { label: "Menu health", value: "94%", icon: BarChart3 },
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
              <CardTitle className="text-xl text-white">Quick actions</CardTitle>
              <CardDescription className="text-white/60">The day-to-day controls vendors usually reach for first.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/orders" className={buttonVariants({ className: "w-full rounded-full" })}>
                Review orders
              </Link>
              <Link
                href="/menu"
                className={buttonVariants({ variant: "outline", className: "w-full rounded-full border-white/10 bg-white/5 text-white" })}
              >
                View public menu
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
