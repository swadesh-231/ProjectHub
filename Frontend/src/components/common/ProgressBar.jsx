import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const ProgressBar = ({ value = 0, className, barClassName }) => {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-border-subtle",
        className
      )}
    >
      <motion.div
        className={cn("h-full rounded-full bg-brand-solid", barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};
