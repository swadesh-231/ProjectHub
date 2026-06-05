import {
  Paperclip,
  Download,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  User,
} from "lucide-react";
import { Drawer } from "../common/Drawer";
import { Button } from "../common/Button";
import { Avatar } from "../common/Avatar";
import { StatusBadge } from "../common/Badge";
import { Spinner } from "../common/Spinner";
import { SubtaskList } from "./SubtaskList";
import { useTask } from "../../hooks/useTasks";
import { formatBytes, formatDateTime } from "../../utils/format";

const isImage = (mimetype = "") => mimetype.startsWith("image/");

export const TaskDrawer = ({
  open,
  onClose,
  projectId,
  taskId,
  canManage,
  onEdit,
  onDelete,
}) => {
  const { data, isLoading } = useTask(projectId, open ? taskId : null);
  const task = data?.task;
  const subtasks = data?.subtasks || [];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      subtitle="Task"
      title={task?.title || (isLoading ? "Loading…" : "Task")}
    >
      {isLoading || !task ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={task.status} />
            {canManage && (
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={Pencil}
                  onClick={() => onEdit(task)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task)}
                  className="text-faint hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {task.description && (
            <div>
              <h4 className="mb-1.5 text-sm font-semibold text-foreground">
                Description
              </h4>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
                {task.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-faint">
                Assignee
              </p>
              {task.assignedTo ? (
                <div className="flex items-center gap-2">
                  <Avatar
                    name={task.assignedTo.fullName || task.assignedTo.username}
                    src={task.assignedTo.avatar?.url}
                    size="xs"
                  />
                  <span className="text-sm text-foreground">
                    {task.assignedTo.fullName || task.assignedTo.username}
                  </span>
                </div>
              ) : (
                <span className="flex items-center gap-1.5 text-sm text-faint">
                  <User className="h-3.5 w-3.5" /> Unassigned
                </span>
              )}
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-faint">
                Created
              </p>
              <span className="text-sm text-foreground">
                {formatDateTime(task.createdAt)}
              </span>
            </div>
          </div>

          <div className="h-px bg-border-subtle" />

          <SubtaskList
            projectId={projectId}
            taskId={task._id}
            subtasks={subtasks}
            canManage={canManage}
          />

          <div className="h-px bg-border-subtle" />

          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Paperclip className="h-4 w-4" /> Attachments
              <span className="text-xs font-normal text-muted">
                ({task.attachments?.length || 0})
              </span>
            </h4>
            {task.attachments?.length ? (
              <div className="grid grid-cols-1 gap-2">
                {task.attachments.map((file, i) => (
                  <a
                    key={i}
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border-subtle bg-canvas/50 p-2.5 transition-colors hover:border-border-strong"
                  >
                    {isImage(file.mimetype) ? (
                      <img
                        src={file.url}
                        alt="attachment"
                        className="h-11 w-11 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                        <Paperclip className="h-4 w-4" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {file.url.split("/").pop()}
                      </p>
                      <p className="text-xs text-faint">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                    <Download className="h-4 w-4 text-faint transition-colors group-hover:text-brand" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-faint">No attachments.</p>
            )}
          </div>

          <div className="h-px bg-border-subtle" />

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Activity
            </h4>
            <ol className="relative space-y-4 border-l border-border-subtle pl-5">
              <li className="relative">
                <span className="absolute -left-[26px] grid h-5 w-5 place-items-center rounded-full bg-brand-soft text-brand">
                  <Clock className="h-3 w-3" />
                </span>
                <p className="text-sm text-foreground">Task created</p>
                <p className="text-xs text-faint">
                  {formatDateTime(task.createdAt)}
                </p>
              </li>
              <li className="relative">
                <span className="absolute -left-[26px] grid h-5 w-5 place-items-center rounded-full bg-success-soft text-success">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
                <p className="text-sm text-foreground">Last updated</p>
                <p className="text-xs text-faint">
                  {formatDateTime(task.updatedAt)}
                </p>
              </li>
            </ol>
          </div>
        </div>
      )}
    </Drawer>
  );
};
