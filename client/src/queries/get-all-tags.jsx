import { API_TOKEN, API_URL } from "../constants/constants";

export async function getAllTags() {
  const result = await fetch(`${API_URL}/tags`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}
