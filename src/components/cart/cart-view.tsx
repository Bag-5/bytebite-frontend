"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem, clearCart, loading } = useCart();

  if (loading) {
    return (
      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardContent className="p-6 text-sm text-white/60">Loading your cart...</CardContent>
      </Card>
    );
  }

  if (!items.length) {
    return (
      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <ShoppingBag className="h-10 w-10 text-cyan-300" />
          <div>
            <p className="text-lg font-semibold text-white">Your cart is empty</p>
            <p className="mt-1 text-sm text-white/60">Browse the menu and add something delicious.</p>
          </div>
          <Link href="/menu" className={buttonVariants({ className: "rounded-full" })}>
            Browse menu
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-white">Cart items</CardTitle>
            <CardDescription className="text-white/60">Update quantities or remove items before checkout.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="rounded-full border-white/10 bg-white/5 text-white" onClick={clearCart}>
            Clear cart
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium text-white">{item.food.name}</h3>
                  <p className="mt-1 text-sm text-white/55">{item.food.vendorName}</p>
                  <p className="mt-2 text-sm font-semibold text-cyan-300">{currency(item.food.price)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full border-white/10 bg-white/5 text-white"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="min-w-10 text-center text-sm font-semibold text-white">{item.quantity}</div>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full border-white/10 bg-white/5 text-white"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full border-white/10 bg-white/5 text-white"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardHeader>
          <CardTitle className="text-xl text-white">Order summary</CardTitle>
          <CardDescription className="text-white/60">A simple checkout summary with clear totals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Subtotal</span>
            <span>{currency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Delivery fee</span>
            <span>$2.50</span>
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Campus service fee</span>
            <span>$1.00</span>
          </div>
          <Separator className="bg-white/10" />
          <div className="flex items-center justify-between text-lg font-semibold text-white">
            <span>Total</span>
            <span>{currency(subtotal + 3.5)}</span>
          </div>
          <Link href="/checkout" className={buttonVariants({ className: "w-full rounded-full" })}>
            Proceed to checkout
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
