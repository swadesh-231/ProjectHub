import { cn } from "../../utils/cn";

export const Logo = ({ showWord = true, className }) => (
  <div className={cn("flex items-center gap-2.5", className)}>
    <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-brand-solid text-white shadow-soft">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
        <path
          d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m4 7.5 8 4.5 8-4.5M12 12v9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    {showWord && (
      <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        Project Camp
      </span>
    )}
  </div>
);
