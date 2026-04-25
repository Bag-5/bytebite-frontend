"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Clock3, Filter, Plus, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/components/cart/cart-provider";
import type { Category, FoodItem } from "@/lib/mock";

interface MenuBrowserProps {
  categories: Category[];
  foods: FoodItem[];
}

export function MenuBrowser({ categories, foods }: MenuBrowserProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();

  const visibleFoods = useMemo(() => {
    if (activeCategory === "all") {
      return foods;
    }
    return foods.filter((food) => food.category.toLowerCase() === activeCategory);
  }, [activeCategory, foods]);

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-white">Filter by category</CardTitle>
            <CardDescription className="text-white/60">A compact filter bar that keeps the menu easy to scan.</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-cyan-400/10 text-cyan-200">
            <Filter className="mr-1.5 h-3.5 w-3.5" />
            {visibleFoods.length} items
          </Badge>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.slug}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleFoods.map((food) => (
          <Card key={food.id} className="border-white/10 bg-white/5 shadow-glow">
            <div className="relative h-48">
              <Image src={food.image} alt={food.name} fill className="object-cover" />
            </div>
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg text-white">{food.name}</CardTitle>
                  <CardDescription className="text-white/60">{food.vendorName}</CardDescription>
                </div>
                <span className="text-lg font-semibold text-cyan-300">${food.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/55">
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {food.eta}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-300" />
                  {food.rating}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-white/65">{food.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-white/10 bg-white/5 text-white/70">
                  {food.category}
                </Badge>
                {food.featured ? (
                  <Badge variant="secondary" className="bg-emerald-400/10 text-emerald-200">
                    Featured
                  </Badge>
                ) : null}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 rounded-full" onClick={() => addItem(food)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
                <Link
                  href={`/foods/${food.id}`}
                  className={buttonVariants({ variant: "outline", className: "rounded-full border-white/10 bg-white/5 text-white" })}
                >
                  Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
