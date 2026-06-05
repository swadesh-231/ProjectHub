import { useEffect } from "react";
import { Link } from "react-router";
import { FolderKanban, Plus } from "lucide-react";
import { useProjects } from "../../hooks/useProjects";
import { useUiStore } from "../../store/ui.store";
import { PageHeader } from "../common/PageHeader";
import { ProjectSwitcher } from "../common/ProjectSwitcher";
import { Button } from "../common/Button";
import { EmptyState } from "../common/EmptyState";
import { ErrorState } from "../common/ErrorState";
import { Spinner } from "../common/Spinner";

/**
 * Shared shell for project-scoped pages (Tasks, Notes, Team). Resolves the
 * active project (persisted in the UI store) and renders `children(projectId)`.
 */
export const ProjectScopedView = ({ title, description, children }) => {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const { activeProjectId, setActiveProjectId } = useUiStore();

  useEffect(() => {
    if (!projects?.length) return;
    const exists = projects.some((p) => p._id === activeProjectId);
    if (!exists) setActiveProjectId(projects[0]._id);
  }, [projects, activeProjectId, setActiveProjectId]);

  const currentId =
    projects?.some((p) => p._id === activeProjectId) && activeProjectId
      ? activeProjectId
      : projects?.[0]?._id;

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        actions={
          projects?.length ? (
            <ProjectSwitcher
              projects={projects}
              value={currentId}
              onChange={setActiveProjectId}
            />
          ) : null
        }
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-6 w-6" />
        </div>
      ) : !projects.length ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create a project first to start adding tasks, notes and members."
          action={
            <Link to="/projects">
              <Button leftIcon={Plus}>Go to Projects</Button>
            </Link>
          }
        />
      ) : (
        currentId && children(currentId)
      )}
    </div>
  );
};
