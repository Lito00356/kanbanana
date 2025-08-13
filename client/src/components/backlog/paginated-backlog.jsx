import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPaginatedBacklogTasks } from "../../queries/get-backlog-tasks";
import { BacklogList } from "./backlog-list/backlog-list";
import { Pagination } from "./pagination/pagination";

export function PaginatedBacklog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tasks", currentPage, pageSize],
    queryFn: () => getPaginatedBacklogTasks(currentPage, pageSize),
    staleTime: 1000,
  });

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(size) {
    setPageSize(size);
    setCurrentPage(1);
  }

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const tasks = data.data;
  const pageCount = data.meta.pagination.pageCount;

  return (
    <>
      <div>
        <BacklogList tasks={tasks} />
      </div>
      <Pagination currentPage={currentPage} pageCount={pageCount} pageSize={pageSize} onPageChanged={handlePageChanged} onPageSizeChanged={handlePageSizeChanged} />
    </>
  );
}
