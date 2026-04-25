import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Skeleton className="h-[36rem] rounded-[2rem] bg-white/8" />
        <div className="space-y-6">
          <Skeleton className="h-40 rounded-[2rem] bg-white/8" />
          <Skeleton className="h-80 rounded-[2rem] bg-white/8" />
        </div>
      </div>
    </main>
  );
}
