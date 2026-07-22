import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../queries/get-projects";
import { API_TOKEN, API_URL } from "../constants/constants";

export const Route = createFileRoute("/")({
  component: function Home() {
    const { isPending, isError, data, error, refetch } = useQuery({
      queryKey: ["projects"],
      queryFn: getProjects,
    });

    const [showForm, setShowForm] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleCreateProject(e) {
      e.preventDefault();
      if (!projectName.trim()) return;

      setIsSubmitting(true);
      try {
        const response = await fetch(`${API_URL}/projects?status=published`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify({ data: { projectName: projectName.trim() } }),
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(`HTTP ${response.status}: ${JSON.stringify(result)}`);
        }

        setProjectName("");
        setShowForm(false);
        await refetch();
      } catch (err) {
        console.error("Create project error:", err);
      } finally {
        setIsSubmitting(false);
      }
    }

    if (isPending) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
    }

    return (
      <div className="main-menu-container">
        <div className="main-menu">
          <h1>Choose a Project</h1>
          {data.length === 0 ? (
            <p className="projects-empty">No projects yet. Create one to get started!</p>
          ) : (
            <ul className="projects-list">
              {data.map((project) => (
                <li key={project.id}>
                  <Link to="/dashboard/$projectId" className="projects-list__item" params={{ projectId: project.documentId }}>
                    {project.projectName}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {showForm ? (
            <form className="project-form" onSubmit={handleCreateProject}>
              <input
                className="project-form__input"
                type="text"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                autoFocus
              />
              <div className="project-form__actions">
                <button className="button project-form__submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
                <button className="button project-form__cancel" type="button" onClick={() => { setShowForm(false); setProjectName(""); }}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button className="button project-form__add" onClick={() => setShowForm(true)}>
              + New Project
            </button>
          )}
        </div>
      </div>
    );
  },
});
