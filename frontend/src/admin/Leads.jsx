import { useEffect, useState } from "react";
import axios from "axios";
import "./Leads.css"

const API = import.meta.env.VITE_API_BASE_URL;

function Leads() {

  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {

      const res = await axios.get(`${API}/api/leads`);
      setLeads(res.data);

    } catch (err) {}
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="leads-page">

      <h2>Leads</h2>

      {leads.map((lead) => (
        <div key={lead._id} className="lead-card">
          <strong>{lead.phone}</strong>
          <p>{lead.message}</p>
        </div>
      ))}

    </div>
  );
}

export default Leads;
