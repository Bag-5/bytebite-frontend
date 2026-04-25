import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Truck, UtensilsCrossed } from "lucide-react";
import { shellStats } from "@/lib/constants";
import { demoFoodItems } from "@/lib/mock";
import { formatGhanaCedis } from "@/lib/money";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-16">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              <BadgeCheck className="h-3.5 w-3.5" />
              Ghana campus delivery
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Fast, polished food delivery for every campus table, desk, and late-night study session in Ghana.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              ByteBite keeps browsing, ordering, vendor management, and admin operations in one elegant frontend connected to your API.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/menu" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Browse menu
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/auth/sign-in" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Sign in
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {shellStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glow">
                <div className="text-2xl font-semibold tracking-tight text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-transparent to-emerald-400/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-glow">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4">
              <div className="flex items-center justify-between border-b border-white/8 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Today&apos;s picks</p>
                  <p className="mt-1 text-lg font-semibold text-white">Popular on your campus</p>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Live
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {demoFoodItems.slice(0, 3).map((item) => (
                  <article key={item.id} className="grid grid-cols-[88px_1fr] gap-3 rounded-2xl border border-white/8 bg-white/5 p-2.5">
                    <div className="relative h-20 overflow-hidden rounded-xl">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-between py-1 pr-2">
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <h2 className="font-medium text-white">{item.name}</h2>
                          <span className="text-sm font-semibold text-cyan-300">{formatGhanaCedis(item.price)}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/60">{item.description}</p>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
                        <span className="inline-flex items-center gap-1">
                          <Truck className="h-3.5 w-3.5" />
                          {item.eta}
                        </span>
                        <span>•</span>
                        <span>{item.vendorName}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Browse & filter quickly",
            desc: "Category filters, rich food cards, and details that make campus menus easy to scan.",
          },
          {
            title: "Order with confidence",
            desc: "Cart, checkout, and order history flows designed to stay clear on both desktop and mobile.",
          },
          {
            title: "Role-aware operations",
            desc: "User, vendor, and admin dashboards each get the navigation and actions they actually need.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
            <UtensilsCrossed className="h-5 w-5 text-cyan-300" />
            <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/65">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
