import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Lightweight click-to-open menu anchored to a trigger.
 * `items`: [{ label, icon, onClick, danger }] or { type: "divider" }.
 */
export const Dropdown = ({ trigger, items = [], align = "right", className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -2 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className={cn(
              "absolute z-40 mt-2 min-w-48 overflow-hidden rounded-xl border border-border-subtle bg-elevated p-1 shadow-pop",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {items.map((item, i) =>
              item.type === "divider" ? (
                <div key={i} className="my-1 h-px bg-border-subtle" />
              ) : (
                <button
                  key={i}
                  onClick={() => {
                    setOpen(false);
                    item.onClick?.();
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                    item.danger
                      ? "text-danger hover:bg-danger-soft"
                      : "text-foreground hover:bg-canvas"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
