import { useState, useEffect } from "react";
import { BacklogList } from "./backlog-list/backlog-list";
import { Pagination } from "./pagination/pagination";

export function PaginatedBacklog({ selectedProject, isPending, isError, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log(selectedProject);

    setCurrentPage(1);
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      fetchBacklogItems(selectedProject, pageSize, currentPage);
    }
  }, [selectedProject, currentPage, pageSize]);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(size) {
    setPageSize(size);
    setCurrentPage(1);
  }

  async function fetchBacklogItems(project, pageSize, currentPage) {
    let start = pageSize * (currentPage - 1);
    let tasks = [];
    for (let i = start; i < Math.min(start + pageSize, project.tasks.length); i++) {
      tasks.push(project.tasks[i]);
    }
    setTasks(tasks);
  }

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <>
      {selectedProject ? (
        <>
          <div className="outlet__title">
            <small>for</small>
            <h2>{selectedProject.projectName}</h2>
          </div>
          <BacklogList tasks={tasks} />
          <Pagination currentPage={currentPage} pageCount={Math.ceil(selectedProject.tasks.length / pageSize)} pageSize={pageSize} onPageChanged={handlePageChanged} onPageSizeChanged={handlePageSizeChanged} />
        </>
      ) : (
        <div>
          <small>Select a project</small>
        </div>
      )}
    </>
  );
}
