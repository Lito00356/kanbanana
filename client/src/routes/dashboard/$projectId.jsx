import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getProjectById } from "../../queries/get-project-by-id";
import { DisplayTask } from "../../components/task";
import { AddTaskButton } from "../../components/add-task/add-task";
import { API_TOKEN, API_URL } from "../../constants/constants";

export const Route = createFileRoute("/dashboard/$projectId")({
  component: function DashboardProject() {
    const { projectId } = Route.useParams();
    const {
      data: project,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getProjectById(projectId),
    });

    const [tasks, setTasks] = useState([]);

    React.useEffect(() => {
      if (project?.tasks) {
        setTasks(project.tasks);
      }
    }, [project]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading project.</div>;
    if (!project) return <div>Project not found.</div>;

    const allTasks = tasks;

    const statusColumn = {
      toDo: [],
      inProgress: [],
      readyForReview: [],
      done: [],
      backlog: [],
    };

    const statusID = {
      toDo: 7,
      inProgress: 3,
      readyForReview: 5,
      done: 1,
    };

    const IDStatus = {
      7: "toDo",
      3: "inProgress",
      5: "readyForReview",
      1: "done",
    };

    allTasks.forEach((task) => {
      const prog = task.progress_status;
      let key = "backlog";
      if (prog) {
        key = prog.progStatus;
      }

      if (statusColumn[key]) {
        statusColumn[key].push(task);
      } else {
        statusColumn.backlog.push(task);
      }
    });

    async function handleAddTask(title, status) {
      const requestBody = {
        data: {
          title,
          progress_status: status,
          project: projectId,
        },
      };
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify(requestBody),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Error details:", result);
          throw new Error(`HTTP ${response.status}: ${JSON.stringify(result)}`);
        }

        await refetch();
      } catch (error) {
        console.error("Add task error:", error);
      }
    }

    async function handleDeleteTask(task) {
      try {
        const docID = task.documentId;
        const response = await fetch(`${API_URL}/tasks/${docID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!response.ok) {
          const result = await response.json().catch(() => ({}));
          throw new Error(`${response.status}: ${JSON.stringify(result)}`);
        }

        await refetch();
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <>
        <div className="flex baseline">
          <h1 className="title">{project.projectName}</h1>
          <small>project</small>
        </div>
        <section className="tasks-container">
          <div className="tasks" id="to-do">
            <strong className="tasks__title">To Do</strong>
            <ul className="task">
              {statusColumn.toDo.map((task) => (
                <DisplayTask key={task.id} task={task} tags={task.tags} handleDelete={handleDeleteTask} />
              ))}
            </ul>
            <AddTaskButton status={statusID.toDo} onAddTask={handleAddTask} />
          </div>

          <div className="tasks" id="in-progress">
            <strong className="tasks__title">In progress</strong>
            <ul className="task">
              {statusColumn.inProgress.map((task) => (
                <DisplayTask key={task.id} task={task} tags={task.tags} handleDelete={handleDeleteTask} />
              ))}
            </ul>
            <AddTaskButton status={statusID.inProgress} onAddTask={handleAddTask} />
          </div>

          <div className="tasks" id="in-progress">
            <strong className="tasks__title">Ready for review</strong>
            <ul className="task">
              {statusColumn.readyForReview.map((task) => (
                <DisplayTask key={task.id} task={task} tags={task.tags} handleDelete={handleDeleteTask} />
              ))}
            </ul>
            <AddTaskButton status={statusID.readyForReview} onAddTask={handleAddTask} />
          </div>

          <div className="tasks" id="in-progress">
            <strong className="tasks__title">Done</strong>
            <ul className="task">
              {statusColumn.done.map((task) => (
                <DisplayTask key={task.id} task={task} tags={task.tags} handleDelete={handleDeleteTask} />
              ))}
            </ul>
            <AddTaskButton status={statusID.done} onAddTask={handleAddTask} />
          </div>
        </section>
      </>
    );
  },
});
