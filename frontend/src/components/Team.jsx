import React, { useEffect, useState } from "react";
import "../styles/Team.css";
import { API_BASE_URL } from "../config/env";

/* ================= STATIC IMAGES ================= */

import Srinivas from "../components/images/designs & logos/co-founder-srinivas.png";
import Venu from "../components/images/designs & logos/co-founder-venu.png";
import Sriharsha from "../components/images/designs & logos/co-founder-sriharsha.jpeg";

import Kranthi from "../components/images/designs & logos/team pictures/kranthi.jpg";
import Yakub from "../components/images/designs & logos/team pictures/YAKUB.jpg";
import Likith from "../components/images/designs & logos/team pictures/likith.jpg";
import Akhil from "../components/images/designs & logos/team pictures/akhil.jpg";

function Team() {

  const [backendTeam, setBackendTeam] = useState([]);

  /* ================= FETCH DYNAMIC TEAM ================= */

  useEffect(() => {
    fetch(`${API_BASE_URL}/employee/public`)
      .then(res => res.json())
      .then(data => {
        setBackendTeam(data || []);
      })
      .catch(err => console.error("Team Error:", err));
  }, []);

  return (
    <section id="team" className="team-section">

      <h2 className="team-title">
        Meet Our Dedicated <span className="highlight">Team of Experts</span>
      </h2>

      <p className="team-desc">
        This is our team of designers, developers, and creatives who mastered
        all the experience in the website designing industry.
      </p>

      {/* ================= FOUNDERS ================= */}
      <div className="team-row founders">

        <div className="team-card">
          <img src={Srinivas} alt="Sai Srinivas" />
          <div className="team-info">
            <span className="team-name">Sai Srinivas</span>
            <span className="team-role">Co-Founder</span>
            <span className="team-extra">Head of Marketing</span>

            <div className="team-socials">
              <i className="fa-brands fa-linkedin-in"></i>
              <a href="https://www.linkedin.com/in/saisrinivasmaddi/" target="_blank" rel="noreferrer">LinkedIn</a>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:jestergroups@gmail.com">Email</a>
            </div>
          </div>
        </div>

        <div className="team-card">
          <img src={Venu} alt="Venu Gupta" />
          <div className="team-info">
            <span className="team-name">Venu Gupta</span>
            <span className="team-role">Co-Founder</span>
            <span className="team-extra">Head of Product Design</span>

            <div className="team-socials">
              <i className="fa-brands fa-linkedin-in"></i>
              <a href="https://www.linkedin.com/in/venu-gupta-mammula/" target="_blank" rel="noreferrer">LinkedIn</a>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:jestergroups@gmail.com">Email</a>
            </div>
          </div>
        </div>

        <div className="team-card">
          <img src={Sriharsha} alt="Sriharsha Modalavalasa" />
          <div className="team-info">
            <span className="team-name">Sriharsha Modalavalasa</span>
            <span className="team-role">Co-Founder</span>
            <span className="team-extra">Operations & Strategy</span>

            <div className="team-socials">
              <i className="fa-brands fa-linkedin-in"></i>
              <a href="https://www.linkedin.com/in/sriharshamodalavalasa/" target="_blank" rel="noreferrer">LinkedIn</a>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:jestergroups@gmail.com">Email</a>
            </div>
          </div>
        </div>

      </div>

      {/* ================= STATIC TEAM MEMBERS ================= */}
      <div className="team-row members">

        <div className="team-card">
          <img src={Kranthi} alt="Kranthi Kiran" />
          <div className="team-info">
            <span className="team-name">Kranthi Kiran</span>
            <span className="team-role">Web Developer</span>
          </div>
        </div>

        <div className="team-card">
          <img src={Yakub} alt="Yakub Khan" />
          <div className="team-info">
            <span className="team-name">Yakub Khan</span>
            <span className="team-role">Web Developer & Designer</span>
          </div>
        </div>

        <div className="team-card">
          <img src={Likith} alt="Likith" />
          <div className="team-info">
            <span className="team-name">Likith</span>
            <span className="team-role">Web Developer</span>
          </div>
        </div>

        <div className="team-card">
          <img src={Akhil} alt="Akhil" />
          <div className="team-info">
            <span className="team-name">Akhil</span>
            <span className="team-role">Graphic Designer</span>
          </div>
        </div>

        {/* ================= DYNAMIC TEAM FROM BACKEND ================= */}

        {backendTeam.map((emp) => (
          <div key={emp._id} className="team-card">

            <img
              src={emp.image}
              alt={emp.name}
              onError={(e) => {
                e.target.src = "/avatar.png";
              }}
            />

            <div className="team-info">
              <span className="team-name">{emp.name}</span>
              <span className="team-role">
                {emp.position || "Team Member"}
              </span>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Team;
