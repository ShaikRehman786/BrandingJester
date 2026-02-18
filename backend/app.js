const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const http = require("http");   //  IMPORTANT
const { Server } = require("socket.io");

const generateContent = require("./services/aiServices");

/*  CREATE EXPRESS APP FIRST */
const app = express();

/*  CREATE HTTP SERVER */
const server = http.createServer(app);

/*  ATTACH SOCKET.IO */
const io = new Server(server, {
    cors: { origin: "*" }
});

/*  SOCKET CONNECTION */
io.on("connection", (socket) => {
    console.log("Admin Connected:", socket.id);
});

/*  CONNECT DATABASE */
connectDB();

/*  MIDDLEWARE */
app.use(cors());
app.use(express.json());

/*  SERVE FRONTEND */
app.use(express.static(path.join(__dirname, "../brandingjester.com")));

/*  PAGE ROUTES */
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../brandingjester.com/login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../brandingjester.com/dashboard.html"));
});

/*  API ROUTES */
app.use("/auth", require("./routes/authRoutes"));
app.use("/clients", require("./routes/clientRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/employee", require("./routes/employeeRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));

/*  FILES */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= CHATBOT LEAD API ================= */

const Lead = require("./models/Lead");   //  create model

app.post("/api/chatbot/lead", async (req, res) => {
    try {

        const { phone, message } = req.body;

        if (!phone) {
            return res.status(400).json({ error: "Phone required" });
        }

        const newLead = await Lead.create({ phone, message });

        /*  REAL-TIME NOTIFICATION */
        io.emit("newLead", newLead);

        res.json({ success: true });

    } catch (err) {
        console.log(err);
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

        console.log("Chatbot API Error:", err);

        res.json({
            reply: "Sorry — our assistant is temporarily busy. Please try again in a moment."
        });
    }
});


/*  START SERVER (NOT app.listen) */
const PORT = process.env.PORT || 5600;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
