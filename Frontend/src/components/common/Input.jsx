import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Input = forwardRef(
  ({ label, error, hint, leftIcon: LeftIcon, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {LeftIcon && (
            <LeftIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "h-10 w-full rounded-xl border bg-surface px-3.5 text-sm text-foreground",
              "placeholder:text-faint transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent",
              LeftIcon && "pl-9.5",
              error ? "border-danger" : "border-border-strong",
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-danger">{error}</p>
        ) : (
          hint && <p className="mt-1.5 text-xs text-faint">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
