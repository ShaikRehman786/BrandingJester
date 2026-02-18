const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    phone: String,
    message: String,
    source: { type: String, default: "chatbot" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", LeadSchema);
