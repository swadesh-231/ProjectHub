import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projects.api";
import { tasksApi } from "../api/tasks.api";
import { QUERY_KEYS, TASK_STATUS } from "../constants";

/**
 * Aggregates dashboard metrics across every project the user belongs to.
 * The backend is project-scoped, so we fan out task requests per project.
 */
export const useDashboardStats = () =>
  useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: async () => {
      const projects = (await projectsApi.list()).data.data;

      const taskLists = await Promise.all(
        projects.map((p) =>
          tasksApi
            .list(p._id)
            .then((res) => res.data.data)
            .catch(() => [])
        )
      );

      const allTasks = taskLists.flat();
      const byStatus = {
        todo: allTasks.filter((t) => t.status === TASK_STATUS.TODO).length,
        in_progress: allTasks.filter(
          (t) => t.status === TASK_STATUS.IN_PROGRESS
        ).length,
        done: allTasks.filter((t) => t.status === TASK_STATUS.DONE).length,
      };

      const totalMembers = projects.reduce(
        (sum, p) => sum + (p.memberCount || 0),
        0
      );

      // Recent activity from newest tasks across projects.
      const projectName = Object.fromEntries(
        projects.map((p) => [p._id, p.name])
      );
      const activity = [...allTasks]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 8)
        .map((t) => ({
          id: t._id,
          title: t.title,
          status: t.status,
          project: projectName[t.project] || "Project",
          at: t.updatedAt,
        }));

      const perProject = projects.map((p, i) => {
        const tasks = taskLists[i];
        const done = tasks.filter((t) => t.status === TASK_STATUS.DONE).length;
        return {
          id: p._id,
          name: p.name,
          total: tasks.length,
          done,
          progress: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
        };
      });

      return {
        totals: {
          projects: projects.length,
          activeTasks: byStatus.todo + byStatus.in_progress,
          completedTasks: byStatus.done,
          members: totalMembers,
        },
        byStatus,
        activity,
        perProject,
      };
    },
  });
