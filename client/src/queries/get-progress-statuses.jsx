import { API_TOKEN, API_URL } from "../constants/constants";

export async function getProgressStatuses() {
  const response = await fetch(`${API_URL}/progress-statuses?status=draft`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await response.json();

  return data.data;
}
