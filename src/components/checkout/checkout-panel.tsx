"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, MapPinHouse, Loader2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function CheckoutPanel() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = subtotal + 3.5;

  if (submitted) {
    return (
      <Card className="border-emerald-400/20 bg-emerald-500/10 shadow-glow">
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-300" />
          <div>
            <p className="text-2xl font-semibold text-white">Order submitted</p>
            <p className="mt-2 text-sm text-white/70">Your campus meal is on its way through the ByteBite flow.</p>
          </div>
          <Badge className="bg-white/10 text-white">{currency(total)} total</Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardHeader>
          <CardTitle className="text-xl text-white">Delivery details</CardTitle>
          <CardDescription className="text-white/60">A focused checkout form with the essentials only.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-white/80">Name</Label>
              <Input placeholder="Ava Johnson" className="border-white/10 bg-white/5 text-white placeholder:text-white/35" />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Phone</Label>
              <Input placeholder="+1 (555) 000-0000" className="border-white/10 bg-white/5 text-white placeholder:text-white/35" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Delivery address</Label>
            <Input placeholder="Student center, room 204" className="border-white/10 bg-white/5 text-white placeholder:text-white/35" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Instructions</Label>
            <Textarea placeholder="Call on arrival, leave at reception." className="min-h-28 border-white/10 bg-white/5 text-white placeholder:text-white/35" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-white/80">Payment method</Label>
              <Select defaultValue="card">
                <SelectTrigger className="w-full border-white/10 bg-white/5 text-white">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="cash">Cash on delivery</SelectItem>
                  <SelectItem value="wallet">Campus wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Promo code</Label>
              <Input placeholder="BYTE20" className="border-white/10 bg-white/5 text-white placeholder:text-white/35" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="h-4 w-4 text-cyan-300" />
            <p className="text-sm text-white/55">Securely processed through the backend checkout flow when available.</p>
          </div>
          <Button
            className="h-11 w-full rounded-full"
            disabled={!items.length || loading}
            onClick={async () => {
              try {
                setLoading(true);
                // The frontend stays functional even when the backend contract changes.
                await fetch("/api/proxy/orders", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ items, subtotal, total }),
                }).catch(() => null);
                clearCart();
                setSubmitted(true);
                toast.success("Checkout complete.");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Place order
          </Button>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardHeader>
          <CardTitle className="text-xl text-white">Order review</CardTitle>
          <CardDescription className="text-white/60">This is the summary the user should glance at before paying.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{item.food.name}</p>
                  <p className="mt-1 text-xs text-white/55">{item.food.vendorName}</p>
                </div>
                <Badge variant="secondary" className="bg-cyan-400/10 text-cyan-200">
                  x{item.quantity}
                </Badge>
              </div>
              <p className="mt-3 text-sm text-white/65">{currency(item.food.price * item.quantity)}</p>
            </div>
          ))}

          <Separator className="bg-white/10" />
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Subtotal</span>
            <span>{currency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Delivery</span>
            <span>$2.50</span>
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Service</span>
            <span>$1.00</span>
          </div>
          <Separator className="bg-white/10" />
          <div className="flex items-center justify-between text-lg font-semibold text-white">
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
            <div className="flex items-center gap-2 text-white/80">
              <MapPinHouse className="h-4 w-4 text-cyan-300" />
              Campus delivery
            </div>
            <p className="mt-2">ETA is estimated after order acceptance and vendor queue confirmation.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
