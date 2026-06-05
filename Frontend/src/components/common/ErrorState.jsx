import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../utils/cn";

export const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load this data. Please try again.",
  onRetry,
  className,
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface px-6 py-14 text-center",
      className
    )}
  >
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-danger-soft text-danger">
      <AlertTriangle className="h-6 w-6" />
    </span>
    <h3 className="mt-4 font-display text-base font-semibold text-foreground">
      {title}
    </h3>
    <p className="mt-1.5 max-w-sm text-sm text-muted">{description}</p>
    {onRetry && (
      <Button
        variant="secondary"
        size="sm"
        leftIcon={RotateCw}
        className="mt-5"
        onClick={onRetry}
      >
        Retry
      </Button>
    )}
  </div>
);
