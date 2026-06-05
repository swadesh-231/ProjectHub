import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { Plus, Search, FolderKanban } from "lucide-react";
import { useProjects, useDeleteProject } from "../hooks/useProjects";
import { useAuthStore } from "../store/auth.store";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/common/Button";
import { SkeletonCard } from "../components/common/Skeleton";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorState } from "../components/common/ErrorState";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectFormModal } from "../components/projects/ProjectFormModal";
import { staggerContainer } from "../constants/motion";

const ProjectsPage = () => {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const user = useAuthStore((s) => s.user);
  const deleteProject = useDeleteProject();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    if (!projects) return [];
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [projects, query]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (project) => {
    setEditing(project);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Browse and manage every project you're part of."
        actions={
          <Button leftIcon={Plus} onClick={openCreate}>
            New project
          </Button>
        }
      />

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
        <input
          value={query}
          onChange={(e) =>
            setSearchParams(e.target.value ? { q: e.target.value } : {})
          }
          placeholder="Search projects…"
          className="h-10 w-full rounded-xl border border-border-strong bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
        />
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title={query ? "No matching projects" : "No projects yet"}
          description={
            query
              ? "Try a different search term."
              : "Create your first project to start organizing work."
          }
          action={
            !query && (
              <Button leftIcon={Plus} onClick={openCreate}>
                New project
              </Button>
            )
          }
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              canManage={project.role === "admin"}
              onEdit={openEdit}
              onDelete={setDeleting}
            />
          ))}
        </motion.div>
      )}

      <ProjectFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        project={editing}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete project"
        confirmLabel="Delete project"
        isLoading={deleteProject.isPending}
        onConfirm={() =>
          deleteProject.mutate(deleting._id, {
            onSuccess: () => setDeleting(null),
          })
        }
      />
    </div>
  );
};

export default ProjectsPage;
