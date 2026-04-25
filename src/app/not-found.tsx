import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-2xl items-center px-4 py-16">
      <Card className="w-full border-white/10 bg-white/5 shadow-glow">
        <CardHeader className="items-center text-center">
          <AlertTriangle className="h-10 w-10 text-amber-300" />
          <CardTitle className="text-3xl text-white">Page not found</CardTitle>
          <CardDescription className="max-w-lg text-white/60">
            The route you asked for does not exist, or it was moved while ByteBite was getting built out.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link href="/" className={buttonVariants({ className: "rounded-full" })}>
            Return home
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
