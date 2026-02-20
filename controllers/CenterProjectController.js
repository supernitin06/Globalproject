
const Project = require("../models/CenterProject");
exports.addProject = async (req, res) => {
  try {
    // ✅ Automatically attach userId from authenticated request
    const userId = req.user.userId; // Get userId from the authenticated user
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ Prepare project data
    const data = { userId, ...req.body };

    // ✅ Attach uploaded file paths if available
    ["ndaFile", "slaFile", "invoiceFile"].forEach((field) => {
      if (req.files?.[field]?.[0]?.path) {
        data[field] = req.files[field][0].path;
      }
    });

    // ✅ Save project
    const project = await new Project(data).save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    console.error("Add project error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
  }
};

// by center user Id
exports.getAllByUser = async (req, res) => {
  const userId=req.user?.userId;
  try {
    const projects = await Project.findOne({userId});
    res.status(200).json({message:"All center by userId",status:true,data:projects});
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get All Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get Project by ID
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Not Found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Update Project
exports.updateProject = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.files?.ndaFile) data.ndaFile = req.files.ndaFile[0].path;
    if (req.files?.slaFile) data.slaFile = req.files.slaFile[0].path;
    if (req.files?.invoiceFile) data.invoiceFile = req.files.invoiceFile[0].path;

    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!project) return res.status(404).json({ msg: "Not Found" });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ msg: "Not Found" });

    res.json({ msg: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
