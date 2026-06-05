import { cn } from "../../utils/cn";

export const Card = ({ className, hover = false, children, ...props }) => (
  <div
    className={cn(
      "rounded-2xl border border-border-subtle bg-surface shadow-soft",
      hover &&
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card hover:border-border-strong",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
