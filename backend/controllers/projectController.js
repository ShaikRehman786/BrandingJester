const Project = require("../models/Project");


// ================= CREATE PROJECT =================
exports.createProject = async (req, res) => {
  try {

    const project = await Project.create({
      projectName: req.body.projectName,
      description: req.body.description,
      status: req.body.status,
      link: req.body.link,
      client: req.body.client,

      image: req.file
        ? `uploads/${req.file.filename}`
        : null,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL PROJECTS =================
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("client", "companyName logo") // Show client info
      .sort({ createdAt: -1 });

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET SINGLE PROJECT =================
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "companyName logo");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE PROJECT =================
exports.updateProject = async (req, res) => {
  try {

    const updateData = {
      projectName: req.body.projectName,
      description: req.body.description,
      status: req.body.status,
      link: req.body.link,
      client: req.body.client,
    };

    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= DELETE PROJECT =================
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= PUBLIC PROJECTS =================
exports.getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("client", "companyName logo")
      .sort({ createdAt: -1 })
      .lean();

    const normalizedProjects = projects.map(project => ({
      ...project,

      image: project.image?.startsWith("http")
        ? project.image
        : `${req.protocol}://${req.get("host")}/${project.image}`,
    }));

    res.json(normalizedProjects);

  } catch (error) {
    console.error("Public Projects Error:", error);
    res.status(500).json({ message: error.message });
  }
};
