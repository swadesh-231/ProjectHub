import { create } from "zustand";

const COLLAPSE_KEY = "pc_sidebar_collapsed";

export const useUiStore = create((set, get) => ({
  // Desktop collapsed rail
  sidebarCollapsed: localStorage.getItem(COLLAPSE_KEY) === "true",
  // Mobile drawer
  mobileSidebarOpen: false,

  toggleSidebar: () => {
    const next = !get().sidebarCollapsed;
    localStorage.setItem(COLLAPSE_KEY, String(next));
    set({ sidebarCollapsed: next });
  },

  openMobileSidebar: () => set({ mobileSidebarOpen: true }),
  closeMobileSidebar: () => set({ mobileSidebarOpen: false }),

  // Currently selected project for project-scoped pages (tasks/notes/team).
  activeProjectId: null,
  setActiveProjectId: (id) => set({ activeProjectId: id }),
}));
