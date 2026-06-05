import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export const Spinner = ({ className }) => (
  <Loader2 className={cn("h-5 w-5 animate-spin text-brand", className)} />
);

export const FullPageLoader = ({ label = "Loading" }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
    <Spinner className="h-7 w-7" />
    <p className="text-sm text-muted">{label}…</p>
  </div>
);
