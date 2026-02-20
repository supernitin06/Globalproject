const User = require("../models/centerUser");
const Project = require("../models/CenterProject");
const Center = require("../models/CenterDetails");

// ✅ Dashboard counts
exports.getDashboardStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments();
    const activeProjects = await Project.countDocuments({}); // filter if needed
    const filesUploaded = await Project.countDocuments({
      $or: [{ ndaFile: { $ne: null } }, { slaFile: { $ne: null } }, { invoiceFile: { $ne: null } }]
    });

    res.json({
      totalClients,
      activeProjects,
      filesUploaded
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Search API
exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ msg: "Query parameter missing" });

    const users = await User.find({
      $or: [
        { userId: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } }
      ]
    });

    const projects = await Project.find({
      $or: [
        { projectCode: { $regex: query, $options: "i" } },
        { projectType: { $regex: query, $options: "i" } }
      ]
    });

    res.json({ users, projects });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
