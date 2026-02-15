import React, { useState } from "react";
import "../styles/Header.css";
import brandingJesterLogo from "./images/designs & logos/brandingjester_logo.png";

function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="main">
        <header>

          <div className="logo">
            <div className="logo-square">
              <img src={brandingJesterLogo} alt="Branding Jester Logo" />
            </div>
          </div>

          <nav className="subnav">
            <ul>
              <li><a href="#service">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </nav>

          <div className="cta-buttons">
            <a href="#contactus" className="btn-primary">
              Contact Us
            </a>
          </div>

          {/*  Hamburger */}
          <div 
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>

        </header>
      </div>

      {/*  Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <a href="#service" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>
        <a href="#team" onClick={() => setMenuOpen(false)}>Team</a>
        <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        <a href="#contactus" onClick={() => setMenuOpen(false)}>Contact Us</a>
      </div>
    </>
  );
}

export default Header;
