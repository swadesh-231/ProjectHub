import { cn } from "../../utils/cn";

export const Skeleton = ({ className }) => (
  <div
    className={cn(
      "animate-pulse rounded-lg bg-border-subtle/80",
      className
    )}
  />
);

export const SkeletonCard = () => (
  <div className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-soft">
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
    <Skeleton className="mt-5 h-3 w-full" />
    <Skeleton className="mt-2 h-3 w-4/5" />
    <Skeleton className="mt-5 h-2 w-full rounded-full" />
  </div>
);

export const SkeletonStat = () => (
  <div className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-soft">
    <Skeleton className="h-9 w-9 rounded-xl" />
    <Skeleton className="mt-4 h-7 w-16" />
    <Skeleton className="mt-2 h-3 w-24" />
  </div>
);

export const SkeletonRow = () => (
  <div className="flex items-center gap-4 px-5 py-3.5">
    <Skeleton className="h-9 w-9 rounded-full" />
    <Skeleton className="h-3.5 w-40" />
    <Skeleton className="ml-auto h-6 w-20 rounded-full" />
  </div>
);
