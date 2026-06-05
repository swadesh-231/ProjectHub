import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

/** Redirects already-authenticated users away from auth pages. */
export const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};
