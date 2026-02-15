import "../styles/Portfolio.css";
import React, { useEffect, useState, useMemo } from "react";
import { API_BASE_URL } from "../config/env";

/* ================= STATIC PROJECT IMAGES ================= */

import krupa from "./images/designs & logos/krupacorp.png";
import goldenlady from "./images/designs & logos/temp project img/golden lady img.png";
import mawafoods from "./images/designs & logos/img1.png";
import nirmalafoods from "./images/designs & logos/img5.png";
import sikkole from "./images/designs & logos/sikkole img.png";
import snapdrive from "./images/designs & logos/snapdrive img.png";
import newwave from "./images/designs & logos/newwave consultancy img.png";
import happet from "./images/designs & logos/happet img.png";

/* ================= STATIC PROJECTS ================= */

const staticProjects = [
  {
    _id: "static-1",
    projectName: "KRUPA CORPORATION",
    description:
      "Krupa Corporation revolutionizes building material procurement with its B2B platform, offering efficient, cost-effective solutions and SaaS systems.",
    image: krupa,
    link: "https://krupacorp.com/",
    category: "Corporate Website",
  },
  {
    _id: "static-2",
    projectName: "GOLDEN LADY",
    description:
      "Golden Lady is a natural spices brand offering premium, authentic spices crafted from the finest ingredients.",
    image: goldenlady,
    link: "https://goldenladynaturals.com/",
    category: "Shopify Website",
  },
  {
    _id: "static-3",
    projectName: "MAWA FOODS",
    description:
      "Authentic Telugu flavors with 100% pure and homemade products.",
    image: mawafoods,
    link: "https://mawafoods.in/",
    category: "Shopify Website",
  },
  {
    _id: "static-4",
    projectName: "NIRMALA FOODS",
    description:
      "From tangy pickles to aromatic podis, crafted using the finest ingredients for unmatched flavor.",
    image: nirmalafoods,
    link: "https://nirmalafoods.com/",
    category: "Shopify Website",
  },
  {
    _id: "static-5",
    projectName: "SIKKOLE",
    description:
      "Discover the authentic flavors of Srikakulam Foods.",
    image: sikkole,
    link: "https://sikkole.com/",
    category: "E-Commerce",
  },
  {
    _id: "static-6",
    projectName: "SNAPDRIVE",
    description:
      "Modern cars, professional drivers, and a focus on safe, comfortable travel experiences.",
    image: snapdrive,
    link: "https://snapdriveindia.com/",
    category: "Car Rental Website",
  },
  {
    _id: "static-7",
    projectName: "NEWWAVE CONSULTANCY",
    description:
      "Expert guidance helping students secure admission in top medical universities abroad.",
    image: newwave,
    link: "https://newwavembbs.in/",
    category: "Consultancy Website",
  },
  {
    _id: "static-8",
    projectName: "HAPPET",
    description:
      "Transforming pet care with unmatched dedication, expertise, and genuine love for animals.",
    image: happet,
    link: "https://www.thehappet.com/",
    category: "Pet Grooming",
  },
];

function Portfolio() {

  const [backendProjects, setBackendProjects] = useState([]);

  /* ================= FETCH BACKEND PROJECTS ================= */

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects/public`)
      .then(res => res.json())
      .then(data => {
        setBackendProjects(data);
      })
      .catch(err => console.error("Portfolio Error:", err));
  }, []);

  /* ================= MERGE STATIC + BACKEND ================= */

  const allProjects = useMemo(() => {

    // Prevent duplicates using projectName
    const names = new Set(staticProjects.map(p => p.projectName));

    const filteredBackend = backendProjects.filter(
      p => !names.has(p.projectName)
    );

    return [...staticProjects, ...filteredBackend];

  }, [backendProjects]);

  return (
    <section className="portfolio" id="portfolio">

      <div className="portfolio-header">
        <h1 className="section-title">OUR PORTFOLIO</h1>
      </div>

      <div className="portfolio-grid">

        {allProjects.map((project) => (

          <div key={project._id} className="portfolio-item">

            <div className="portfolio-content">

              <div className="img">
                <img
                  src={project.image}
                  alt={project.projectName}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>

              <div className="portfolio-overlay">

                <span className="project-category">
                  {project.category || project.client?.companyName || "Project"}
                </span>

                <h3 className="project-title">
                  {project.projectName}
                </h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="footer_project">

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      see project →
                    </a>
                  )}

                  <div className="dot-container">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className="single-dot"></span>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Portfolio;
