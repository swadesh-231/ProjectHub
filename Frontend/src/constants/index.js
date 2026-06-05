import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  StickyNote,
  Users,
  Settings,
} from "lucide-react";

// In production the SPA is served by the backend on the same origin, so a
// relative path hits the deployed API directly (no CORS, no hardcoded URL).
// Local dev still talks to the backend running on :8080.
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api/v1" : "http://localhost:8080/api/v1");

export const TOKEN_KEYS = {
  ACCESS: "pc_access_token",
  REFRESH: "pc_refresh_token",
};

export const NAV_ITEMS = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/projects", icon: FolderKanban },
  { label: "Tasks", to: "/tasks", icon: CheckSquare },
  { label: "Notes", to: "/notes", icon: StickyNote },
  { label: "Team", to: "/team", icon: Users },
  { label: "Settings", to: "/settings", icon: Settings },
];

export const USER_ROLES = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};

export const ROLE_LABELS = {
  admin: "Admin",
  project_admin: "Project Admin",
  member: "Member",
};

export const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "project_admin", label: "Project Admin" },
  { value: "member", label: "Member" },
];

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const TASK_COLUMNS = [
  { id: "todo", title: "Todo", accent: "#94a3b8" },
  { id: "in_progress", title: "In Progress", accent: "#6366f1" },
  { id: "done", title: "Done", accent: "#10b981" },
];

export const STATUS_LABELS = {
  todo: "Todo",
  in_progress: "In Progress",
  done: "Done",
};

export const QUERY_KEYS = {
  currentUser: ["current-user"],
  projects: ["projects"],
  project: (id) => ["project", id],
  members: (id) => ["members", id],
  tasks: (id) => ["tasks", id],
  task: (projectId, taskId) => ["task", projectId, taskId],
  notes: (id) => ["notes", id],
  dashboard: ["dashboard-stats"],
};
