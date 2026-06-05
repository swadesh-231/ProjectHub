import { useMemo, useState } from "react";
import { Plus, CheckSquare } from "lucide-react";
import { useTasks, useDeleteTask } from "../../hooks/useTasks";
import { useMembers } from "../../hooks/useTeam";
import { useProjectRole } from "../../hooks/useProjectRole";
import { Button } from "../common/Button";
import { Skeleton } from "../common/Skeleton";
import { EmptyState } from "../common/EmptyState";
import { ErrorState } from "../common/ErrorState";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { KanbanBoard } from "./KanbanBoard";
import { TaskFormModal } from "./TaskFormModal";
import { TaskDrawer } from "./TaskDrawer";

const BoardSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    {Array.from({ length: 3 }).map((_, c) => (
      <div
        key={c}
        className="rounded-2xl border border-border-subtle bg-canvas/40 p-3"
      >
        <Skeleton className="mb-3 h-5 w-24" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="mb-2.5 h-20 w-full rounded-xl" />
        ))}
      </div>
    ))}
  </div>
);

export const TaskBoardSection = ({ projectId }) => {
  const { data: tasks, isLoading, isError, refetch } = useTasks(projectId);
  const { data: members } = useMembers(projectId);
  const { canManageTasks } = useProjectRole(projectId);
  const deleteTask = useDeleteTask(projectId);

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("todo");
  const [openTaskId, setOpenTaskId] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const openTask = useMemo(
    () => tasks?.find((t) => t._id === openTaskId) || null,
    [tasks, openTaskId]
  );

  const handleCreate = (status = "todo") => {
    setEditingTask(null);
    setDefaultStatus(status);
    setFormOpen(true);
  };

  const handleEdit = (task) => {
    setOpenTaskId(null);
    setEditingTask(task);
    setFormOpen(true);
  };

  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {tasks?.length || 0} {tasks?.length === 1 ? "task" : "tasks"}
        </p>
        {canManageTasks && (
          <Button size="sm" leftIcon={Plus} onClick={() => handleCreate("todo")}>
            New task
          </Button>
        )}
      </div>

      {isLoading ? (
        <BoardSkeleton />
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks yet"
          description={
            canManageTasks
              ? "Create your first task and drag it across the board as work progresses."
              : "Tasks added by your project admins will appear here."
          }
          action={
            canManageTasks && (
              <Button leftIcon={Plus} onClick={() => handleCreate("todo")}>
                New task
              </Button>
            )
          }
        />
      ) : (
        <KanbanBoard
          projectId={projectId}
          tasks={tasks}
          canManage={canManageTasks}
          onOpenTask={(t) => setOpenTaskId(t._id)}
          onAddTask={handleCreate}
        />
      )}

      <TaskFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        projectId={projectId}
        members={members || []}
        task={editingTask}
        defaultStatus={defaultStatus}
      />

      <TaskDrawer
        open={Boolean(openTaskId)}
        onClose={() => setOpenTaskId(null)}
        projectId={projectId}
        taskId={openTaskId}
        canManage={canManageTasks}
        onEdit={handleEdit}
        onDelete={setDeleting}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete task"
        confirmLabel="Delete"
        isLoading={deleteTask.isPending}
        onConfirm={() =>
          deleteTask.mutate(deleting._id, {
            onSuccess: () => {
              setDeleting(null);
              setOpenTaskId(null);
            },
          })
        }
      />
    </div>
  );
};
