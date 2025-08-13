import { API_TOKEN, API_URL } from "../constants/constants";

export async function getTasks() {
  const result = await fetch(`${API_URL}/tasks?populate=*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const data = await result.json();

  return data.data;
}
