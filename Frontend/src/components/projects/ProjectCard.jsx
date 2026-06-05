import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { MoreHorizontal, Users, Pencil, Trash2, ArrowUpRight } from "lucide-react";
import { Dropdown } from "../common/Dropdown";
import { Badge } from "../common/Badge";
import { ROLE_LABELS } from "../../constants";
import { colorFromString, formatDate } from "../../utils/format";
import { fadeInUp } from "../../constants/motion";

export const ProjectCard = ({ project, onEdit, onDelete, canManage }) => {
  const navigate = useNavigate();
  const accent = colorFromString(project.name);

  return (
    <motion.div
      variants={fadeInUp}
      onClick={() => navigate(`/projects/${project._id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card"
    >
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: accent }}
      />

      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl font-display text-base font-semibold text-white"
          style={{ background: accent }}
        >
          {project.name.charAt(0).toUpperCase()}
        </span>

        <div onClick={(e) => e.stopPropagation()}>
          {canManage ? (
            <Dropdown
              trigger={
                <button className="grid h-8 w-8 place-items-center rounded-lg text-faint opacity-0 transition-all hover:bg-canvas hover:text-foreground group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              }
              items={[
                { label: "Edit project", icon: Pencil, onClick: () => onEdit(project) },
                { type: "divider" },
                { label: "Delete", icon: Trash2, danger: true, onClick: () => onDelete(project) },
              ]}
            />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-faint opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
      </div>

      <h3 className="mt-4 truncate font-display text-base font-semibold text-foreground">
        {project.name}
      </h3>
      <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-muted">
        {project.description || "No description provided."}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-3.5">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Users className="h-3.5 w-3.5" />
          {project.memberCount ?? 0}{" "}
          {project.memberCount === 1 ? "member" : "members"}
        </span>
        {project.role && (
          <Badge tone={project.role === "admin" ? "brand" : "neutral"}>
            {ROLE_LABELS[project.role]}
          </Badge>
        )}
      </div>

      <p className="mt-2 text-xs text-faint">
        Created {formatDate(project.createdAt)}
      </p>
    </motion.div>
  );
};
