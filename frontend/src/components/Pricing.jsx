import React, { useState } from "react";
import "../styles/Pricing.css";

function Pricing() {

  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  const [active1, setActive1] = useState(null);
  const [active2, setActive2] = useState(null);

  const updatePrice1 = (value, index) => {
    setPrice1(value);
    setActive1(index);
  };

  const updatePrice2 = (value, index) => {
    setPrice2(value);
    setActive2(index);
  };

  return (
    <section className="pricing-section" id="pricing">

      <h2 className="section-title">Get An Instant Quotation Now</h2>

      <div className="pricing-grid">

        {/* CARD 1 */}
        <div className="price-card">

          <div className="card-header">
            <h3>Website Redesign Cost Calculator</h3>
          </div>

          <div className="card-body">

            <div className="choose-package">Choose Your Package</div>

            <div className="package-buttons">
              <button
                className={`package-btn ${active1 === 0 ? "active" : ""}`}
                onClick={() => updatePrice1(15000, 0)}
              >
                2 Redesign Concepts
              </button>

              <button
                className={`package-btn ${active1 === 1 ? "active" : ""}`}
                onClick={() => updatePrice1(20000, 1)}
              >
                3 Redesign Concepts
              </button>

              <button
                className={`package-btn ${active1 === 2 ? "active" : ""}`}
                onClick={() => updatePrice1(25000, 2)}
              >
                4 Redesign Concepts
              </button>
            </div>

            <div className="price-display">
              <span>Total Cost</span>
              <strong>₹{price1.toLocaleString()}</strong>
            </div>

            <a href="#contactus" className="contact-btn">
              Contact Now
            </a>

          </div>
        </div>

        {/* CARD 2 */}
        <div className="price-card">

          <div className="card-header">
            <h3>Custom Website Development</h3>
          </div>

          <div className="card-body">

            <div className="choose-package">Choose Your Package</div>

            <div className="package-buttons">
              <button
                className={`package-btn ${active2 === 0 ? "active" : ""}`}
                onClick={() => updatePrice2(30000, 0)}
              >
                Basic Package
              </button>

              <button
                className={`package-btn ${active2 === 1 ? "active" : ""}`}
                onClick={() => updatePrice2(40000, 1)}
              >
                Standard Package
              </button>

              <button
                className={`package-btn ${active2 === 2 ? "active" : ""}`}
                onClick={() => updatePrice2(60000, 2)}
              >
                Premium Package
              </button>
            </div>

            <div className="price-display">
              <span>Total Cost</span>
              <strong>₹{price2.toLocaleString()}</strong>
            </div>

            <a href="#contactus" className="contact-btn">
              Contact Now
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Pricing;
