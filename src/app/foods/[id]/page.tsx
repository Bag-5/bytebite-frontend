import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Star } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodDetailActions } from "@/components/menu/food-detail-actions";
import { getFoodById, getSession } from "@/lib/server/backend";
import { formatGhanaCedis } from "@/lib/money";

export default async function FoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [session, food] = await Promise.all([getSession(), getFoodById(id)]);

  if (!food) {
    notFound();
  }

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
      title={food.name}
      description={food.description}
      nav={[
        { label: "Browse", href: "/menu" },
        { label: "Cart", href: "/cart" },
        { label: "Orders", href: "/orders" },
      ]}
    >
      <Card className="overflow-hidden border-white/10 bg-white/5 shadow-glow">
        <div className="relative h-80">
          <Image src={food.image} alt={food.name} fill className="object-cover" />
        </div>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-3xl text-white">{food.name}</CardTitle>
              <CardDescription className="text-white/60">{food.vendorName}</CardDescription>
            </div>
            <div className="text-3xl font-semibold text-cyan-300">{formatGhanaCedis(food.price)}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/10 bg-white/5 text-white/70">
              {food.category}
            </Badge>
            <Badge variant="secondary" className="bg-emerald-400/10 text-emerald-200">
              <Clock3 className="mr-1.5 h-3.5 w-3.5" />
              {food.eta}
            </Badge>
            <Badge variant="secondary" className="bg-amber-400/10 text-amber-200">
              <Star className="mr-1.5 h-3.5 w-3.5" />
              {food.rating}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="max-w-3xl text-base leading-7 text-white/70">{food.description}</p>
          <FoodDetailActions food={food} />
          <Link href="/menu" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
            <ArrowLeft className="h-4 w-4" />
            Back to menu
          </Link>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
