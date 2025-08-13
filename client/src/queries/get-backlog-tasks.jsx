import { API_TOKEN, API_URL } from "../constants/constants";

export async function getPaginatedBacklogTasks(currentPage, pageSize) {
  const result = await fetch(`${API_URL}/tasks?pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}
