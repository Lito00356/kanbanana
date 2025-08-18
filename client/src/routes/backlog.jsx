import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBacklog } from "../components/backlog/paginated-backlog";

export const Route = createFileRoute("/backlog")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className="backlog-container">
        <div className="projects-container">
          <h1>Backlog</h1>
          <ul className="projects-list">
            <li className="projects-list-item">project1</li>
            <li>project2</li>
            <li>project3</li>
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
}
