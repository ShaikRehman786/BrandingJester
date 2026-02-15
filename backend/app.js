const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


// Serve frontend FIRST 
app.use(express.static(path.join(__dirname, "../brandingjester.com")));


// Page Routes
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../brandingjester.com/login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../brandingjester.com/dashboard.html"));
});


// API Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/clients", require("./routes/clientRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/employee", require("./routes/employeeRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5600;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
