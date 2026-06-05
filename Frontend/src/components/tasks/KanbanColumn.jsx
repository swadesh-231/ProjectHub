import { useState } from "react";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { cn } from "../../utils/cn";

export const KanbanColumn = ({
  column,
  tasks,
  canManage,
  draggingId,
  onDragStart,
  onDragEnd,
  onDrop,
  onOpenTask,
  onAddTask,
}) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        onDrop(column.id);
      }}
      className={cn(
        "flex h-full min-h-[60vh] w-full flex-col rounded-2xl border bg-canvas/40 transition-colors",
        isOver ? "border-brand bg-brand-soft/40" : "border-border-subtle"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: column.accent }}
          />
          <h3 className="text-sm font-semibold text-foreground">
            {column.title}
          </h3>
          <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted">
            {tasks.length}
          </span>
        </div>
        {canManage && (
          <button
            onClick={() => onAddTask(column.id)}
            className="grid h-7 w-7 place-items-center rounded-lg text-faint transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Add task"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-3 pb-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            dragging={draggingId === task._id}
            onClick={onOpenTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border-subtle py-10 text-xs text-faint">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};
