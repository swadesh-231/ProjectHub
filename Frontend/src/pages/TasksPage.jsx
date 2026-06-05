import { ProjectScopedView } from "../components/layout/ProjectScopedView";
import { TaskBoardSection } from "../components/tasks/TaskBoardSection";

const TasksPage = () => (
  <ProjectScopedView
    title="Tasks"
    description="Plan and track work on the board. Drag cards to update status."
  >
    {(projectId) => <TaskBoardSection key={projectId} projectId={projectId} />}
  </ProjectScopedView>
);

export default TasksPage;
