import React from "react";
import "../styles/Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="brand-footer" id="bf">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-about">
          <div className="footer-logo"></div>

          <p>
            We empower startups and businesses to build, launch, and grow their
            brands. From strategy and design to digital presence and marketing,
            we're your all-in-one branding partner.
          </p>

          <div className="footer-social">
            <a href="https://www.instagram.com/thebrandingjester/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="https://www.linkedin.com/company/thebrandingjester" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>

            <a href="#">
              <i className="fa-brands fa-x-twitter"></i>
            </a>

            <a href="mailto:contact@brandingjester.agency">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="#service">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#team">Team</a></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-contact">
          <h3>Contact Us</h3>

          <p>
            <i className="fa-solid fa-envelope"></i>
            contact@brandingjester.agency
          </p>

          <p>
            <i className="fa-solid fa-envelope"></i>
            founder@brandingjester.agency
          </p>

          <p>
            <i className="fa-solid fa-phone"></i>
            +91 83417 73723
          </p>

          <p>
            <i className="fa-solid fa-location-dot"></i>
            Jester Groups LLP SECOND FLOOR'S 399, SRINIVASA NAGAR,
            NARASANNAPETA, Andhra Pradesh, 532421
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© {year} BrandingJester. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;
