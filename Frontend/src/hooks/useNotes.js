import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { notesApi } from "../api/notes.api";
import { getApiErrorMessage } from "../api/client";
import { QUERY_KEYS } from "../constants";

export const useNotes = (projectId) =>
  useQuery({
    queryKey: QUERY_KEYS.notes(projectId),
    queryFn: async () => (await notesApi.list(projectId)).data.data,
    enabled: Boolean(projectId),
  });

export const useCreateNote = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => notesApi.create(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notes(projectId) });
      toast.success("Note created");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useUpdateNote = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ noteId, payload }) =>
      notesApi.update(projectId, noteId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notes(projectId) });
      toast.success("Note updated");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};

export const useDeleteNote = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId) => notesApi.remove(projectId, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notes(projectId) });
      toast.success("Note deleted");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
};
