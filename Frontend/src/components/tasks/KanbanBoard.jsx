import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { KanbanColumn } from "./KanbanColumn";
import { useUpdateTask } from "../../hooks/useTasks";
import { TASK_COLUMNS, QUERY_KEYS } from "../../constants";

export const KanbanBoard = ({
  projectId,
  tasks = [],
  canManage,
  onOpenTask,
  onAddTask,
}) => {
  const queryClient = useQueryClient();
  const updateTask = useUpdateTask(projectId);
  const dragging = useRef(null);

  const grouped = TASK_COLUMNS.reduce((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.status === col.id);
    return acc;
  }, {});

  const handleDrop = (status) => {
    const task = dragging.current;
    dragging.current = null;
    if (!task || task.status === status || !canManage) return;

    // Optimistically move the card, then persist.
    const key = QUERY_KEYS.tasks(projectId);
    queryClient.setQueryData(key, (old = []) =>
      old.map((t) => (t._id === task._id ? { ...t, status } : t))
    );

    updateTask.mutate(
      { taskId: task._id, payload: { status } },
      {
        onError: () =>
          queryClient.invalidateQueries({ queryKey: key }),
      }
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {TASK_COLUMNS.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={grouped[column.id]}
          canManage={canManage}
          draggingId={dragging.current?._id}
          onDragStart={(_, task) => {
            dragging.current = task;
          }}
          onDragEnd={() => {
            dragging.current = null;
          }}
          onDrop={handleDrop}
          onOpenTask={onOpenTask}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
};
