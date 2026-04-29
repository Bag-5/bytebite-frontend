import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, Search, ShoppingBag } from "lucide-react";
import { appName, primaryNavigation } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white p-1 shadow-glow">
            <Image src="/bytebit-logo1.png" alt={`${appName} logo`} width={64} height={64} priority className="h-14 w-14 object-contain" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold tracking-tight text-white">{appName}</span>
            <span className="block text-xs font-bold text-sky-300">Campus food delivery</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/5 p-1 md:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/8 hover:text-white"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white sm:inline-flex">
            <Search className="h-4 w-4" />
          </button>
          <button type="button" className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white sm:inline-flex">
            <Bell className="h-4 w-4" />
          </button>
          <Link href="/cart" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white px-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100 sm:px-4">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
          </Link>
          <ThemeToggle />
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white md:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
