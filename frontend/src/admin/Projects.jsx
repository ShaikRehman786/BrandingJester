import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FORM STATE ================= */

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [image, setImage] = useState(null);   //  FILE
  const [link, setLink] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const [editingProject, setEditingProject] = useState(null);

  /* ================= FETCH PROJECTS ================= */

  const fetchProjects = async () => {
    try {
      const data = await adminApi.getProjects();
      setProjects(data);

    } catch (err) {
      console.error("Projects Error:", err.message);

    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH CLIENTS ================= */

  const fetchClients = async () => {
    try {
      const data = await adminApi.getClients();
      setClients(data);

    } catch (err) {
      console.error("Clients Error:", err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  /* ================= DELETE ================= */

  const deleteProject = async (id) => {
    try {
      await adminApi.deleteProject(id);
      fetchProjects();

    } catch (err) {
      console.error("Delete Error:", err.message);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (project) => {
    setEditingProject(project);

    setProjectName(project.projectName);
    setDescription(project.description || "");
    setStatus(project.status);
    setLink(project.link);

    setSelectedClient(project.client?._id || project.client);

    setImage(null); //  Do NOT auto-fill file input
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      if (!projectName.trim()) {
        alert("Project name required");
        return;
      }

      if (!selectedClient) {
        alert("Select a client");
        return;
      }

      if (!link.trim()) {
        alert("Project link required");
        return;
      }

      //  Only require image when creating
      if (!image && !editingProject) {
        alert("Project image required");
        return;
      }

      const formData = new FormData();

      formData.append("projectName", projectName);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("link", link);
      formData.append("client", selectedClient);

      if (image) {
        formData.append("image", image);   //  FILE
      }

      if (editingProject) {
        await adminApi.updateProject(editingProject._id, formData);
      } else {
        await adminApi.addProject(formData);
      }

      resetForm();
      fetchProjects();

    } catch (err) {
      console.error("Submit Error:", err.message);
    }
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setStatus("ongoing");
    setImage(null);
    setLink("");
    setSelectedClient("");
    setEditingProject(null);
  };

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

  return (
    <div className="projects-page">

      <div className="projects-header">
        <h2>Projects</h2>
      </div>

      {/* ================= FORM ================= */}

      <div className="project-form">

        <input
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        {/*  CLIENT DROPDOWN */}

        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">Select Client</option>
  
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.companyName}
            </option>
          ))}
        </select>
        {/*  FILE PICKER */}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          placeholder="Project Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <div className="form-actions">
          <button onClick={handleSubmit}>
            {editingProject ? "Update Project" : "Add Project"}
          </button>

          {editingProject && (
            <button className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ================= LIST ================= */}

      <div className="projects-list">

        {projects.map((project) => (
          <div key={project._id} className="project-card">

            <div className="project-info">
              <strong>{project.projectName}</strong>
              <span>{project.status}</span>
            </div>

            <div className="project-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(project)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteProject(project._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Projects;
