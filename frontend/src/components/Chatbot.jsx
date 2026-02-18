import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/Chatbot.css";
import ReactMarkdown from "react-markdown";

const API = import.meta.env.VITE_API_URL;   // ✅ IMPORTANT

function Chatbot() {

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi 👋 Please enter your phone number to continue." }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const validatePhone = (num) => /^[6-9]\d{9}$/.test(num);

  /* ================= PHONE SUBMIT ================= */

  const submitPhone = async () => {

    if (!validatePhone(phone)) {
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "Hmm 🤔 That doesn't look like a valid phone number." }
      ]);
      return;
    }

    try {

      setTyping(true);

      await axios.post(`${API}/api/chatbot/lead`, {   // ✅ FIXED
        phone,
        message: "New chatbot user"
      });

      setTimeout(() => {

        setTyping(false);
        setPhoneVerified(true);

        setMessages(prev => [
          ...prev,
          { type: "bot", text: "Perfect 👍 How can I help you today?" }
        ]);

      }, 500);

    } catch (err) {
      console.log("Lead Error:", err);
      setTyping(false);
    }
  };

  /* ================= MESSAGE SEND ================= */

  const sendMessage = async () => {

    if (!input.trim() || typing) return;

    const userMessage = input;

    setMessages(prev => [
      ...prev,
      { type: "user", text: userMessage }
    ]);

    setInput("");

    setTimeout(() => {
      setTyping(true);
    }, 150);

    try {

      const res = await axios.post(
        `${API}/api/chatbot/message`,   // ✅ FIXED
        { message: userMessage }
      );

      const botReply =
        res.data?.reply?.trim() ||
        "Sorry — I couldn't respond properly. Try again 👍";

      const delay = Math.random() * 500 + 500;

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: "bot", text: botReply }
        ]);

        setTyping(false);
        inputRef.current?.focus();

      }, delay);

    } catch (err) {
      console.log("Chat Error:", err);

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            type: "bot",
            text: "Sorry — our assistant is temporarily busy. Please try again in a moment."
          }
        ]);
        setTyping(false);
      }, 600);
    }
  };

  return (
    <div className="chatbot-container">

      <div className="chat-header">
        BrandingJester Assistant
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.type}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}

        {typing && (
          <div className="msg bot typing">
            Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {!phoneVerified ? (
        <div className="chat-input">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            disabled={typing}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button disabled={typing} onClick={submitPhone}>
            Continue
          </button>
        </div>
      ) : (
        <div className="chat-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={input}
            disabled={typing}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            disabled={typing || !input.trim()}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      )}

    </div>
  );
}

export default Chatbot;
