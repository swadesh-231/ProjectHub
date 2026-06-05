import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../common/Modal";
import { Textarea } from "../common/Textarea";
import { Button } from "../common/Button";
import { noteSchema } from "../../utils/validation";
import { useCreateNote, useUpdateNote } from "../../hooks/useNotes";

export const NoteEditorModal = ({ open, onClose, projectId, note }) => {
  const isEdit = Boolean(note);
  const create = useCreateNote(projectId);
  const update = useUpdateNote(projectId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(noteSchema) });

  useEffect(() => {
    if (open) reset({ content: note?.content || "" });
  }, [open, note, reset]);

  const onSubmit = (values) => {
    if (isEdit) {
      update.mutate(
        { noteId: note._id, payload: values },
        { onSuccess: onClose }
      );
    } else {
      create.mutate(values, { onSuccess: onClose });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit note" : "New note"}
      size="lg"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            isLoading={create.isPending || update.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {isEdit ? "Save note" : "Add note"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          label="Note"
          placeholder="Write something the team should know…"
          rows={8}
          error={errors.content?.message}
          {...register("content")}
        />
      </form>
    </Modal>
  );
};
