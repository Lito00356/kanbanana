import { API_TOKEN, API_URL } from "../constants/constants";

export async function getTasksByProject(projectId) {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  const response = await fetch(
    `${API_URL}/tasks?filters[project][documentId][$eq]=${projectId}&populate=*&status=draft&pagination[limit]=100`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  const data = await response.json();

  return data.data;
}
