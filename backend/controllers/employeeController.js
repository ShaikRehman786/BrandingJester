const User = require("../models/User");


// ================= ADD EMPLOYEE =================
exports.createEmployee = async (req, res) => {
  try {

    const { name, email, position } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and Email are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const employee = await User.create({
      name,
      email,
      role: "employee",
      position,

      // ✅ FIXED IMAGE STORAGE
      image: req.file
        ? `uploads/${req.file.filename}`
        : null,
    });

    res.status(201).json({
      message: "Employee added successfully",
      employee,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= GET ALL EMPLOYEES =================
exports.getEmployees = async (req, res) => {
  try {

    const employees = await User.find({ role: "employee" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(employees);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= UPDATE EMPLOYEE =================
exports.updateEmployee = async (req, res) => {
  try {

    const updateData = {
      name: req.body.name,
      email: req.body.email,
      position: req.body.position,
    };

    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`;
    }

    const employee = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" }
    ).select("-password");

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json({
      message: "Employee updated successfully",
      employee,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= DELETE EMPLOYEE =================
exports.deleteEmployee = async (req, res) => {
  try {

    const employee = await User.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json({
      message: "Employee deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= PUBLIC TEAM =================
exports.getPublicTeam = async (req, res) => {
  try {

    const employees = await User.find({ role: "employee" })
      .select("name position image")
      .sort({ createdAt: -1 })
      .lean();

    const normalized = employees.map(emp => ({
      ...emp,

      image: emp.image?.startsWith("http")
        ? emp.image
        : `${req.protocol}://${req.get("host")}/${emp.image}`
    }));

    res.json(normalized);

  } catch (error) {
    console.error("Public Team Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};
