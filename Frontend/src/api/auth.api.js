import { apiClient } from "./client";

export const authApi = {
  register: (payload) => apiClient.post("/auth/register", payload),
  login: (payload) => apiClient.post("/auth/login", payload),
  logout: () => apiClient.post("/auth/logout"),
  currentUser: () => apiClient.get("/auth/current-user"),
  changePassword: (payload) => apiClient.post("/auth/change-password", payload),
  verifyEmail: (token) => apiClient.get(`/auth/verify-email/${token}`),
  resendVerification: () => apiClient.post("/auth/resend-email-verification"),
  forgotPassword: (payload) => apiClient.post("/auth/forgot-password", payload),
  resetPassword: (token, payload) =>
    apiClient.post(`/auth/reset-password/${token}`, payload),
};
