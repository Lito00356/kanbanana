import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBacklog } from "../components/backlog/paginated-backlog";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getProjects } from "../queries/get-projects";
import { getProjectById } from "../queries/get-project-by-id";
import { useState } from "react";
import { ProjectMenu } from "../components/project-menu/project-menu";

export const Route = createFileRoute("/backlog")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  const {
    data: selectedProject,
    isLoading: projectLoading,
    refetch: refetchProject,
  } = useQuery({
    queryKey: ["project", selectedProjectId],
    queryFn: () => getProjectById(selectedProjectId),
    enabled: !!selectedProjectId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project.</div>;
  if (!projects) return <div>Project not found.</div>;

  return (
    <>
      <main className="backlog-container">
        <div className="projects-container">
          <h1>Backlog</h1>
          <ul className="projects-list">
            {projects.map((project) => {
              const taskCount = project.tasks ? project.tasks.filter((task) => task.progress_status?.progStatus === "backlog").length : 0;
              return (
                <li key={project.id}>
                  <div className="backlog-list-wrapper">
                    <Link to={`/backlog?projectId=${project.documentId}`} className="projects-list-item" onClick={() => setSelectedProjectId(project.documentId)}>
                      {project.projectName}
                    </Link>
                    <small>{taskCount}</small>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="outlet">
          <PaginatedBacklog selectedProject={selectedProject} isLoading={projectLoading} error={error} refetch={refetchProject} />
        </div>
        <div className="menu-items">
          <ProjectMenu />
        </div>
      </main>
    </>
  );
}
