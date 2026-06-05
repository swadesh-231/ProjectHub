// Shared Framer Motion variants — keep animations subtle & professional.

export const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.14 } },
};

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16 } },
};

export const drawerTransition = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { type: "spring", stiffness: 320, damping: 34 } },
  exit: { x: "100%", transition: { duration: 0.22, ease: "easeIn" } },
};
