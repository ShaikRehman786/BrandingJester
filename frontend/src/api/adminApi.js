import { API_BASE_URL } from "../config/env";

/* ================= TOKEN ================= */

const getToken = () => localStorage.getItem("adminToken");

/* ================= HEADERS ================= */

//  For normal JSON requests
const jsonHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

//  For FormData / File Upload requests
const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,   //  NO Content-Type
});

/* ================= RESPONSE HANDLER ================= */

const handleResponse = async (res) => {
  let data;

  try {
    data = await res.json();
  } catch {
    data = { message: "Invalid server response" };
  }

  /*  AUTH FAILURES */
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
    throw new Error(data.message || "Unauthorized access");
  }

  /*  OTHER ERRORS */
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

/* ================= API ================= */

export const adminApi = {

  /* ================= DASHBOARD ================= */

  getStats: async () =>
    handleResponse(await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: jsonHeaders(),
    })),

  getRecentClients: async () =>
    handleResponse(await fetch(`${API_BASE_URL}/dashboard/recent-clients`, {
      headers: jsonHeaders(),
    })),

  getRecentProjects: async () =>
    handleResponse(await fetch(`${API_BASE_URL}/dashboard/recent-projects`, {
      headers: jsonHeaders(),
    })),

  getProjectStatus: async () =>
    handleResponse(await fetch(`${API_BASE_URL}/dashboard/project-status`, {
      headers: jsonHeaders(),
    })),

  /* ================= CLIENTS ================= */

  getClients: async () =>
    handleResponse(await fetch(`${API_BASE_URL}/clients/all`, {
      headers: jsonHeaders(),
    })),

  //  FILE UPLOAD FIXED
  addClient: async (formData) =>
    handleResponse(await fetch(`${API_BASE_URL}/clients/add`, {
      method: "POST",
      headers: authHeaders(),   //  IMPORTANT FIX
      body: formData,
    })),

  //  FILE UPLOAD FIXED
  updateClient: async (id, formData) =>
    handleResponse(await fetch(`${API_BASE_URL}/clients/update/${id}`, {
      method: "PUT",
      headers: authHeaders(),   //  IMPORTANT FIX
      body: formData,
    })),

  deleteClient: async (id) =>
    handleResponse(await fetch(`${API_BASE_URL}/clients/delete/${id}`, {
      method: "DELETE",
      headers: jsonHeaders(),
    })),

  /* ================= PROJECTS ================= */


    getProjects: async () =>
      handleResponse(await fetch(`${API_BASE_URL}/projects/all`, {
        headers: jsonHeaders(),
      })),

    //  FIXED → FILE UPLOAD
    addProject: async (formData) =>
      handleResponse(await fetch(`${API_BASE_URL}/projects/create`, {
        method: "POST",
        headers: authHeaders(),
        body: formData,
      })),

    // FIXED → FILE UPLOAD
    updateProject: async (id, formData) =>
      handleResponse(await fetch(`${API_BASE_URL}/projects/update/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: formData,
      })),

    deleteProject: async (id) =>
      handleResponse(await fetch(`${API_BASE_URL}/projects/delete/${id}`, {
        method: "DELETE",
        headers: jsonHeaders(),
      })),

  /* ================= EMPLOYEES ================= */

/* ================= EMPLOYEES ================= */

getEmployees: async () =>
  handleResponse(await fetch(`${API_BASE_URL}/employee/all`, {
    headers: jsonHeaders(),
  })),

//  FIXED FOR FILE UPLOAD
addEmployee: async (formData) =>
  handleResponse(await fetch(`${API_BASE_URL}/employee/add`, {
    method: "POST",
    headers: authHeaders(),   //  IMPORTANT
    body: formData,
  })),

//  FIXED FOR FILE UPLOAD
updateEmployee: async (id, formData) =>
  handleResponse(await fetch(`${API_BASE_URL}/employee/update/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: formData,
  })),

deleteEmployee: async (id) =>
  handleResponse(await fetch(`${API_BASE_URL}/employee/delete/${id}`, {
    method: "DELETE",
    headers: jsonHeaders(),
  })),
};
