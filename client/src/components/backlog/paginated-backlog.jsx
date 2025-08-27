import { useState, useEffect } from "react";
import { BacklogList } from "./backlog-list/backlog-list";
import { Pagination } from "./pagination/pagination";
import { DisplayTask } from "../task";
import { useTaskHandlers } from "../../handlers/handlers";
import { AddTaskButton } from "../add-task/add-task";

export function PaginatedBacklog({ selectedProject, isPending, isError, error, refetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectID, setSelectedProjectID] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      fetchBacklogItems(selectedProject, pageSize, currentPage);
      setSelectedProjectID(selectedProject.documentId);
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
    const backlogTasks = project.tasks ? project.tasks.filter((task) => task.progress_status?.progStatus === "backlog") : [];

    let start = pageSize * (currentPage - 1);
    const paginatedTasks = backlogTasks.slice(start, start + pageSize);
    setTasks(paginatedTasks);
  }

  const { handleAddTask, handleDeleteTask, handleEditTask, handleTags, handleStatusChange } = useTaskHandlers(refetch, selectedProjectID);

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
          <div className="outlet-taskwrapper">
            <div className="outlet__tasks">
              {tasks.map((task) => (
                <DisplayTask key={task.id} task={task} handleDelete={handleDeleteTask} handleEdit={handleEditTask} handleTags={handleTags} handleStatusChange={handleStatusChange} />
              ))}
            </div>
            <div className="outlet-add-wrapper">
              <small>Add to backlog</small>
              <AddTaskButton status={9} onAddTask={handleAddTask} />
            </div>
          </div>
          <div className="pagination-wrapper">
            <Pagination currentPage={currentPage} pageCount={Math.ceil(selectedProject.tasks.length / pageSize)} pageSize={pageSize} onPageChanged={handlePageChanged} onPageSizeChanged={handlePageSizeChanged} />
          </div>
        </>
      ) : (
        <div>
          <small>Select a project</small>
        </div>
      )}
    </>
  );
}
