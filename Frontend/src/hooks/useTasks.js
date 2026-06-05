import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { tasksApi } from "../api/tasks.api";
import { getApiErrorMessage } from "../api/client";
import { QUERY_KEYS } from "../constants";

export const useTasks = (projectId) =>
  useQuery({
    queryKey: QUERY_KEYS.tasks(projectId),
    queryFn: async () => (await tasksApi.list(projectId)).data.data,
    enabled: Boolean(projectId),
  });

export const useTask = (projectId, taskId) =>
  useQuery({
    queryKey: QUERY_KEYS.task(projectId, taskId),
    queryFn: async () => (await tasksApi.get(projectId, taskId)).data.data,
    enabled: Boolean(projectId && taskId),
  });

export const useCreateTask = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => tasksApi.create(projectId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks(projectId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
      toast.success("Task created");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useUpdateTask = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, payload }) =>
      tasksApi.update(projectId, taskId, payload),
    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks(projectId) });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.task(projectId, taskId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useDeleteTask = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId) => tasksApi.remove(projectId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks(projectId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
      toast.success("Task deleted");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useCreateSubtask = (projectId, taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      tasksApi.createSubtask(projectId, taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.task(projectId, taskId),
      });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useUpdateSubtask = (projectId, taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ subTaskId, payload }) =>
      tasksApi.updateSubtask(projectId, subTaskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.task(projectId, taskId),
      });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useDeleteSubtask = (projectId, taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subTaskId) => tasksApi.removeSubtask(projectId, subTaskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.task(projectId, taskId),
      });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};
