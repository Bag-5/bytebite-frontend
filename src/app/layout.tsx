import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { appName, appTagline } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appTagline,
  metadataBase: new URL("https://bytebite.vercel.app"),
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body>
        <Providers>
          <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
          <div className="min-h-dvh">
            <SiteHeader />
            {children}
          </div>
          <Toaster position="top-right" richColors theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
