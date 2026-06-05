import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

const VARIANTS = {
  primary:
    "bg-brand-solid text-white hover:bg-brand-solid-hover shadow-soft border border-transparent",
  secondary:
    "bg-surface text-foreground border border-border-strong hover:bg-canvas",
  ghost:
    "bg-transparent text-muted hover:text-foreground hover:bg-canvas border border-transparent",
  danger:
    "bg-danger text-white hover:opacity-90 border border-transparent shadow-soft",
  soft: "bg-brand-soft text-brand-soft-fg hover:opacity-90 border border-transparent",
};

const SIZES = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-11 px-5 text-sm gap-2 rounded-xl",
  icon: "h-9 w-9 rounded-lg",
};

export const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium select-none",
        "transition-all duration-150 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        "disabled:opacity-55 disabled:pointer-events-none",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        LeftIcon && <LeftIcon className="h-4 w-4 shrink-0" />
      )}
      {children}
      {!isLoading && RightIcon && <RightIcon className="h-4 w-4 shrink-0" />}
    </button>
  )
);

Button.displayName = "Button";
