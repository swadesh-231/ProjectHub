import { cn } from "../../utils/cn";

export const PageHeader = ({ title, description, actions, className }) => (
  <div
    className={cn(
      "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
      className
    )}
  >
    <div className="min-w-0">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-1 text-sm text-muted">{description}</p>
      )}
    </div>
    {actions && <div className="flex items-center gap-2.5">{actions}</div>}
  </div>
);
