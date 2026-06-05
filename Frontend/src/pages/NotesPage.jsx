import { ProjectScopedView } from "../components/layout/ProjectScopedView";
import { NotesSection } from "../components/notes/NotesSection";

const NotesPage = () => (
  <ProjectScopedView
    title="Notes"
    description="Keep shared context, decisions and updates in one place."
  >
    {(projectId) => <NotesSection key={projectId} projectId={projectId} />}
  </ProjectScopedView>
);

export default NotesPage;
