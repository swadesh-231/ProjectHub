import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "../common/Logo";
import { ThemeToggle } from "../common/ThemeToggle";

const HIGHLIGHTS = [
  "Plan projects with tasks, subtasks & notes",
  "Role-based access for every team member",
  "Kanban boards that stay perfectly in sync",
];

export const AuthLayout = ({ title, subtitle, children }) => (
  <div className="flex min-h-screen bg-canvas">
    {/* Brand panel */}
    <div className="relative hidden w-1/2 overflow-hidden bg-brand-solid lg:flex">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(120% 120% at 0% 0%, #6d6af3 0%, #4f46e5 45%, #3a31c2 100%)",
        }}
      />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-32 -left-10 h-96 w-96 rounded-full bg-black/20 blur-2xl" />

      <div className="relative z-10 flex flex-col justify-between p-12 text-white">
        <Logo className="[&_span:last-child]:text-white [&>span:first-child]:bg-white/15" />
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-semibold leading-tight tracking-tight text-balance"
          >
            The calm home for your team's work.
          </motion.h2>
          <p className="mt-4 max-w-md text-white/70">
            Project Camp brings projects, tasks and people together with the
            polish of the tools you already love.
          </p>
          <ul className="mt-8 space-y-3">
            {HIGHLIGHTS.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 text-sm text-white/90"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-white/80" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Project Camp. All rights reserved.
        </p>
      </div>
    </div>

    {/* Form panel */}
    <div className="flex w-full flex-col lg:w-1/2">
      <div className="flex items-center justify-between p-6">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </motion.div>
      </div>
    </div>
  </div>
);
