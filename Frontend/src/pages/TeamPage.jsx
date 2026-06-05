import { ProjectScopedView } from "../components/layout/ProjectScopedView";
import { TeamSection } from "../components/team/TeamSection";

const TeamPage = () => (
  <ProjectScopedView
    title="Team"
    description="Manage who has access to each project and their roles."
  >
    {(projectId) => <TeamSection key={projectId} projectId={projectId} />}
  </ProjectScopedView>
);

export default TeamPage;
