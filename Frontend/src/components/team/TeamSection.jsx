import { useState } from "react";
import { UserPlus, Trash2, Users } from "lucide-react";
import { useMembers, useUpdateMemberRole, useRemoveMember } from "../../hooks/useTeam";
import { useProjectRole } from "../../hooks/useProjectRole";
import { useAuthStore } from "../../store/auth.store";
import { Button } from "../common/Button";
import { Avatar } from "../common/Avatar";
import { Badge } from "../common/Badge";
import { SkeletonRow } from "../common/Skeleton";
import { EmptyState } from "../common/EmptyState";
import { ErrorState } from "../common/ErrorState";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { AddMemberModal } from "./AddMemberModal";
import { ROLE_OPTIONS, ROLE_LABELS } from "../../constants";

export const TeamSection = ({ projectId }) => {
  const { data: members, isLoading, isError, refetch } = useMembers(projectId);
  const { isAdmin } = useProjectRole(projectId);
  const currentUser = useAuthStore((s) => s.user);
  const updateRole = useUpdateMemberRole(projectId);
  const removeMember = useRemoveMember(projectId);

  const [addOpen, setAddOpen] = useState(false);
  const [removing, setRemoving] = useState(null);

  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {members?.length || 0} {members?.length === 1 ? "member" : "members"}
        </p>
        {isAdmin && (
          <Button size="sm" leftIcon={UserPlus} onClick={() => setAddOpen(true)}>
            Add member
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-soft">
        <div className="hidden grid-cols-12 gap-4 border-b border-border-subtle px-5 py-3 text-xs font-medium uppercase tracking-wide text-faint sm:grid">
          <span className="col-span-6">Member</span>
          <span className="col-span-4">Role</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
        ) : members.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No members yet"
            description="Add teammates to collaborate on this project."
            className="border-0"
          />
        ) : (
          members.map((member) => {
            const isSelf = member.user?._id === currentUser?._id;
            return (
              <div
                key={member._id}
                className="grid grid-cols-12 items-center gap-4 border-b border-border-subtle px-5 py-3.5 last:border-0 transition-colors hover:bg-canvas/50"
              >
                <div className="col-span-12 flex items-center gap-3 sm:col-span-6">
                  <Avatar
                    name={member.user?.fullName || member.user?.username}
                    src={member.user?.avatar?.url}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {member.user?.fullName || member.user?.username}
                      {isSelf && (
                        <span className="ml-1.5 text-xs text-faint">(you)</span>
                      )}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {member.user?.email}
                    </p>
                  </div>
                </div>

                <div className="col-span-7 sm:col-span-4">
                  {isAdmin && !isSelf ? (
                    <select
                      value={member.role}
                      onChange={(e) =>
                        updateRole.mutate({
                          userId: member.user._id,
                          role: e.target.value,
                        })
                      }
                      className="h-9 rounded-lg border border-border-strong bg-surface px-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                    >
                      {ROLE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Badge tone={member.role === "admin" ? "brand" : "neutral"}>
                      {ROLE_LABELS[member.role]}
                    </Badge>
                  )}
                </div>

                <div className="col-span-5 flex justify-end sm:col-span-2">
                  {isAdmin && !isSelf && (
                    <button
                      onClick={() => setRemoving(member)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-faint transition-colors hover:bg-danger-soft hover:text-danger"
                      aria-label="Remove member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <AddMemberModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        projectId={projectId}
      />

      <ConfirmDialog
        open={Boolean(removing)}
        onClose={() => setRemoving(null)}
        title="Remove member"
        confirmLabel="Remove"
        isLoading={removeMember.isPending}
        onConfirm={() =>
          removeMember.mutate(removing.user._id, {
            onSuccess: () => setRemoving(null),
          })
        }
      />
    </div>
  );
};
