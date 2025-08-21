import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBacklog } from "../components/backlog/paginated-backlog";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getProjects } from "../queries/get-projects";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/backlog")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [params, setParams] = useState(Route.useParams());

  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  function handleClick(documentId) {
    setParams((prevParams) => ({
      ...prevParams,
      projectId: documentId,
    }));
  }

  useEffect(() => {
    if (projects && params.projectId) {
      const foundProject = projects.find((project) => project.documentId === params.projectId);
      setSelectedProject(foundProject);
    }
  }, [params.projectId, projects, params]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project.</div>;
  if (!projects) return <div>Project not found.</div>;

  return (
    <>
      <main className="backlog-container">
        <div className="projects-container">
          <h1>Backlog</h1>
          <ul className="projects-list">
            {projects.map((project) => (
              <li key={project.id} className="projects-list-item">
                <Link to={`/backlog?projectId=${project.documentId}`} onClick={() => handleClick(project.documentId)}>
                  {project.projectName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="outlet">
          <PaginatedBacklog selectedProject={selectedProject} isLoading={isLoading} error={error} />
        </div>
      </main>
    </>
  );
}
