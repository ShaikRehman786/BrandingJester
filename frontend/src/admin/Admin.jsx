import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi";

import Clients from "./Clients";
import Projects from "./Projects";
import Team from "./Team";

import "./Admin.css";

function Admin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeView, setActiveView] = useState("dashboard");

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  /* ================= FETCH DASHBOARD STATS ================= */

  const fetchStats = async () => {
    try {
      const data = await adminApi.getStats();   //  Direct JSON Data

      setStats(data);

    } catch (err) {
      console.error("Dashboard Error:", err);
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */

useEffect(() => {
  if (!token) {
    navigate("/login");
    return;
  }

  fetchStats();

  const interval = setInterval(() => {
    fetchStats();
  }, 4000);

  return () => clearInterval(interval);

}, []);


  /* ================= UI STATES ================= */

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-page">

      <header className="admin-header">
        <h1>Admin Dashboard</h1>

        <div className="admin-header-actions">

          {activeView !== "dashboard" && (
          <button
            className="back-btn"
            onClick={() => setActiveView("dashboard")}
          >
            ← Back
          </button>
          )}

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/login");
            }}
          >
            Logout
          </button>

        </div>
      </header>

      {/* ================= DASHBOARD VIEW ================= */}

      {activeView === "dashboard" && stats && (
        <>
          <div className="stats-grid">

            <div className="stat-card">
              <span>Total Projects</span>
              <strong>{stats.totalProjects ?? 0}</strong>
            </div>

            <div className="stat-card">
              <span>Total Clients</span>
              <strong>{stats.totalClients ?? 0}</strong>
            </div>

            <div className="stat-card">
              <span>Total Team Members</span>
              <strong>{stats.totalEmployees ?? 0}</strong>
            </div>

          </div>

          <div className="admin-actions">

            <div
              className="action-card"
              onClick={() => setActiveView("projects")}
            >
              <h3>Manage Projects</h3>
              <p>• Add • Edit • Delete Projects</p>
            </div>

            <div
              className="action-card"
              onClick={() => setActiveView("clients")}
            >
              <h3>Manage Clients</h3>
              <p>• Add • Edit • Delete Logos</p>
            </div>

            <div
              className="action-card"
              onClick={() => setActiveView("team")}
            >
              <h3>Manage Team</h3>
              <p>• Add • Edit • Delete Members</p>
            </div>

          </div>
        </>
      )}

      {/* ================= MODULE RENDERING ================= */}

      {activeView === "projects" && <Projects />}
      {activeView === "clients" && <Clients />}
      {activeView === "team" && <Team />}

    </div>
  );
}

export default Admin;
