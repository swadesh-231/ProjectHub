import { apiClient } from "./client";

export const notesApi = {
  list: (projectId) => apiClient.get(`/notes/${projectId}`),
  get: (projectId, noteId) => apiClient.get(`/notes/${projectId}/n/${noteId}`),
  create: (projectId, payload) =>
    apiClient.post(`/notes/${projectId}`, payload),
  update: (projectId, noteId, payload) =>
    apiClient.put(`/notes/${projectId}/n/${noteId}`, payload),
  remove: (projectId, noteId) =>
    apiClient.delete(`/notes/${projectId}/n/${noteId}`),
};
