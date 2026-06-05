import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useUiStore } from "../../store/ui.store";
import { Navbar } from "./Navbar";
import { SidebarContent } from "./Sidebar";
import { Spinner } from "../common/Spinner";
import { pageTransition } from "../../constants/motion";
import { cn } from "../../utils/cn";

export const AppLayout = () => {
  const location = useLocation();
  const { sidebarCollapsed, mobileSidebarOpen, closeMobileSidebar } =
    useUiStore();

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-border-subtle bg-surface/60 transition-[width] duration-300 ease-out lg:block",
          sidebarCollapsed ? "w-[76px]" : "w-64"
        )}
      >
        <SidebarContent collapsed={sidebarCollapsed} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-overlay backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileSidebar}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute left-0 top-0 h-full w-72 border-r border-border-subtle bg-surface shadow-pop"
            >
              <SidebarContent collapsed={false} onNavigate={closeMobileSidebar} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              {...pageTransition}
              className="mx-auto w-full max-w-7xl"
            >
              <Suspense
                fallback={
                  <div className="flex justify-center py-24">
                    <Spinner className="h-6 w-6" />
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
