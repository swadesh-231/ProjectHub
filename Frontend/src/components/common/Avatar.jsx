import { cn } from "../../utils/cn";
import { getInitials, colorFromString } from "../../utils/format";

const SIZES = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
};

export const Avatar = ({ name = "", src, size = "md", className }) => {
  const bg = colorFromString(name);
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold text-white ring-2 ring-surface",
        SIZES[size],
        className
      )}
      style={!src ? { backgroundColor: bg } : undefined}
      title={name}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </span>
  );
};

export const AvatarGroup = ({ names = [], max = 4, size = "sm" }) => {
  const shown = names.slice(0, max);
  const extra = names.length - shown.length;
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((name, i) => (
        <Avatar key={`${name}-${i}`} name={name} size={size} />
      ))}
      {extra > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-canvas font-semibold text-muted ring-2 ring-surface",
            SIZES[size]
          )}
        >
          +{extra}
        </span>
      )}
    </div>
  );
};
