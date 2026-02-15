import { API_BASE_URL } from "../config/env";

const token = localStorage.getItem("adminToken");

export const getProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/projects/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const createProject = async (projectData) => {
  const res = await fetch(`${API_BASE_URL}/projects/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE_URL}/projects/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
