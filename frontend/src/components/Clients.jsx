import React, { useEffect, useState, useMemo, useRef } from "react";
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

const manualLogos = [
  logo1, logo2, logo3, logo4, logo5,
  logo6, logo7, logo8, logo9, logo10,
  logo11, logo12, logo13, logo14, logo15
];

function Clients() {
  const [backendLogos, setBackendLogos] = useState([]);
  const logosRef = useRef([]);

  /* ================= FETCH LOGOS ================= */

  useEffect(() => {
    fetch(`${API_BASE_URL}/clients/logos`)
      .then(res => res.json())
      .then(data => {
        const logos = data
          .map(item => {
            const logo = item.logo;
            if (!logo) return null;

            if (logo.startsWith("http")) return logo;

            return `${API_BASE_URL}/${logo.replace(/^\/+/, "")}`;
          })
          .filter(Boolean);

        setBackendLogos(logos);
      })
      .catch(err => console.error("ERROR:", err));
  }, []);

  /* ================= MERGE LOGOS ================= */

  const allLogos = useMemo(() => {
    return [...new Set([...manualLogos, ...backendLogos])];
  }, [backendLogos]);

  /* ================= STRONG VFX SPOTLIGHT ================= */

  useEffect(() => {
    let animationFrame;

    const animateLogos = () => {
      const centerX = window.innerWidth / 2;

      logosRef.current.forEach(logo => {
        if (!logo) return;

        const rect = logo.getBoundingClientRect();
        const logoCenter = rect.left + rect.width / 2;

        const distance = Math.abs(centerX - logoCenter);

        /* 🔥 Strong Cinematic Scale */

        let scale = 1.35 - (distance / 500);
        scale = Math.max(0.75, Math.min(scale, 1.45));

        logo.style.transform = `scale(${scale})`;

        /* 🔥 Depth Opacity */

        let opacity = 1.1 - (distance / 350);
        opacity = Math.max(0.25, Math.min(opacity, 1));

        logo.style.opacity = opacity;

        /* Glow spotlight */

        if (distance < 140) {
          logo.classList.add("active");
        } else {
          logo.classList.remove("active");
        }
      });

      animationFrame = requestAnimationFrame(animateLogos);
    };

    animateLogos();

    return () => cancelAnimationFrame(animationFrame);
  }, [allLogos]);

  return (
    <section className="clients-section">
      <h2 className="clients-title">OUR CLIENTS</h2>

      <div className="clients-mask">
        <div className="clients-scroll">
          {allLogos.length > 0 ? (
            allLogos.concat(allLogos).map((logo, index) => (
              <div
                key={index}
                className="client-logo"
                ref={el => logosRef.current[index] = el}
              >
                <img src={logo} alt="Client Logo" loading="lazy" />
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
