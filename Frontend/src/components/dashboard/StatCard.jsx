import { motion } from "framer-motion";
import { fadeInUp } from "../../constants/motion";
import { cn } from "../../utils/cn";

const TONES = {
  brand: "bg-brand-soft text-brand",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  neutral: "bg-canvas text-muted",
};

export const StatCard = ({ icon: Icon, label, value, tone = "brand", hint }) => (
  <motion.div
    variants={fadeInUp}
    className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
  >
    <div className="flex items-start justify-between">
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl",
          TONES[tone]
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      {hint && (
        <span className="text-xs font-medium text-faint">{hint}</span>
      )}
    </div>
    <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">
      {value}
    </p>
    <p className="mt-1 text-sm text-muted">{label}</p>
  </motion.div>
);
