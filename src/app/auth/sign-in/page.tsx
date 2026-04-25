"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/auth-shell";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignInValues = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = useMemo(() => searchParams.get("next") ?? "/dashboard", [searchParams]);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json().catch(() => ({}))) as { message?: string; user?: { role?: string } };

    if (!response.ok) {
      setServerError(payload.message || "Unable to sign in.");
      toast.error(payload.message || "Unable to sign in.");
      return;
    }

    toast.success("Welcome back to ByteBite.");
    router.push(next);
    router.refresh();
  });

  return (
    <AuthShell
      eyebrow="Secure access"
      title="Sign in and keep your campus orders moving."
      description="Use your email/password or Google sign-in to get into your role-aware dashboard, order history, and live menu flows."
    >
      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-2xl text-white">Sign in</CardTitle>
              <CardDescription className="text-white/60">JWT-backed access for users, vendors, and admins.</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-cyan-400/10 text-cyan-200">
              Campus
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {serverError ? (
            <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{serverError}</p>
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email
              </Label>
              <Input id="email" type="email" placeholder="ava@campus.edu" className="border-white/10 bg-white/5 text-white placeholder:text-white/35" {...register("email")} />
              {errors.email ? <p className="text-xs text-red-300">{errors.email.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">
                Password
              </Label>
              <Input id="password" type="password" placeholder="••••••••" className="border-white/10 bg-white/5 text-white placeholder:text-white/35" {...register("password")} />
              {errors.password ? <p className="text-xs text-red-300">{errors.password.message}</p> : null}
            </div>

            <Button type="submit" className="h-11 w-full rounded-full text-sm font-semibold" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign in
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.22em] text-white/45">or continue with</span>
            <Separator className="flex-1 bg-white/10" />
          </div>

          <GoogleSignInButton />

          <p className="text-sm text-white/60">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="font-medium text-cyan-300 hover:text-cyan-200">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
