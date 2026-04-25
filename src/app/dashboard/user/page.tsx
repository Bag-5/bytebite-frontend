import Link from "next/link";
import { ArrowRight, Clock3, PackageSearch, Star, Store } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { roleConfig } from "@/lib/constants";
import { getCategories, getFoods, getOrders, getSession } from "@/lib/server/backend";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { formatGhanaCedis } from "@/lib/money";

export default async function UserDashboardPage() {
  const [session, foods, categories, orders] = await Promise.all([getSession(), getFoods(), getCategories(), getOrders()]);

  if (!session) {
    return null;
  }

  if (session.role !== "user") {
    redirect(roleConfig[session.role].path);
  }

  const nav = [
    { label: "Overview", href: "/dashboard/user", active: true },
    { label: "Menu", href: "/menu" },
    { label: "Cart", href: "/cart" },
    { label: "Orders", href: "/orders" },
  ];

  return (
    <DashboardShell
      role="user"
      session={session}
      title="Welcome back. Your next meal is close."
      description="Browse live food categories, keep tabs on recent orders, and jump straight back into checkout when hunger wins."
      nav={nav}
      stats={[
        { label: "Open orders", value: "2" },
        { label: "Favorite vendors", value: "7" },
        { label: "Saved items", value: "14" },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="border-white/10 bg-white/5 shadow-glow">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl text-white">Trending on campus</CardTitle>
              <CardDescription className="text-white/60">Live menu items available right now.</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-emerald-400/10 text-emerald-200">
              {foods.length} dishes
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {foods.slice(0, 4).map((food) => (
              <article key={food.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">{food.name}</h3>
                    <p className="mt-1 text-sm text-white/55">{food.vendorName}</p>
                  </div>
                    <span className="text-sm font-semibold text-cyan-300">{formatGhanaCedis(food.price)}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/65">{food.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {food.eta}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-300" />
                    {food.rating}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Link href={`/foods/${food.id}`} className={buttonVariants({ size: "sm", className: "rounded-full" })}>
                    View details
                  </Link>
                  <Button variant="outline" size="sm" className="rounded-full border-white/10 bg-white/5 text-white">
                    Add
                  </Button>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent orders</CardTitle>
            <CardDescription className="text-white/60">Your latest campus deliveries and pickup requests.</CardDescription>
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
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-white">{order.id}</TableCell>
                    <TableCell className="text-white/70">{order.status}</TableCell>
                    <TableCell className="text-white/70">{formatGhanaCedis(order.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-white">Categories</CardTitle>
            <CardDescription className="text-white/60">A quick read on what is available right now.</CardDescription>
          </div>
          <Link href="/menu" className={buttonVariants({ variant: "ghost", size: "sm", className: "text-cyan-200 hover:bg-white/10 hover:text-white" })}>
            Explore menu
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-white">
                <Store className="h-4 w-4 text-cyan-300" />
                {category.name}
              </div>
              <p className="mt-2 text-sm text-white/55">Browse the {category.slug} collection for the fastest campus favorites.</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
