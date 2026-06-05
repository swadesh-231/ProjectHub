import { useMembers } from "./useTeam";
import { useAuthStore } from "../store/auth.store";
import { USER_ROLES } from "../constants";

/**
 * Derives the current user's role within a project from its member list,
 * exposing the permission flags the UI needs.
 */
export const useProjectRole = (projectId) => {
  const user = useAuthStore((s) => s.user);
  const { data: members, isLoading } = useMembers(projectId);

  const role =
    members?.find((m) => m.user?._id === user?._id)?.role || null;

  return {
    role,
    isLoading,
    isAdmin: role === USER_ROLES.ADMIN,
    canManageTasks:
      role === USER_ROLES.ADMIN || role === USER_ROLES.PROJECT_ADMIN,
  };
};
