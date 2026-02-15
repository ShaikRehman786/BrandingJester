import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";
import "./Clients.css";

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FORM STATE ================= */

  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState(null); 
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingClient, setEditingClient] = useState(null);

  /* ================= FETCH ================= */

  const fetchClients = async () => {
    try {
      const data = await adminApi.getClients();
      setClients(data);
    } catch (err) {
      console.error("Clients Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  /* ================= DELETE ================= */

  const deleteClient = async (id) => {
    try {
      await adminApi.deleteClient(id);
      fetchClients();
    } catch (err) {
      console.error("Delete Error:", err.message);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (client) => {
    setEditingClient(client);

    setCompanyName(client.companyName);
    setContactPerson(client.contactPerson || "");
    setEmail(client.email || "");
    setPhone(client.phone || "");

    setLogo(null);
  };

  /* ================= SUBMIT ================= */

const handleSubmit = async () => {
  try {
    if (!companyName.trim()) {
      alert("Company name required");
      return;
    }

    if (!logo && !editingClient) {
      alert("Logo required");
      return;
    }

    const formData = new FormData();

    formData.append("companyName", companyName);
    formData.append("contactPerson", contactPerson);
    formData.append("email", email);
    formData.append("phone", phone);

    if (logo) {
      formData.append("logo", logo); 
    }

    if (editingClient) {
      await adminApi.updateClient(editingClient._id, formData);
    } else {
      await adminApi.addClient(formData);
    }

    resetForm();
    fetchClients();

  } catch (err) {
    console.error("Submit Error:", err.message);
  }
};


  /* ================= RESET ================= */

  const resetForm = () => {
    setCompanyName("");
    setLogo(null);
    setContactPerson("");
    setEmail("");
    setPhone("");
    setEditingClient(null);
  };

  if (loading) {
    return <div className="clients-loading">Loading clients...</div>;
  }

  return (
    <div className="clients-page">

      <div className="clients-header">
        <h2>Clients</h2>
      </div>

      {/* ================= FORM ================= */}

      <div className="client-form">

        <input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        {/* FILE PICKER (KEY CHANGE) */}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
        />

        <input
          placeholder="Contact Person (Optional)"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
        />

        <input
          placeholder="Email (Optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone (Optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="form-actions">
          <button onClick={handleSubmit}>
            {editingClient ? "Update Client" : "Add Client"}
          </button>

          {editingClient && (
            <button className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>

      </div>

      {/* ================= LIST ================= */}

      <div className="clients-list">

        {clients.map((client) => (
          <div key={client._id} className="client-card">

            <div className="client-info">
              <strong>{client.companyName}</strong>
            </div>

            <div className="client-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(client)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteClient(client._id)}
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

export default Clients;
