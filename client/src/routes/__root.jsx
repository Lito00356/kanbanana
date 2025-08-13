import React from "react";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { ProjectMenu } from "../components/project-menu/project-menu";
import { SearchBar } from "../components/search-bar/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../queries/get-projects";

export const Route = createRootRoute({
  component: () => {
    const {
      data: projects,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["projects"],
      queryFn: getProjects,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading projects.</div>;

    return (
      <>
        <main>
          <div className="menu-items">
            <ProjectMenu projects={projects} />
            <div className="flex">
              <SearchBar />
            </div>
          </div>
          <Outlet />
        </main>
      </>
    );
  },
});
