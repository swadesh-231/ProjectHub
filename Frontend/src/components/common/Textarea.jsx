import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Textarea = forwardRef(
  ({ label, error, hint, className, id, rows = 4, ...props }, ref) => {
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
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full resize-none rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-foreground",
            "placeholder:text-faint transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent",
            error ? "border-danger" : "border-border-strong",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs text-danger">{error}</p>
        ) : (
          hint && <p className="mt-1.5 text-xs text-faint">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
