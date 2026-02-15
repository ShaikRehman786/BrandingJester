import { useState } from "react";
import { faqData } from "../data/faqData";
import "../styles/FAQ.css";
import React from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">

      <div className="faq-header">
        <h1>Answers to Your Most Common Questions</h1>
        <p>
          Explore our FAQ section to find clear and concise answers about our
          services, processes, and more.
        </p>
      </div>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">

            {/* QUESTION */}
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>

              <div className="toggle-icon">
                {activeIndex === index ? "−" : "+"}
              </div>
            </button>

            {/* ANSWER */}
            <div
              className="faq-answer"
              style={{
                display: activeIndex === index ? "block" : "none"
              }}
            >
              <p>{faq.answer}</p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default FAQ;
