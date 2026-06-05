import { apiClient } from "./client";

export const tasksApi = {
  list: (projectId) => apiClient.get(`/tasks/${projectId}`),
  get: (projectId, taskId) =>
    apiClient.get(`/tasks/${projectId}/t/${taskId}`),
  create: (projectId, formData) =>
    apiClient.post(`/tasks/${projectId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (projectId, taskId, payload) =>
    apiClient.put(`/tasks/${projectId}/t/${taskId}`, payload, {
      headers:
        payload instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
    }),
  remove: (projectId, taskId) =>
    apiClient.delete(`/tasks/${projectId}/t/${taskId}`),

  createSubtask: (projectId, taskId, payload) =>
    apiClient.post(`/tasks/${projectId}/t/${taskId}/subtasks`, payload),
  updateSubtask: (projectId, subTaskId, payload) =>
    apiClient.put(`/tasks/${projectId}/st/${subTaskId}`, payload),
  removeSubtask: (projectId, subTaskId) =>
    apiClient.delete(`/tasks/${projectId}/st/${subTaskId}`),
};
