import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { drawerTransition } from "../../constants/motion";

export const Drawer = ({ open, onClose, title, subtitle, children }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-overlay backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            {...drawerTransition}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border-subtle bg-elevated shadow-pop"
          >
            <header className="flex items-start justify-between gap-4 border-b border-border-subtle px-6 py-4">
              <div className="min-w-0">
                {subtitle && (
                  <p className="text-xs font-medium uppercase tracking-wide text-faint">
                    {subtitle}
                  </p>
                )}
                {title && (
                  <h2 className="mt-0.5 truncate font-display text-lg font-semibold text-foreground">
                    {title}
                  </h2>
                )}
              </div>
              <button
                onClick={onClose}
                className="-mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-faint transition-colors hover:bg-canvas hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
