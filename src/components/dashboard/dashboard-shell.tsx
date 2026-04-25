import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight, Shield, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { roleConfig, type Role } from "@/lib/constants";
import { LogoutButton } from "@/components/dashboard/logout-button";
import type { UserSession } from "@/lib/mock";
import { ThemeToggle } from "@/components/theme-toggle";

export interface DashboardNavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface DashboardShellProps {
  role: Role;
  session: UserSession;
  title: string;
  description: string;
  nav: DashboardNavItem[];
  children: ReactNode;
  stats?: { label: string; value: string }[];
}

export function DashboardShell({ role, session, title, description, nav, children, stats = [] }: DashboardShellProps) {
  const roleMeta = roleConfig[role];
  const RoleIcon = roleMeta.icon;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <Card className="border-white/10 bg-white/5 shadow-glow">
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${roleMeta.accent} text-slate-950 shadow-lg`}>
                  <RoleIcon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">{roleMeta.label}</CardTitle>
                  <CardDescription className="text-white/60">{session.email}</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="w-fit border-white/10 bg-white/5 text-white/70">
                <Shield className="mr-1.5 h-3.5 w-3.5" />
                Role secured
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <Image
                  src={session.avatarUrl || "/bytebit-logo1.png"}
                  alt={session.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{session.name}</p>
                  <p className="truncate text-xs text-white/55">{session.role}</p>
                </div>
              </div>

              <div className="space-y-2">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-2xl px-3 py-2 text-sm transition ${
                      item.active ? "bg-white text-slate-950" : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>

              <Separator className="bg-white/10" />
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <LogoutButton />
              </div>
            </CardContent>
          </Card>

          {stats.length ? (
            <Card className="border-white/10 bg-white/5 shadow-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">Quick stats</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <div className="text-lg font-semibold text-white">{stat.value}</div>
                    <div className="text-xs text-white/55">{stat.label}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </aside>

        <section className="space-y-6">
          <Card className="border-white/10 bg-white/5 shadow-glow">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    <Star className="h-3.5 w-3.5" />
                    {roleMeta.label}
                  </div>
                  <CardTitle className="text-3xl text-white">{title}</CardTitle>
                  <CardDescription className="max-w-2xl text-white/60">{description}</CardDescription>
                </div>

                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Browse live menu
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
          </Card>

          {children}
        </section>
      </div>
    </main>
  );
}
