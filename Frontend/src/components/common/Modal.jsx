import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { scaleIn } from "../../constants/motion";

const WIDTHS = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export const Modal = ({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
}) => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-overlay backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            variants={scaleIn}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              "relative z-10 w-full overflow-hidden rounded-2xl border border-border-subtle bg-elevated shadow-pop",
              WIDTHS[size]
            )}
          >
            {(title || onClose) && (
              <div className="flex items-start justify-between gap-4 border-b border-border-subtle px-6 py-4">
                <div>
                  {title && (
                    <h2 className="font-display text-base font-semibold text-foreground">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-0.5 text-sm text-muted">{description}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="-mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-faint transition-colors hover:bg-canvas hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="px-6 py-5">{children}</div>
            {footer && (
              <div className="flex items-center justify-end gap-2.5 border-t border-border-subtle bg-canvas/40 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
