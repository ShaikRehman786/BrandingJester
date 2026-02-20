import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi";
import { generateToken } from "../firebase";
import { io } from "socket.io-client";
import user from "../../public/user.png";

import Clients from "./Clients";
import Projects from "./Projects";
import Team from "./Team";
import Leads from "./Leads";   //  ADD THIS

import "./Admin.css";

const API = import.meta.env.VITE_API_BASE_URL;

/* Create socket ONCE */
const socket = io(API, {
  transports: ["websocket"]
});

function Admin() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("dashboard");

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const fetchStats = async () => {
    try {

      const data = await adminApi.getStats();
      setStats(data);

    } catch {

      setError("Failed to load dashboard");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    fetchStats();

    const interval = setInterval(fetchStats, 4000);

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    generateToken();

    socket.on("newLead", (lead) => {

      if (Notification.permission === "granted") {

        new Notification("👤 New User", {
          body: `📞 ${lead.phone}`,
          icon: user
        });

      }

    });

    return () => {
      clearInterval(interval);
      socket.off("newLead");
    };

  }, []);

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

      {/* ================= DASHBOARD ================= */}

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

            {/*  LEADS CARD  */}
            <div
              className="action-card"
              onClick={() => setActiveView("leads")}
            >
              <h3>User Queries</h3>
              <p>• Chatbot Users • Leads</p>
            </div>
          </div>
        </>
      )}

      {/* ================= MODULES ================= */}

      {activeView === "projects" && <Projects />}
      {activeView === "clients" && <Clients />}
      {activeView === "team" && <Team />}
      {activeView === "leads" && <Leads />}  

    </div>
  );
}

export default Admin;
