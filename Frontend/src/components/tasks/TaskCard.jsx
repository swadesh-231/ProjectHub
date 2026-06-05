import { motion } from "framer-motion";
import { Paperclip } from "lucide-react";
import { Avatar } from "../common/Avatar";
import { cn } from "../../utils/cn";

export const TaskCard = ({ task, onClick, onDragStart, onDragEnd, dragging }) => {
  const assignee = task.assignedTo;

  // Native HTML5 drag lives on a plain wrapper — Framer Motion would otherwise
  // intercept onDragStart/onDragEnd as gesture callbacks and they'd never fire.
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      onClick={() => onClick(task)}
    >
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        whileHover={{ y: -2 }}
        className={cn(
          "group cursor-grab rounded-xl border border-border-subtle bg-surface p-3.5 shadow-soft transition-shadow hover:shadow-card active:cursor-grabbing",
          dragging && "opacity-50"
        )}
      >
        <p className="text-sm font-medium leading-snug text-foreground">
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
            {task.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-faint">
            {task.attachments?.length > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <Paperclip className="h-3.5 w-3.5" />
                {task.attachments.length}
              </span>
            )}
          </div>
          {assignee ? (
            <Avatar
              name={assignee.fullName || assignee.username}
              src={assignee.avatar?.url}
              size="xs"
            />
          ) : (
            <span className="text-[11px] text-faint">Unassigned</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
