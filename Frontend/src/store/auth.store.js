import { create } from "zustand";
import { tokenService } from "../services/token.service";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: Boolean(tokenService.getAccess()),
  // True until the initial /current-user check resolves on app boot.
  isBootstrapping: Boolean(tokenService.getAccess()),

  setSession: ({ user, accessToken, refreshToken }) => {
    if (accessToken || refreshToken) {
      tokenService.set({ accessToken, refreshToken });
    }
    set({ user, isAuthenticated: true, isBootstrapping: false });
  },

  setUser: (user) => set({ user }),

  finishBootstrap: () => set({ isBootstrapping: false }),

  logout: () => {
    tokenService.clear();
    set({ user: null, isAuthenticated: false, isBootstrapping: false });
  },
}));
