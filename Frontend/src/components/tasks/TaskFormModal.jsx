import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Textarea } from "../common/Textarea";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { AttachmentDropzone } from "./AttachmentDropzone";
import { taskSchema } from "../../utils/validation";
import { STATUS_LABELS } from "../../constants";
import { useCreateTask, useUpdateTask } from "../../hooks/useTasks";

const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const TaskFormModal = ({
  open,
  onClose,
  projectId,
  members = [],
  task,
  defaultStatus = "todo",
}) => {
  const isEdit = Boolean(task);
  const create = useCreateTask(projectId);
  const update = useUpdateTask(projectId);
  const [files, setFiles] = useState([]);

  const assigneeOptions = [
    { value: "", label: "Unassigned" },
    ...members.map((m) => ({
      value: m.user._id,
      label: m.user.fullName || m.user.username,
    })),
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(taskSchema) });

  useEffect(() => {
    if (open) {
      setFiles([]);
      reset({
        title: task?.title || "",
        description: task?.description || "",
        assignedTo: task?.assignedTo?._id || task?.assignedTo || "",
        status: task?.status || defaultStatus,
      });
    }
  }, [open, task, defaultStatus, reset]);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.assignedTo) formData.append("assignedTo", values.assignedTo);
    if (values.status) formData.append("status", values.status);
    files.forEach((file) => formData.append("attachments", file));

    if (isEdit) {
      update.mutate(
        { taskId: task._id, payload: formData },
        { onSuccess: onClose }
      );
    } else {
      create.mutate(formData, { onSuccess: onClose });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit task" : "Create task"}
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
            {isEdit ? "Save changes" : "Create task"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Title"
          placeholder="e.g. Design the landing page"
          error={errors.title?.message}
          {...register("title")}
        />
        <Textarea
          label="Description"
          placeholder="Add more detail…"
          rows={3}
          {...register("description")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Assignee"
            options={assigneeOptions}
            {...register("assignedTo")}
          />
          <Select label="Status" options={STATUS_OPTIONS} {...register("status")} />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-foreground">
            Attachments
          </p>
          <AttachmentDropzone files={files} onChange={setFiles} />
        </div>
      </form>
    </Modal>
  );
};
