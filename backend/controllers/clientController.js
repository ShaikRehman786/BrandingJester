const Client = require("../models/Client");


// ================= CREATE CLIENT =================
exports.createClient = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const client = await Client.create({
      companyName: req.body.companyName,
      contactPerson: req.body.contactPerson,
      email: req.body.email,
      phone: req.body.phone,

      logo: req.file
        ? `uploads/${req.file.filename}`
        : null,
    });

    res.status(201).json({
      message: "Client created successfully",
      client,
    });

  } catch (error) {
    console.log("ERROR:", error.message);

    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL CLIENTS (ADMIN) =================
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET SINGLE CLIENT =================
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE CLIENT =================
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({
      message: "Client updated successfully",
      client,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= DELETE CLIENT =================
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= PUBLIC CLIENT LOGOS =================
exports.getClientLogos = async (req, res) => {
  try {
    const clients = await Client.find()
      .select("logo -_id")
      .lean();

    const logos = clients
      .map(client => {
        const logo = client.logo;

        if (!logo) return null;

        if (
          logo.startsWith("http") ||
          logo.startsWith("data:image") 
        ) {
          return { logo };
        }
        return {
          logo: `${req.protocol}://${req.get("host")}/${logo.replace(/^\/+/, "")}`
        };
      })
      .filter(Boolean);

    res.json(logos);

  } catch (error) {
    console.error("Client Logos Error:", error);

    res.status(500).json({
      message: "Failed to fetch client logos",
    });
  }
};
