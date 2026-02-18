import { useState } from "react";
import Chatbot from "./Chatbot";
import "../styles/ChatbotWidget.css";

function ChatbotWidget() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= FLOATING BUTTON ================= */}

      <div
        className={`chatbot-button ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <span className="close-icon">✕</span>
        ) : (
          <svg
            className="chat-icon"
            viewBox="0 0 24 24"
            width="26"
            height="26"
          >
            <path
              fill="currentColor"
              d="M4 4h16v12H5.17L4 17.17V4m0-2a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z"
            />
          </svg>
        )}
      </div>

      {/* ================= CHAT WINDOW ================= */}

      {open && (
        <div className="chatbot-window">
          <Chatbot />
        </div>
      )}
    </>
  );
}

export default ChatbotWidget;
