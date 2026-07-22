import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "./pagination/pagination";
import { DisplayTask } from "../task";
import { useTaskHandlers } from "../../handlers/handlers";
import { AddTaskButton } from "../add-task/add-task";
import { getProgressStatuses } from "../../queries/get-progress-statuses";

export function PaginatedBacklog({ selectedProject, isLoading, error, refetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: statuses = [] } = useQuery({
    queryKey: ["progress-statuses"],
    queryFn: getProgressStatuses,
  });
  const backlogId = statuses.find((status) => status.progStatus === "backlog")?.id;

  const backlogTasks = useMemo(() => {
    if (!selectedProject?.tasks) return [];
    return selectedProject.tasks.filter((task) => task.progress_status?.progStatus === "backlog");
  }, [selectedProject]);

  const paginatedTasks = useMemo(() => {
    const start = pageSize * (currentPage - 1);
    return backlogTasks.slice(start, start + pageSize);
  }, [backlogTasks, currentPage, pageSize]);

  const pageCount = Math.ceil(backlogTasks.length / pageSize);

  const { handleAddTask, handleDeleteTask, handleEditTask, handleTags, handleStatusChange } = useTaskHandlers(
    refetch,
    selectedProject?.documentId,
  );

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return (
    <>
      {selectedProject ? (
        <>
          <div className="outlet__title">
            <small>for</small>
            <h2>{selectedProject.projectName}</h2>
          </div>
          <div className="outlet-taskwrapper">
            <div className="outlet__tasks">
              {paginatedTasks.map((task) => (
                <DisplayTask
                  key={task.id}
                  task={task}
                  handleDelete={handleDeleteTask}
                  handleEdit={handleEditTask}
                  handleTags={handleTags}
                  handleStatusChange={handleStatusChange}
                />
              ))}
              {backlogTasks.length === 0 && <p className="backlog-empty">No tasks in backlog</p>}
            </div>
            <AddTaskButton status={backlogId} onAddTask={handleAddTask} />
          </div>
          {pageCount > 1 && (
            <div className="pagination-wrapper">
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                pageSize={pageSize}
                onPageChanged={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        <div>
          <small>Select a project</small>
        </div>
      )}
    </>
  );
}
