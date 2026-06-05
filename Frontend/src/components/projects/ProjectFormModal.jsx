import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Textarea } from "../common/Textarea";
import { Button } from "../common/Button";
import { projectSchema } from "../../utils/validation";
import { useCreateProject, useUpdateProject } from "../../hooks/useProjects";

export const ProjectFormModal = ({ open, onClose, project }) => {
  const isEdit = Boolean(project);
  const create = useCreateProject();
  const update = useUpdateProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(projectSchema) });

  useEffect(() => {
    if (open) {
      reset({
        name: project?.name || "",
        description: project?.description || "",
      });
    }
  }, [open, project, reset]);

  const onSubmit = (values) => {
    if (isEdit) {
      update.mutate(
        { projectId: project._id, payload: values },
        { onSuccess: onClose }
      );
    } else {
      create.mutate(values, { onSuccess: onClose });
    }
  };

  const isPending = create.isPending || update.isPending;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit project" : "Create project"}
      description={
        isEdit
          ? "Update your project details."
          : "Set up a new space for your team's work."
      }
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            isLoading={isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {isEdit ? "Save changes" : "Create project"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Project name"
          placeholder="e.g. Website Redesign"
          error={errors.name?.message}
          {...register("name")}
        />
        <Textarea
          label="Description"
          placeholder="What is this project about?"
          rows={4}
          error={errors.description?.message}
          {...register("description")}
        />
      </form>
    </Modal>
  );
};
