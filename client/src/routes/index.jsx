import React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../queries/get-projects";

export const Route = createFileRoute("/")({
  component: function Home() {
    const { isPending, isError, data, error } = useQuery({
      queryKey: ["projects"],
      queryFn: getProjects,
    });

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
          <ul className="projects-list">
            {data.map((project) => (
              <li key={project.id}>
                <Link to="/dashboard/$projectId" className="projects-list__item" params={{ projectId: project.documentId }}>
                  {project.projectName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
});
