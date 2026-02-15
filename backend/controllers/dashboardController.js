const Client = require("../models/Client");
const Project = require("../models/Project");
const User = require("../models/User");


/* ================= DASHBOARD STATS ================= */

exports.getDashboardStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalEmployees = await User.countDocuments({ role: "employee" });


    res.json({
      totalClients,
      totalProjects,
      totalEmployees,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard stats error" });
  }
};

/* ================= RECENT CLIENTS ================= */

exports.getRecentClients = async (req, res) => {
  try {
    const clients = await Client.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Recent clients error" });
  }
};

/* ================= RECENT PROJECTS ================= */

exports.getRecentProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Recent projects error" });
  }
};

/* ================= PROJECT STATUS DATA ================= */

exports.getProjectStatusData = async (req, res) => {
  try {
    const data = await Project.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Project status error" });
  }
};
