import { useState } from "react";
import { useNavigate } from "react-router";
import { Menu, Search, Bell, LogOut, User, Settings } from "lucide-react";
import { useUiStore } from "../../store/ui.store";
import { useAuthStore } from "../../store/auth.store";
import { useLogout } from "../../hooks/useAuth";
import { ThemeToggle } from "../common/ThemeToggle";
import { Avatar } from "../common/Avatar";
import { Dropdown } from "../common/Dropdown";

export const Navbar = () => {
  const navigate = useNavigate();
  const { openMobileSidebar } = useUiStore();
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const [query, setQuery] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/projects?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border-subtle glass px-4 sm:px-6">
      <button
        onClick={openMobileSidebar}
        className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-canvas hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <form onSubmit={onSearch} className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          className="h-9 w-full rounded-xl border border-border-strong bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <button
          className="relative hidden h-9 w-9 place-items-center rounded-lg border border-border-strong bg-surface text-muted transition-colors hover:text-foreground sm:grid"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand" />
        </button>

        <ThemeToggle />

        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2 rounded-xl p-0.5 pr-2 transition-colors hover:bg-canvas">
              <Avatar name={user?.fullName || user?.username} size="sm" />
              <span className="hidden text-sm font-medium text-foreground sm:block">
                {user?.username}
              </span>
            </button>
          }
          items={[
            { label: "Profile", icon: User, onClick: () => navigate("/settings") },
            { label: "Settings", icon: Settings, onClick: () => navigate("/settings") },
            { type: "divider" },
            { label: "Sign out", icon: LogOut, danger: true, onClick: () => logout.mutate() },
          ]}
        />
      </div>
    </header>
  );
};
