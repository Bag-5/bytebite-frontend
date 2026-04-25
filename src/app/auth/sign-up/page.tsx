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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  roleHint: z.enum(["user", "vendor"]),
});

type SignUpValues = z.infer<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = useMemo(() => searchParams.get("next") ?? "/dashboard", [searchParams]);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleHint: "user",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json().catch(() => ({}))) as { message?: string };

    if (!response.ok) {
      setServerError(payload.message || "Unable to create account.");
      toast.error(payload.message || "Unable to create account.");
      return;
    }

    toast.success("Account created.");
    router.push(next);
    router.refresh();
  });

  return (
    <AuthShell
      eyebrow="Join ByteBite"
      title="Create your account and unlock campus ordering."
      description="Start with email/password, and use Google when your backend supports it. Vendor access can be provisioned through the same flow or by backend role assignment."
    >
      <Card className="border-white/10 bg-white/5 shadow-glow">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-white">Create account</CardTitle>
          <CardDescription className="text-white/60">We keep onboarding simple and let your backend control the final role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {serverError ? (
            <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{serverError}</p>
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={onSubmit}>
            <input type="hidden" {...register("roleHint")} />
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">
                Full name
              </Label>
              <Input id="name" placeholder="Ava Johnson" className="border-white/10 bg-white/5 text-white placeholder:text-white/35" {...register("name")} />
              {errors.name ? <p className="text-xs text-red-300">{errors.name.message}</p> : null}
            </div>

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
              <Input id="password" type="password" placeholder="Create a strong password" className="border-white/10 bg-white/5 text-white placeholder:text-white/35" {...register("password")} />
              {errors.password ? <p className="text-xs text-red-300">{errors.password.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Account type</Label>
              <Select defaultValue="user" onValueChange={(value) => setValue("roleHint", value as "user" | "vendor")}>
                <SelectTrigger className="w-full border-white/10 bg-white/5 text-white">
                  <SelectValue placeholder="Choose account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Student / customer</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-white/45">Admin access is assigned separately by campus operations.</p>
              {errors.roleHint ? <p className="text-xs text-red-300">{errors.roleHint.message}</p> : null}
            </div>

            <Button type="submit" className="h-11 w-full rounded-full text-sm font-semibold" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create account
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.22em] text-white/45">already have one?</span>
            <Separator className="flex-1 bg-white/10" />
          </div>

          <p className="text-sm text-white/60">
            <Link href="/auth/sign-in" className="font-medium text-cyan-300 hover:text-cyan-200">
              Sign in here
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
