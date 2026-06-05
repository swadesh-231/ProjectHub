import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Card } from "../common/Card";
import { EmptyState } from "../common/EmptyState";
import { fromNow } from "../../utils/format";
import { Activity } from "lucide-react";

const STATUS_META = {
  todo: { icon: Circle, className: "text-faint" },
  in_progress: { icon: Clock, className: "text-brand" },
  done: { icon: CheckCircle2, className: "text-success" },
};

export const ActivityFeed = ({ activity }) => (
  <Card className="flex h-full flex-col p-6">
    <h3 className="font-display text-base font-semibold text-foreground">
      Recent Activity
    </h3>
    <p className="mt-0.5 text-sm text-muted">Latest task updates</p>

    {activity.length ? (
      <ul className="mt-5 space-y-1">
        {activity.map((item) => {
          const meta = STATUS_META[item.status] || STATUS_META.todo;
          const Icon = meta.icon;
          return (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-canvas"
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${meta.className}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted">
                  {item.project} · {fromNow(item.at)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <EmptyState
        icon={Activity}
        title="No activity yet"
        description="Task updates will appear here."
        className="mt-5 flex-1 border-0"
      />
    )}
  </Card>
);
