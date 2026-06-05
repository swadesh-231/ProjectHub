import { TOKEN_KEYS } from "../constants";

export const tokenService = {
  getAccess: () => localStorage.getItem(TOKEN_KEYS.ACCESS),
  getRefresh: () => localStorage.getItem(TOKEN_KEYS.REFRESH),
  set: ({ accessToken, refreshToken }) => {
    if (accessToken) localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
    if (refreshToken) localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS);
    localStorage.removeItem(TOKEN_KEYS.REFRESH);
  },
};
