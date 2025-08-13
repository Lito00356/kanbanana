import { API_TOKEN, API_URL } from "../constants/constants";

export async function getProjects() {
  const result = await fetch(`${API_URL}/projects?populate[tasks][populate]=*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();

  return data.data;
}
