const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const generateContent = require("./services/aiServices");
const Lead = require("./models/Lead");

const app = express();
const server = http.createServer(app);

/* ================= SOCKET.IO ================= */

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", () => {}); // silent in production

/* ================= DATABASE ================= */

connectDB();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= FRONTEND ================= */

app.use(express.static(path.join(__dirname, "../brandingjester.com")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../brandingjester.com/login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../brandingjester.com/dashboard.html"));
});

/* ================= API ROUTES ================= */

app.use("/auth", require("./routes/authRoutes"));
app.use("/clients", require("./routes/clientRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/employee", require("./routes/employeeRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= SAVE ADMIN TOKEN ================= */

app.post("/api/save-token", async (req, res) => {
  try {

    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token required" });
    }

    global.adminToken = token;

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Failed to save token" });
  }
});

/* ================= FETCH LEADS ================= */

app.get("/api/leads", async (req, res) => {
  try {

    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json(leads);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

/* ================= CHATBOT LEAD API ================= */

app.post("/api/chatbot/lead", async (req, res) => {
  try {

    const { phone, message } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone required" });
    }

    const newLead = await Lead.create({ phone, message });

    io.emit("newLead", newLead);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ================= AI CHAT API ================= */

app.post("/api/chatbot/message", async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const reply = await generateContent(message);

    res.json({ reply });

  } catch (err) {
    res.json({
      reply: "Sorry — our assistant is temporarily busy. Please try again in a moment."
    });
  }
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5600;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
