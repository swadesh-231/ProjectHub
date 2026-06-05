import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { FullPageLoader } from "../components/common/Spinner";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isBootstrapping } = useAuthStore();
  const location = useLocation();

  if (isBootstrapping) return <FullPageLoader label="Preparing your workspace" />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
