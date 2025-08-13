import { API_TOKEN, API_URL } from "../constants/constants";

export async function getProjectById(id) {
  if (!id) {
    throw new Error("Project ID is required");
  }

  const response = await fetch(`${API_URL}/projects/${id}?populate[tasks][populate]=*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await response.json();

  return data.data;
}
