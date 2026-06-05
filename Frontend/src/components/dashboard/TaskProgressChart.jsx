import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card } from "../common/Card";

const COLORS = {
  todo: "#94a3b8",
  in_progress: "#6366f1",
  done: "#10b981",
};

const LABELS = { todo: "Todo", in_progress: "In Progress", done: "Done" };

export const TaskProgressChart = ({ byStatus }) => {
  const data = [
    { key: "todo", value: byStatus.todo },
    { key: "in_progress", value: byStatus.in_progress },
    { key: "done", value: byStatus.done },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">
            Task Distribution
          </h3>
          <p className="mt-0.5 text-sm text-muted">Across all projects</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6">
        <div className="relative h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="key"
                innerRadius={56}
                outerRadius={78}
                paddingAngle={total ? 3 : 0}
                strokeWidth={0}
              >
                {data.map((d) => (
                  <Cell key={d.key} fill={COLORS[d.key]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--elevated)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "var(--foreground)",
                }}
                formatter={(value, key) => [value, LABELS[key]]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-semibold text-foreground">
              {total}
            </span>
            <span className="text-xs text-muted">tasks</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((d) => (
            <div key={d.key} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-muted">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: COLORS[d.key] }}
                />
                {LABELS[d.key]}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
