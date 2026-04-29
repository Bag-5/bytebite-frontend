"use client";

import { MoonStar, MonitorSmartphone, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

const options = [
  { label: "System", value: "system", icon: MonitorSmartphone },
  { label: "Light", value: "light", icon: SunMedium },
  { label: "Dark", value: "dark", icon: MoonStar },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur sm:rounded-full">
      {options.map((option) => {
        const Icon = option.icon;
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition sm:rounded-full sm:px-3 ${
              active ? "bg-white text-slate-950 shadow-sm" : "text-white/70 hover:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
