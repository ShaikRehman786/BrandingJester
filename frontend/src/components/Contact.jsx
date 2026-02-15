import React from "react";
import "../styles/Contact.css";

function Contact() {
  return (
    <section className="contact-section" id="contactus">

      <h2 className="contact-title">CONTACT US</h2>

      <div className="contact-container">

        {/* Emails */}
        <div className="contact-block">
          <h3>Email</h3>

          <a href="mailto:contact@brandingjester.agency">
            contact@brandingjester.agency
          </a>

          <a href="mailto:founder@brandingjester.agency">
            founder@brandingjester.agency
          </a>
        </div>

        {/* Phone Numbers */}
        <div className="contact-block">
          <h3>Call Us</h3>

          <div className="contact-person">
            <span className="name">M. Sai Srinivas</span>
            <span className="phone">+91 83417 73723</span>
          </div>

          <div className="contact-person">
            <span className="name">M. Venu Gupta</span>
            <span className="phone">+91 83417 51507</span>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Contact;
