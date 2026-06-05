import { useState } from "react";
import { Check, Plus, Trash2, Loader2 } from "lucide-react";
import {
  useCreateSubtask,
  useUpdateSubtask,
  useDeleteSubtask,
} from "../../hooks/useTasks";
import { ProgressBar } from "../common/ProgressBar";
import { cn } from "../../utils/cn";

export const SubtaskList = ({ projectId, taskId, subtasks = [], canManage }) => {
  const create = useCreateSubtask(projectId, taskId);
  const update = useUpdateSubtask(projectId, taskId);
  const remove = useDeleteSubtask(projectId, taskId);
  const [title, setTitle] = useState("");

  const done = subtasks.filter((s) => s.isCompleted).length;
  const progress = subtasks.length
    ? Math.round((done / subtasks.length) * 100)
    : 0;

  const addSubtask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    create.mutate({ title: title.trim() }, { onSuccess: () => setTitle("") });
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Subtasks</h4>
        <span className="text-xs text-muted">
          {done}/{subtasks.length}
        </span>
      </div>

      {subtasks.length > 0 && <ProgressBar value={progress} className="mb-3" />}

      <ul className="space-y-1.5">
        {subtasks.map((subtask) => (
          <li
            key={subtask._id}
            className="group flex items-center gap-3 rounded-lg px-1 py-1.5 transition-colors hover:bg-canvas"
          >
            <button
              onClick={() =>
                update.mutate({
                  subTaskId: subtask._id,
                  payload: { isCompleted: !subtask.isCompleted },
                })
              }
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors",
                subtask.isCompleted
                  ? "border-success bg-success text-white"
                  : "border-border-strong text-transparent hover:border-brand"
              )}
              aria-label="Toggle subtask"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <span
              className={cn(
                "flex-1 text-sm",
                subtask.isCompleted
                  ? "text-faint line-through"
                  : "text-foreground"
              )}
            >
              {subtask.title}
            </span>
            {canManage && (
              <button
                onClick={() => remove.mutate(subtask._id)}
                className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-faint opacity-0 transition-all hover:text-danger group-hover:opacity-100"
                aria-label="Delete subtask"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </li>
        ))}
      </ul>

      {subtasks.length === 0 && (
        <p className="py-2 text-sm text-faint">No subtasks yet.</p>
      )}

      {canManage && (
        <form onSubmit={addSubtask} className="mt-3 flex items-center gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a subtask…"
            className="h-9 flex-1 rounded-lg border border-border-strong bg-surface px-3 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
          <button
            type="submit"
            disabled={!title.trim() || create.isPending}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand transition-colors hover:bg-brand hover:text-white disabled:opacity-50"
            aria-label="Add subtask"
          >
            {create.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </form>
      )}
    </div>
  );
};
