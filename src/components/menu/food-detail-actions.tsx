"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import type { FoodItem } from "@/lib/mock";

export function FoodDetailActions({ food }: Readonly<{ food: FoodItem }>) {
  const { addItem } = useCart();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        className="rounded-full"
        onClick={() => {
          addItem(food, 1);
        }}
      >
        Add to cart
      </Button>
      <Link href="/cart" className={buttonVariants({ variant: "outline", className: "rounded-full border-white/10 bg-white/5 text-white" })}>
        Go to cart
      </Link>
    </div>
  );
}
