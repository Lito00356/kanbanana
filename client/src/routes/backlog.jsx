import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBacklog } from "../components/backlog/paginated-backlog";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getProjects } from "../queries/get-projects";

export const Route = createFileRoute("/backlog")({
  component: function BacklogTasks() {
    const { projectId } = Route.useParams();
    const {
      data: projects,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["projects"],
      queryFn: () => getProjects(),
    });

    console.log(projects);

    // React.useEffect(() => {
    //   if (projects?.tasks) {
    //     setTasks(projects.tasks);
    //   }
    // }, [projects]);

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
                  <Link to={`/backlog/${project.documentId}`}>{project.projectName}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="outlet">
            <div className="outlet__title">
              <small>for</small>
              <h2> Project title</h2>
            </div>
            <PaginatedBacklog />
          </div>
        </main>
      </>
    );
  },
});
