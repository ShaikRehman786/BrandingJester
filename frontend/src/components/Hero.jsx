import React, { useEffect, useState } from "react";
import "../styles/Hero.css";

function Hero() {

  const topTexts = [
    "CGI MARKETING",
    "WEBSITE DESIGN",
    "BRAND GROWTH",
    "SOCIAL MEDIA"
  ];

  const bottomTexts = [
    "For Brands",
    "For Startups",
    "For Businesses",
    "For Creators"
  ];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {

    const interval = setInterval(() => {

      setAnimate(false);  // Exit animation

      setTimeout(() => {
        setIndex(prev => (prev + 1) % topTexts.length);
        setAnimate(true); // Enter animation
      }, 400);

    }, 2500);

    return () => clearInterval(interval);

  }, []);

  return (
    <main className="hero-wrapper">
      <div className="hero">

        {/* TOP LINE */}
        <h1>
          We Do{" "}
          <span className={`rotating-text up ${animate ? "enter" : "exit"}`}>
            {topTexts[index]}
          </span>
        </h1>

        {/* SECOND LINE */}
        <h2 className={`rotating-text down ${animate ? "enter" : "exit"}`}>
          {bottomTexts[index]}
        </h2>

        <p>
          We are a team of{" "}
          <span className="tag yellow">skilled professionals</span>{" "}
          with expertise in marketing and branding. With over{" "}
          <span className="tag purple">2.5 years of experience</span>,{" "}
          we have been{" "}
          <span className="tag yellow">dedicated</span>{" "}
          to helping brands grow and succeed.
        </p>

        <div className="cta-section">
          <a
            href="https://wa.me/918341773723"
            className="btn-get-started"
            target="_blank"
            rel="noreferrer"
          >
            Book a Call →
          </a>
        </div>

      </div>
    </main>
  );
}

export default Hero;
