import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { projectsApi } from "../api/projects.api";
import { getApiErrorMessage } from "../api/client";
import { QUERY_KEYS } from "../constants";

export const useMembers = (projectId) =>
  useQuery({
    queryKey: QUERY_KEYS.members(projectId),
    queryFn: async () => (await projectsApi.members(projectId)).data.data,
    enabled: Boolean(projectId),
  });

export const useAddMember = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => projectsApi.addMember(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members(projectId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
      toast.success("Member added");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useUpdateMemberRole = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }) =>
      projectsApi.updateMemberRole(projectId, userId, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members(projectId) });
      toast.success("Role updated");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useRemoveMember = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) => projectsApi.removeMember(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members(projectId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
      toast.success("Member removed");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};
