import axios from "axios";
import { API_BASE_URL } from "../constants";
import { tokenService } from "../services/token.service";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token on every request.
apiClient.interceptors.request.use((config) => {
  const token = tokenService.getAccess();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue = [];

const resolveQueue = (error, token = null) => {
  pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  pendingQueue = [];
};

// Callback wired up by the auth store so a hard refresh failure logs the user out.
let onAuthFailure = () => {};
export const setAuthFailureHandler = (fn) => {
  onAuthFailure = fn;
};

// Normalize backend error shape into a plain message we can surface anywhere.
export const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.errors?.[0]?.[
    Object.keys(error?.response?.data?.errors?.[0] || {})[0]
  ] ||
  error?.message ||
  "Something went wrong. Please try again.";

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;
    const isAuthRoute = original?.url?.includes("/auth/");

    if (status === 401 && !original?._retry && !isAuthRoute) {
      const refreshToken = tokenService.getRefresh();
      if (!refreshToken) {
        onAuthFailure();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return apiClient(original);
          })
          .catch((err) => Promise.reject(err));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken }
        );
        const newAccess = data?.data?.accessToken;
        const newRefresh = data?.data?.refreshToken;
        tokenService.set({ accessToken: newAccess, refreshToken: newRefresh });
        resolveQueue(null, newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch (refreshError) {
        resolveQueue(refreshError, null);
        tokenService.clear();
        onAuthFailure();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
