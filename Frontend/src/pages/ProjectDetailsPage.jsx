import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  LayoutGrid,
  StickyNote,
  Users,
  Pencil,
  Trash2,
  Calendar,
} from "lucide-react";
import { useProject, useDeleteProject } from "../hooks/useProjects";
import { useProjectRole } from "../hooks/useProjectRole";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Skeleton } from "../components/common/Skeleton";
import { ErrorState } from "../components/common/ErrorState";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { ProjectFormModal } from "../components/projects/ProjectFormModal";
import { TaskBoardSection } from "../components/tasks/TaskBoardSection";
import { NotesSection } from "../components/notes/NotesSection";
import { TeamSection } from "../components/team/TeamSection";
import { ROLE_LABELS } from "../constants";
import { formatDate, colorFromString } from "../utils/format";
import { cn } from "../utils/cn";

const TABS = [
  { id: "board", label: "Board", icon: LayoutGrid },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "team", label: "Team", icon: Users },
];

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading, isError, refetch } = useProject(projectId);
  const { role, isAdmin } = useProjectRole(projectId);
  const deleteProject = useDeleteProject();

  const [tab, setTab] = useState("board");
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (isError) return <ErrorState onRetry={refetch} />;

  const accent = project ? colorFromString(project.name) : "#6366f1";

  return (
    <div className="space-y-6">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      {isLoading || !project ? (
        <div className="space-y-3">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-xl font-semibold text-white shadow-soft"
              style={{ background: accent }}
            >
              {project.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {project.name}
                </h1>
                {role && (
                  <Badge tone={role === "admin" ? "brand" : "neutral"}>
                    {ROLE_LABELS[role]}
                  </Badge>
                )}
              </div>
              <p className="mt-1 max-w-2xl text-sm text-muted">
                {project.description || "No description provided."}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-faint">
                <Calendar className="h-3.5 w-3.5" />
                Created {formatDate(project.createdAt)}
              </p>
            </div>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={Pencil}
                onClick={() => setEditOpen(true)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-faint hover:text-danger"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium transition-colors",
                active ? "text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {t.label}
              {active && (
                <motion.span
                  layoutId="project-tab"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-solid"
                />
              )}
            </button>
          );
        })}
      </div>

      {!isLoading && project && (
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "board" && <TaskBoardSection projectId={projectId} />}
          {tab === "notes" && <NotesSection projectId={projectId} />}
          {tab === "team" && <TeamSection projectId={projectId} />}
        </motion.div>
      )}

      <ProjectFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        project={project}
      />

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete project"
        confirmLabel="Delete project"
        isLoading={deleteProject.isPending}
        onConfirm={() =>
          deleteProject.mutate(projectId, {
            onSuccess: () => navigate("/projects", { replace: true }),
          })
        }
      />
    </div>
  );
};

export default ProjectDetailsPage;
