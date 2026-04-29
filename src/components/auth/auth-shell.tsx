import Image from "next/image";
import type { ReactNode } from "react";
import { ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import { appName, authHighlights } from "@/lib/constants";

export function AuthShell({ children, eyebrow, title, description }: Readonly<{ children: ReactNode; eyebrow: string; title: string; description: string }>) {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow lg:p-8">
        <div className="absolute inset-0 bg-hero-grid opacity-80" />
        <div className="relative space-y-6">
          <div className="flex items-center gap-3">
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white p-1">
              <Image src="/bytebit-logo1.png" alt={`${appName} logo`} width={64} height={64} className="h-14 w-14 object-contain" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">{eyebrow}</p>
              <h1 className="mt-1 text-2xl font-semibold text-white">{appName}</h1>
            </div>
          </div>

          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
            <p className="max-w-lg text-sm leading-6 text-white/70 sm:text-base sm:leading-7">{description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {authHighlights.map((pill) => (
              <span key={pill} className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/75">
                {pill}
              </span>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Campus dining", icon: ShieldCheck },
              { label: "Fast checkout", icon: UtensilsCrossed },
              { label: "Polished experience", icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative">{children}</section>
    </main>
  );
}
