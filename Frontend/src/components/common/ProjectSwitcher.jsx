import { FolderKanban } from "lucide-react";
import { Select } from "./Select";

/**
 * Project picker used by project-scoped pages (Tasks, Notes, Team).
 */
export const ProjectSwitcher = ({ projects = [], value, onChange }) => {
  if (!projects.length) return null;
  return (
    <div className="flex items-center gap-2.5">
      <span className="hidden items-center gap-1.5 text-sm text-muted sm:flex">
        <FolderKanban className="h-4 w-4" />
        Project
      </span>
      <Select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        options={projects.map((p) => ({ value: p._id, label: p.name }))}
        className="h-9 min-w-52"
      />
    </div>
  );
};
