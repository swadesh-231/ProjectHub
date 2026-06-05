import { apiClient } from "./client";

export const projectsApi = {
  list: () => apiClient.get("/projects"),
  get: (projectId) => apiClient.get(`/projects/${projectId}`),
  create: (payload) => apiClient.post("/projects", payload),
  update: (projectId, payload) =>
    apiClient.put(`/projects/${projectId}`, payload),
  remove: (projectId) => apiClient.delete(`/projects/${projectId}`),

  members: (projectId) => apiClient.get(`/projects/${projectId}/members`),
  addMember: (projectId, payload) =>
    apiClient.post(`/projects/${projectId}/members`, payload),
  updateMemberRole: (projectId, userId, payload) =>
    apiClient.put(`/projects/${projectId}/members/${userId}`, payload),
  removeMember: (projectId, userId) =>
    apiClient.delete(`/projects/${projectId}/members/${userId}`),
};
