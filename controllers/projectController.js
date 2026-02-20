// controllers/projectController.js
const Project = require("../models/Project");



exports.createProject = async (req, res) => {
  try {
    const { body, files } = req;

    // Debug logs to verify file upload
    console.log("Image File Info:", files?.imageFile?.[0]);
    console.log("PDF File Info:", files?.pdfFile?.[0]);

    const newProject = new Project({
      ...body,
      imageUrl: files?.imageFile?.[0]?.secure_url || files?.imageFile?.[0]?.path || null,
      pdfLink: files?.pdfFile?.[0]?.secure_url || files?.pdfFile?.[0]?.path || null,
       originalFileName: files?.pdfFile?.[0]?.originalname || null, // ✅ NEW LINE

    });

    const saved = await newProject.save();
    res.status(201).json({ success: true, data: saved });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Project Code or Client Code is not allowed",
      });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};



// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: projects });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };



exports.getAllProjects = async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // date 1 month ago

    const projects = await Project.find({
      $or: [
        { status: { $in: ["AVAILABLE", "HOLD"] } }, // still open/hold
        { status: "CLOSED", countdownEndDate: { $gte: oneMonthAgo } } // closed but within 1 month
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// exports.updateProject = async (req, res) => {
//   try {
//     const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ success: false, message: "Project not found" });
//     res.status(200).json({ success: true, data: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };


exports.updateProject = async (req, res) => {
  try {
    const { body, files } = req;
    const updateData = { ...body };

    if (files?.imageFile?.[0]) {
      updateData.imageUrl = files.imageFile[0].secure_url || files.imageFile[0].path;
    }

    if (files?.pdfFile?.[0]) {
      updateData.pdfLink = files.pdfFile[0].secure_url || files.pdfFile[0].path;
       updateData.originalFileName = files.pdfFile[0].originalname || null; // ✅ NEW LINE
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.getLiveProjects = async (req, res) => {
  try {
    // const liveProjects = await Project.find({ status: "LIVE" });
    const liveProjects = await Project.find({ status: "AVAILABLE"});
    res.status(200).json({
      success: true,
      data: liveProjects,
      count: liveProjects.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Increment totalApplications by +1 or -1
exports.updateApplicationCount = async (req, res) => {
  try {
    const { action } = req.query; // action = "increment" and "decrement"
    const projectId = req.params.id;

    const update = {};

    if (action === "increment") {
      update.$inc = { totalApplications: 1 };
    } else if (action === "decrement") {
      update.$inc = { totalApplications: -1 };
    } else {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

    const updated = await Project.findByIdAndUpdate(projectId, update, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const cron = require("node-cron"); // ✅ 1. Add at top

// ✅ 2. Paste this cron after imports
// cron.schedule("*/5 * * * *", async () => {
//   try {
//     const result = await Project.updateMany({}, { $inc: { totalApplications: 1 } });
//     console.log(`✅ CRON: totalApplications incremented in ${result.modifiedCount} projects`);
//   } catch (err) {
//     console.error("❌ CRON error:", err.message);
//   }
// });

// ✅ CRON: Every 24 hours (midnight)
cron.schedule("0 0 * * *", async () => {
  try {
    const result = await Project.updateMany({}, { $inc: { totalApplications: 1 } });
    console.log(`✅ CRON (24hr): totalApplications incremented in ${result.modifiedCount} projects`);
  } catch (err) {
    console.error("❌ CRON error:", err.message);
  }
});
