import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBacklog } from "../components/backlog/paginated-backlog";

export const Route = createFileRoute("/backlog")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <nav>
        <ul>
          <li>Project 1</li>
        </ul>
      </nav>
      <main>
        <PaginatedBacklog />
      </main>
    </>
  );
}
