import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { authApi } from "../api/auth.api";
import { getApiErrorMessage, setAuthFailureHandler } from "../api/client";
import { useAuthStore } from "../store/auth.store";
import { tokenService } from "../services/token.service";

/**
 * Boots the session: validates the stored token via /current-user and wires
 * the global auth-failure handler so token-refresh failures log the user out.
 */
export const useBootstrapAuth = () => {
  const { setUser, finishBootstrap, logout } = useAuthStore();

  useEffect(() => {
    setAuthFailureHandler(() => {
      logout();
    });

    const token = tokenService.getAccess();
    if (!token) {
      finishBootstrap();
      return;
    }

    authApi
      .currentUser()
      .then((res) => setUser(res.data.data))
      .catch(() => logout())
      .finally(() => finishBootstrap());
  }, [setUser, finishBootstrap, logout]);
};

export const useLogin = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload) => authApi.login(payload),
    onSuccess: (res) => {
      const { user, accessToken, refreshToken } = res.data.data;
      setSession({ user, accessToken, refreshToken });
      toast.success(`Welcome back, ${user.username}`);
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => authApi.register(payload),
    onSuccess: () => {
      toast.success("Account created. You can sign in now.");
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout().catch(() => null),
    onSettled: () => {
      logout();
      queryClient.clear();
      navigate("/login", { replace: true });
      toast.success("Signed out");
    },
  });
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload) => authApi.forgotPassword(payload),
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ token, newPassword }) =>
      authApi.resetPassword(token, { newPassword }),
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

export const useChangePassword = () =>
  useMutation({
    mutationFn: (payload) => authApi.changePassword(payload),
    onSuccess: () => toast.success("Password updated"),
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
