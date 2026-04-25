"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10"
      onClick={async () => {
        try {
          const response = await fetch("/api/auth/logout", { method: "POST" });
          if (!response.ok) {
            throw new Error("Unable to log out.");
          }
          toast.success("Logged out.");
          router.push("/auth/sign-in");
          router.refresh();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to log out.");
        }
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
