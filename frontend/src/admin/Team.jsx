import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";
import "./Team.css";

function Team() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FORM STATE ================= */

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null);   //  FILE STATE

  const [editingEmployee, setEditingEmployee] = useState(null);

  /* ================= FETCH ================= */

  const fetchEmployees = async () => {
    try {
      const data = await adminApi.getEmployees();
      setEmployees(data || []);
    } catch (err) {
      console.error("Employees Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ================= DELETE ================= */

  const deleteEmployee = async (id) => {
    try {
      await adminApi.deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      console.error("Delete Error:", err.message);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (emp) => {
    setEditingEmployee(emp);

    setName(emp.name);
    setEmail(emp.email);
    setPosition(emp.position || "");

    setImage(null);   //  Reset file
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      if (!name.trim()) {
        alert("Employee name required");
        return;
      }

      if (!email.trim()) {
        alert("Email required");
        return;
      }

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("position", position);

      if (image) {
        formData.append("image", image);   //  FILE UPLOAD
      }

      if (editingEmployee) {
        await adminApi.updateEmployee(editingEmployee._id, formData);
      } else {
        await adminApi.addEmployee(formData);
      }

      resetForm();
      fetchEmployees();

    } catch (err) {
      console.error("Submit Error:", err.message);
    }
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setName("");
    setEmail("");
    setPosition("");
    setImage(null);
    setEditingEmployee(null);
  };

  if (loading) {
    return <div className="team-loading">Loading team...</div>;
  }

  return (
    <div className="team-page">

      <div className="team-header">
        <h2>Team Members</h2>
      </div>

      {/* ================= FORM ================= */}

      <div className="team-form-container">
        <div className="team-form">

          <input
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          {/*  FILE PICKER (KEY CHANGE) */}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/*  IMAGE PREVIEW */}

          {image && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
              />
            </div>
          )}

          <div className="form-actions">
            <button onClick={handleSubmit}>
              {editingEmployee ? "Update Employee" : "Add Employee"}
            </button>

            {editingEmployee && (
              <button className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ================= LIST ================= */}

      <div className="team-list">

        {employees.map((emp) => (
          <div key={emp._id} className="team-card">

            <div className="avatar">
              {emp.image ? (
                <img
                  src={emp.image}
                  alt={emp.name}
                />
              ) : (
                <div className="avatar-fallback">
                  {emp.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="employee-meta">
              <strong>{emp.name}</strong>
              <span>{emp.email}</span>
              <span>{emp.position || "No Position"}</span>
            </div>

            <div className="team-actions">
              <button onClick={() => handleEdit(emp)}>Edit</button>
              <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Team;
