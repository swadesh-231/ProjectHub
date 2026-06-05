import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { NAV_ITEMS } from "../../constants";
import { useUiStore } from "../../store/ui.store";
import { Logo } from "../common/Logo";
import { cn } from "../../utils/cn";

const NavItem = ({ item, collapsed, onNavigate }) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          collapsed && "justify-center px-0",
          isActive
            ? "text-foreground"
            : "text-muted hover:bg-canvas hover:text-foreground"
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="sidebar-active"
              className="absolute inset-0 rounded-xl border border-border-subtle bg-surface shadow-soft"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-3">
            <Icon
              className={cn(
                "h-[18px] w-[18px] shrink-0",
                isActive && "text-brand"
              )}
            />
            {!collapsed && <span className="relative z-10">{item.label}</span>}
          </span>
          {collapsed && (
            <span className="pointer-events-none absolute left-full ml-3 z-20 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-canvas opacity-0 shadow-pop transition-opacity group-hover:opacity-100 lg:block">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

export const SidebarContent = ({ collapsed, onNavigate }) => {
  const { toggleSidebar } = useUiStore();

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex h-16 items-center px-4",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <Logo showWord={!collapsed} />
        {!collapsed && (
          <button
            onClick={toggleSidebar}
            className="hidden h-8 w-8 place-items-center rounded-lg text-faint transition-colors hover:bg-canvas hover:text-foreground lg:grid"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.to}
            item={item}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {collapsed && (
        <div className="px-3 pb-3">
          <button
            onClick={toggleSidebar}
            className="hidden h-9 w-full place-items-center rounded-lg text-faint transition-colors hover:bg-canvas hover:text-foreground lg:grid"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>
      )}

      {!collapsed && (
        <div className="m-3 rounded-xl border border-border-subtle bg-gradient-to-br from-brand-soft to-transparent p-4">
          <p className="font-display text-sm font-semibold text-foreground">
            Project Camp
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Organize projects, tasks & teams in one calm workspace.
          </p>
        </div>
      )}
    </div>
  );
};
