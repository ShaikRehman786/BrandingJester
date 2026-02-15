import React, { useEffect, useState, useMemo } from "react";
import "../styles/Clients.css";
import { API_BASE_URL } from "../config/env";
import logo1 from "./images/designs & logos/company logos/logo1.png";
import logo2 from "./images/designs & logos/company logos/logo2.png";
import logo3 from "./images/designs & logos/company logos/logo3.png";
import logo4 from "./images/designs & logos/company logos/logo4.png";
import logo5 from "./images/designs & logos/company logos/logo5.png";
import logo6 from "./images/designs & logos/company logos/logo6.png";
import logo7 from "./images/designs & logos/company logos/logo7.png";
import logo8 from "./images/designs & logos/company logos/logo8.png";
import logo9 from "./images/designs & logos/company logos/logo9.png";
import logo10 from "./images/designs & logos/company logos/logo10.png";
import logo11 from "./images/designs & logos/company logos/logo11.png";
import logo12 from "./images/designs & logos/company logos/logo12.png";
import logo13 from "./images/designs & logos/company logos/logo13.png";
import logo14 from "./images/designs & logos/company logos/logo14.png";
import logo15 from "./images/designs & logos/company logos/logo15.png";

/* ================= OPTIONAL STATIC LOGOS ================= */

const manualLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12, logo13, logo14, logo15];

function Clients() {
  const [backendLogos, setBackendLogos] = useState([]);

  /* ================= FETCH CLIENT LOGOS ================= */

  useEffect(() => {

    fetch(`${API_BASE_URL}/clients/logos`)
      .then(res => {
        return res.json();
      })
      .then(data => {

        // SAFE LOGO HANDLING (KEY FIX)
        const logos = data
          .map(item => {
            const logo = item.logo;

            if (!logo) return null;

            // ✔ If already full URL → use as is
            if (logo.startsWith("http")) return logo;

            // ✔ Otherwise build backend URL
            return `${API_BASE_URL}/${logo.replace(/^\/+/, "")}`;
          })
          .filter(Boolean);


        setBackendLogos(logos);
      })
      .catch(err => console.error("ERROR:", err));
  }, []);

  /* ================= MERGE + REMOVE DUPLICATES ================= */

  const allLogos = useMemo(() => {
    return [...new Set([...manualLogos, ...backendLogos])];
  }, [backendLogos]);

  return (
    <section className="clients-section">
      <h2 className="clients-title">OUR CLIENTS</h2>
      <div className="clients-mask">
        <div className="clients-scroll">
          {allLogos.length > 0 ? (
            allLogos.concat(allLogos).map((logo, index) => (
              <div key={index} className="client-logo">
                <img
                  src={logo}
                  alt="Client Logo"
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <div className="clients-empty">
              No client logos available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Clients;
