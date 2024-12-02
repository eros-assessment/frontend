// src/api/taskService.js
const API_URL = `https://${process.env.REACT_APP_ENVIRONMENT_NAME}.deveros.click/api`;

export async function fetchTasks() {
  const response = await fetch(
    `${API_URL}/tasks`);
  return response.json();
}

export async function createTask(task) {
  const response = await fetch(`${API_URL}/tasks/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTask(taskId) {
  await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
}

export async function deleteAllTasks() {
  await fetch(`${API_URL}/all`, { method: 'DELETE' });
}
