import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import { useDashboardStats } from "../hooks/useDashboard";
import { PageHeader } from "../components/common/PageHeader";
import { Card } from "../components/common/Card";
import { ProgressBar } from "../components/common/ProgressBar";
import { EmptyState } from "../components/common/EmptyState";
import { StatCard } from "../components/dashboard/StatCard";
import { TaskProgressChart } from "../components/dashboard/TaskProgressChart";
import { ProjectCompletionChart } from "../components/dashboard/ProjectCompletionChart";
import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { SkeletonStat } from "../components/common/Skeleton";
import { ErrorState } from "../components/common/ErrorState";
import { staggerContainer } from "../constants/motion";

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, isError, refetch } = useDashboardStats();

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="space-y-7">
      <PageHeader
        title={`${greeting}, ${user?.fullName?.split(" ")[0] || user?.username || "there"}`}
        description="Here's what's happening across your workspace today."
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonStat key={i} />
            ))}
          </div>
          <div className="h-72 animate-pulse rounded-2xl border border-border-subtle bg-surface" />
        </>
      ) : (
        <>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <StatCard
              icon={FolderKanban}
              label="Total Projects"
              value={data.totals.projects}
              tone="brand"
            />
            <StatCard
              icon={ListTodo}
              label="Active Tasks"
              value={data.totals.activeTasks}
              tone="warning"
            />
            <StatCard
              icon={CheckCircle2}
              label="Completed Tasks"
              value={data.totals.completedTasks}
              tone="success"
            />
            <StatCard
              icon={Users}
              label="Team Members"
              value={data.totals.members}
              tone="neutral"
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <TaskProgressChart byStatus={data.byStatus} />
            </div>
            <div className="lg:col-span-2">
              <ProjectCompletionChart perProject={data.perProject} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProjectsOverview perProject={data.perProject} />
            </div>
            <div className="lg:col-span-1">
              <ActivityFeed activity={data.activity} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ProjectsOverview = ({ perProject }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <h3 className="font-display text-base font-semibold text-foreground">
        Projects Overview
      </h3>
      <Link
        to="/projects"
        className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
      >
        View all <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>

    {perProject.length ? (
      <div className="mt-5 space-y-4">
        {perProject.slice(0, 5).map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            className="block rounded-xl px-2 py-2 transition-colors hover:bg-canvas"
          >
            <div className="flex items-center justify-between">
              <span className="truncate text-sm font-medium text-foreground">
                {p.name}
              </span>
              <span className="ml-3 shrink-0 text-xs text-muted">
                {p.done}/{p.total} · {p.progress}%
              </span>
            </div>
            <ProgressBar value={p.progress} className="mt-2" />
          </Link>
        ))}
      </div>
    ) : (
      <EmptyState
        icon={FolderKanban}
        title="No projects yet"
        description="Create your first project to get started."
        className="mt-5 border-0"
      />
    )}
  </Card>
);

export default DashboardPage;
