import { cn } from "../../utils/cn";
import { STATUS_LABELS } from "../../constants";

const TONES = {
  neutral: "bg-canvas text-muted border-border-strong",
  brand: "bg-brand-soft text-brand-soft-fg border-transparent",
  success: "bg-success-soft text-success border-transparent",
  warning: "bg-warning-soft text-warning border-transparent",
  danger: "bg-danger-soft text-danger border-transparent",
};

export const Badge = ({ tone = "neutral", className, children, dot = false }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
      TONES[tone],
      className
    )}
  >
    {dot && (
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
    )}
    {children}
  </span>
);

const STATUS_TONES = {
  todo: "neutral",
  in_progress: "brand",
  done: "success",
};

export const StatusBadge = ({ status }) => (
  <Badge tone={STATUS_TONES[status] || "neutral"} dot>
    {STATUS_LABELS[status] || status}
  </Badge>
);
