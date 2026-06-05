import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { memberSchema } from "../../utils/validation";
import { ROLE_OPTIONS } from "../../constants";
import { useAddMember } from "../../hooks/useTeam";

export const AddMemberModal = ({ open, onClose, projectId }) => {
  const addMember = useAddMember(projectId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: { role: "member" },
  });

  useEffect(() => {
    if (open) reset({ email: "", role: "member" });
  }, [open, reset]);

  const onSubmit = (values) =>
    addMember.mutate(values, { onSuccess: onClose });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add team member"
      description="Invite an existing user to this project by email."
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            isLoading={addMember.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            Add member
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="teammate@company.com"
          leftIcon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />
        <Select
          label="Role"
          options={ROLE_OPTIONS}
          error={errors.role?.message}
          {...register("role")}
        />
      </form>
    </Modal>
  );
};
