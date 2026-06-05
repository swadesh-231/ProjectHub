import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card } from "../common/Card";
import { EmptyState } from "../common/EmptyState";
import { BarChart3 } from "lucide-react";

export const ProjectCompletionChart = ({ perProject }) => {
  const data = perProject
    .filter((p) => p.total > 0)
    .slice(0, 6)
    .map((p) => ({
      name: p.name.length > 14 ? `${p.name.slice(0, 14)}…` : p.name,
      progress: p.progress,
    }));

  return (
    <Card className="p-6">
      <h3 className="font-display text-base font-semibold text-foreground">
        Project Completion
      </h3>
      <p className="mt-0.5 text-sm text-muted">% of tasks completed</p>

      {data.length ? (
        <div className="mt-5 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -18, right: 8 }}>
              <CartesianGrid
                vertical={false}
                stroke="var(--border-subtle)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "var(--muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "var(--faint)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "var(--canvas)" }}
                contentStyle={{
                  background: "var(--elevated)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "var(--foreground)",
                }}
                formatter={(value) => [`${value}%`, "Completion"]}
              />
              <Bar
                dataKey="progress"
                fill="var(--brand-solid)"
                radius={[6, 6, 0, 0]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState
          icon={BarChart3}
          title="No task data yet"
          description="Create tasks in your projects to see completion trends."
          className="mt-5 border-0 py-10"
        />
      )}
    </Card>
  );
};
