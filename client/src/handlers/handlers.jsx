import { API_TOKEN, API_URL } from "../constants/constants";

export function useTaskHandlers(refetch, projectId) {
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
      const taskId = task.documentId;
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!response.ok) {
        console.error("Delete failed:", response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (response.status === 204) {
        console.log("Task was deleted)");
      } else {
        const result = await response.json();
        console.log("Task deleted successfully:", result);
      }

      await refetch();
    } catch (err) {
      console.log(err);
    }
  }
  async function handleEditTask(task, title, description) {
    const requestBody = {
      data: {
        title,
        description,
      },
    };
    try {
      const taskId = task.documentId;
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error details:", result);
        throw new Error(`${response.status}: ${JSON.stringify(result)}`);
      }

      await refetch();
    } catch (error) {
      console.error("Add task error:", error);
    }
  }
  async function handleTags(task, activeTags) {
    const requestBody = {
      data: {
        tags: activeTags,
      },
    };

    try {
      const taskId = task.documentId;
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error details:", result);
        throw new Error(`${response.status}: ${JSON.stringify(result)}`);
      }

      await refetch();
    } catch (error) {
      console.error("Save tags error:", error);
    }
  }
  async function handleStatusChange(e, taskId) {
    const status = e.target.value;
    console.log(status);
    console.log(taskId);

    try {
      if (status === "null") {
        return;
      }

      const request = {
        data: {
          progress_status: status,
        },
      };
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error("Something went wrong " + result);
      }

      await refetch();
    } catch (error) {
      console.error("Something went wrong " + error);
    }
  }

  return { handleAddTask, handleDeleteTask, handleEditTask, handleTags, handleStatusChange };
}
