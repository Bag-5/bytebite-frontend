import type { ComponentType } from "react";
import { BriefcaseBusiness, CircleUserRound, LayoutDashboard, Salad, ShieldCheck, ShoppingBag, Store } from "lucide-react";

export const appName = "ByteBite";
export const appTagline = "Campus food delivery built for speed, clarity, and comfort.";

export type Role = "user" | "vendor" | "admin";

export const roleConfig: Record<
  Role,
  {
    label: string;
    path: string;
    accent: string;
    icon: ComponentType<{ className?: string }>;
  }
> = {
  user: {
    label: "User dashboard",
    path: "/dashboard/user",
    accent: "from-sky-500 to-cyan-400",
    icon: CircleUserRound,
  },
  vendor: {
    label: "Vendor dashboard",
    path: "/dashboard/vendor",
    accent: "from-emerald-500 to-teal-400",
    icon: Store,
  },
  admin: {
    label: "Admin dashboard",
    path: "/dashboard/admin",
    accent: "from-amber-500 to-orange-400",
    icon: ShieldCheck,
  },
};

export const primaryNavigation = [
  { label: "Browse food", href: "/menu", icon: Salad },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
  { label: "Orders", href: "/orders", icon: BriefcaseBusiness },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export const featurePills = ["JWT auth", "Google sign-in", "Role dashboards", "Responsive UI", "Vercel ready", "Render backend"];

export const shellStats = [
  { label: "Orders delivered today", value: "1,284" },
  { label: "Partner vendors", value: "78" },
  { label: "On-time rate", value: "98.6%" },
];
