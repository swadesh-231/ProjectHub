import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { projectsApi } from "../api/projects.api";
import { getApiErrorMessage } from "../api/client";
import { QUERY_KEYS } from "../constants";

export const useProjects = () =>
  useQuery({
    queryKey: QUERY_KEYS.projects,
    queryFn: async () => (await projectsApi.list()).data.data,
  });

export const useProject = (projectId) =>
  useQuery({
    queryKey: QUERY_KEYS.project(projectId),
    queryFn: async () => (await projectsApi.get(projectId)).data.data,
    enabled: Boolean(projectId),
  });

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => projectsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
      toast.success("Project created");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, payload }) =>
      projectsApi.update(projectId, payload),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.project(projectId) });
      toast.success("Project updated");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId) => projectsApi.remove(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
      toast.success("Project deleted");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};
