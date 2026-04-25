"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface GoogleSignInButtonProps {
  className?: string;
  redirectTo?: string;
}

export function GoogleSignInButton({ className, redirectTo = "/dashboard" }: GoogleSignInButtonProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const clientId = useMemo(() => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim(), []);

  useEffect(() => {
    if (!clientId || !ref.current || !window.google?.accounts?.id) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        if (!response.credential) {
          toast.error("Google sign-in did not return a credential.");
          return;
        }

        try {
          setLoading(true);
          const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ credential: response.credential }),
          });

          const payload = (await res.json().catch(() => ({}))) as { message?: string; user?: unknown };

          if (!res.ok) {
            throw new Error(payload.message || "Google sign-in failed.");
          }

          toast.success("Signed in with Google.");
          router.push(redirectTo);
          router.refresh();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Google sign-in failed.");
        } finally {
          setLoading(false);
        }
      },
    });

    ref.current.innerHTML = "";
    window.google.accounts.id.renderButton(ref.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "signin_with",
      logo_alignment: "left",
      width: "100%",
    });
  }, [clientId, redirectTo, router]);

  if (!clientId) {
    return (
      <Button type="button" variant="outline" className={cn("w-full", className)} disabled>
        Google sign-in is not configured
      </Button>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div ref={ref} />
      {loading ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-full bg-background/70 backdrop-blur">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      ) : null}
    </div>
  );
}
